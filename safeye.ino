#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Wi-Fi
const char* ssid = "NOVA ROMA_ALUNOS";
const char* password = "Alunos@2025";

// Supabase
const char* supabase_url = "https://zdkjudhrftylthtitdzm.supabase.co/rest/v1/telemetria_oculos";
const char* supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpka2p1ZGhyZnR5bHRodGl0ZHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTM0NTksImV4cCI6MjA3MTkyOTQ1OX0.muTwQ2-qvMIY0KvlTIe2Cfh1AYwpXK2WYKuJERjdWjg";

// Pinos
#define SENSOR_PIN 34   // OUT do sensor IR
#define BUZZER_PIN 25   // Buzzer
#define LED_PIN 26      // LED externo
#define WIFI_PIN 14     // LED wifi
#define MQTT_PIN 12     // LED broker

// Estado
unsigned long tempoFechado = 0;
bool olhoFechado = false;
bool alertaAtivo = false;
unsigned long cicloInicio = 0;
unsigned long ultimoEnvioSupabase = 0;

void setup_wifi() {
  delay(10);
  Serial.println("Conectando ao Wi-Fi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    digitalWrite(WIFI_PIN, LOW);
  }

  Serial.println("");
  Serial.println("Wi-Fi conectado");
  digitalWrite(WIFI_PIN, HIGH);
  Serial.println(WiFi.localIP());
}

void enviarParaSupabase(bool olhoFechado, int tempoFechado, bool alertaAtivo) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(supabase_url);
    
    // Headers necessários para o Supabase
    http.addHeader("Content-Type", "application/json");
    http.addHeader("apikey", supabase_key);
    http.addHeader("Authorization", String("Bearer ") + supabase_key);
    http.addHeader("Prefer", "return=minimal");
    
    // Criar JSON usando ArduinoJson
    DynamicJsonDocument doc(512);
    doc["olhofechado"] = olhoFechado;
    doc["tempofechado"] = tempoFechado;
    doc["alertaativo"] = alertaAtivo;
    
    String jsonString;
    serializeJson(doc, jsonString);
    
    // Enviar POST
    int httpResponseCode = http.POST(jsonString);
    
    if (httpResponseCode > 0) {
      Serial.println("✅ Enviado para Supabase: " + jsonString);
      Serial.println("Response code: " + String(httpResponseCode));
    } else {
      Serial.println("❌ Erro ao enviar para Supabase: " + String(httpResponseCode));
    }
    
    http.end();
  } else {
    Serial.println("❌ WiFi desconectado!");
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(WIFI_PIN, OUTPUT);
  pinMode(MQTT_PIN, OUTPUT);

  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(LED_PIN, LOW);
  digitalWrite(MQTT_PIN, LOW);
  digitalWrite(MQTT_PIN, LOW);


  setup_wifi();
}

void loop() {
  int valor = digitalRead(SENSOR_PIN); // LOW = olho fechado
  unsigned long agora = millis();

  if (!alertaAtivo) {
    // 🚨 MODO SENTINELA
    if (valor == LOW) {
      if (!olhoFechado) {
        olhoFechado = true;
        tempoFechado = agora;
      } else if (agora - tempoFechado >= 2000) {
        alertaAtivo = true;
        cicloInicio = agora;
        digitalWrite(BUZZER_PIN, HIGH);
        digitalWrite(LED_PIN, HIGH);
        Serial.println("🚨 ALERTA INICIADO");
      }
    } else {
      olhoFechado = false;
    }

  } else {
    // 🚨 MODO ALERTA
    if (agora - cicloInicio >= 5000) {
      if (valor == HIGH) {
        alertaAtivo = false;
        olhoFechado = false;
        digitalWrite(BUZZER_PIN, LOW);
        digitalWrite(LED_PIN, LOW);
        Serial.println("✅ Alerta encerrado, voltando para sentinela");
      } else {
        cicloInicio = agora;
        Serial.println("♻️ Ciclo reiniciado, olho ainda fechado");
      }
    }
  }

  // 🌐 Enviar dados para Supabase a cada 5 segundos
  if (agora - ultimoEnvioSupabase >= 5000) {
    ultimoEnvioSupabase = agora;
    
    int tempoAtual = (valor == LOW && olhoFechado) ? agora - tempoFechado : 0;
    enviarParaSupabase(valor == LOW, tempoAtual, alertaAtivo);
    
    // LED MQTT indica envio para Supabase
    digitalWrite(MQTT_PIN, HIGH);
    delay(100);
    digitalWrite(MQTT_PIN, LOW);
  }

  delay(50); // estabilidade
}