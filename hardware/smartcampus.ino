#include <SPI.h>
#include <MFRC522.h>
#include <ESP32Servo.h>

// ESP32 pin connections
#define SS_PIN 5
#define RST_PIN 22
#define SERVO_PIN 32
#define PIR_PIN 27
#define IR_SENSOR_PIN 14
#define BUZZER_PIN 33
#define GREEN_LED 26
#define RED_LED 25

MFRC522 rfid(SS_PIN, RST_PIN);
Servo doorServo;

// Valid RFID card UID
byte validCard[4] = {0xE1, 0x32, 0xC9, 0x06};

bool sessionActive = false;
String activeUID = "";

String getUID() {
  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) uid += "0";
    uid += String(rfid.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}

bool isValidCard() {
  if (rfid.uid.size != 4) return false;

  for (int i = 0; i < 4; i++) {
    if (rfid.uid.uidByte[i] != validCard[i]) return false;
  }
  return true;
}

void openDoor() {
  digitalWrite(GREEN_LED, HIGH);
  digitalWrite(RED_LED, LOW);
  tone(BUZZER_PIN, 2000, 200);

  doorServo.write(90);
  Serial.println("Door Opened");
  delay(4000);

  doorServo.write(0);
  digitalWrite(GREEN_LED, LOW);
  Serial.println("Door Closed");
}

void alarmAlert(String msg) {
  Serial.println(msg);
  for (int i = 0; i < 3; i++) {
    digitalWrite(RED_LED, HIGH);
    tone(BUZZER_PIN, 3000);
    delay(300);
    digitalWrite(RED_LED, LOW);
    noTone(BUZZER_PIN);
    delay(200);
  }
}

void setup() {
  Serial.begin(115200);
  SPI.begin();
  rfid.PCD_Init();

  pinMode(PIR_PIN, INPUT);
  pinMode(IR_SENSOR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);

  doorServo.setPeriodHertz(50);
  doorServo.attach(SERVO_PIN, 500, 2400);
  doorServo.write(0);

  Serial.println("RFID Door Access System Started");
}

void loop() {
  bool doorClosed = digitalRead(IR_SENSOR_PIN) == LOW; // change to HIGH if your IR sensor works opposite
  bool motionDetected = digitalRead(PIR_PIN) == HIGH;

  if (!doorClosed && !sessionActive) {
    alarmAlert("Alert: Door opened without valid RFID access");
  }

  if (motionDetected && !sessionActive) {
    alarmAlert("Alert: Motion detected without authorised session");
  }

  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String uid = getUID();
    Serial.print("Card UID: ");
    Serial.println(uid);

    if (isValidCard()) {
      if (!sessionActive) {
        sessionActive = true;
        activeUID = uid;
        Serial.println("Access Granted");
        openDoor();
      } else if (uid == activeUID) {
        sessionActive = false;
        activeUID = "";
        Serial.println("Session Ended");
        tone(BUZZER_PIN, 1500, 200);
        delay(300);
      }
    } else {
      alarmAlert("Access Denied: Invalid RFID Card");
    }

    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }

  delay(100);
}
