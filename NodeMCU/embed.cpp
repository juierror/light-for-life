#include <MicroGear.h>
#include <SoftwareSerial.h>

#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#define USE_SERIAL Serial
const byte rxPin = D5;
const byte txPin = D6;
SoftwareSerial mySerial(rxPin, txPin);

#define APPID "lightforlife"
#define KEY "uBCg2t7fJBwD0nr"
#define SECRET "F7b6F7IkHT0gfbcnuXUQyAB2N"
#define ALIAS "nodemcu"

WiFiClient client;

int timer = 0;
MicroGear microgear(client);

/* If a new message arrives, do this */
void onMsghandler(char *topic, uint8_t *msg, unsigned int msglen) {
    Serial.print("Incoming message --> ");
    msg[msglen] = '\0';
    Serial.println((char *)msg);
    mySerial.print((char *)msg);
    delay(250);
}

void onFoundgear(char *attribute, uint8_t *msg, unsigned int msglen) {
    Serial.print("Found new member --> ");
    for (int i = 0; i < msglen; i++)
        Serial.print((char)msg[i]);
    Serial.println();
}

void onLostgear(char *attribute, uint8_t *msg, unsigned int msglen) {
    Serial.print("Lost member --> ");
    for (int i = 0; i < msglen; i++)
        Serial.print((char)msg[i]);
    Serial.println();
}

/* When a microgear is connected, do this */
void onConnected(char *attribute, uint8_t *msg, unsigned int msglen) {
    Serial.println("Connected to NETPIE...");
    /* Set the alias of this microgear ALIAS */
    microgear.setAlias(ALIAS);
}

void setup() {
    USE_SERIAL.begin(115200);
    /* Add Event listeners */
    /* Call onMsghandler() when new message arraives */
    microgear.on(MESSAGE, onMsghandler);

    /* Call onFoundgear() when new gear appear */
    microgear.on(PRESENT, onFoundgear);

    /* Call onLostgear() when some gear goes offline */
    microgear.on(ABSENT, onLostgear);

    /* Call onConnected() when NETPIE connection is established */
    microgear.on(CONNECTED, onConnected);

    // USE_SERIAL.setDebugOutput(true);

    // UART Config
    mySerial.begin(9600);

    if (WiFi.begin("WIFI", "PASSWORD")) {
        while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
        }
    }

    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    /* Initial with KEY, SECRET and also set the ALIAS here */
    microgear.init(KEY, SECRET, ALIAS);

    /* connect to NETPIE to a specific APPID */
    microgear.connect(APPID);
}

void loop() {
    // wait for WiFi connection
    if (microgear.connected()) {
        microgear.loop();
        USE_SERIAL.println("*");
    } else {
        USE_SERIAL.println("Lost Connection");
        microgear.connect(APPID);
    }
    while (mySerial.available()) {
        Serial.print((char)mySerial.read());
    }
    delay(250);
}
