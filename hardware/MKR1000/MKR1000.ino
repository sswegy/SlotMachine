#include <ArduinoJson.hpp>
#include <WiFi101.h>
#include <SPI.h>
#include <U8g2lib.h>
#include <Wire.h>
#include "HttpRequestHandler.hpp"
#include "wiring_private.h"

#define ARDUINOJSON_ENABLE_ARDUINO_STRING 1
#define AWAIT_UART_MESSAGE(serial) while (serial.available() <= 0){}
#define LOGOUT_PIN 6
#define GAME_PIN 7

const char ssid[] = "#EZ4SSWEGG";           // Must be changed on WiFi change
const char pass[] = "sswegg_is_ggodd";      // Must be changed on WiFi change
const char server_name[] = "192.168.88.18"; // Must be changed on WiFi change (get from ipconfig - windows)
const int port = 5000;                      // Must be exposed
int status = WL_IDLE_STATUS;

Uart com(&sercom3, /* rx */ 1, /* tx */ 0, SERCOM_RX_PAD_1, UART_TX_PAD_0);   // Instead of SoftwareSerial(unavailable for MKR1000)
U8G2_SSD1306_128X32_UNIVISION_F_SW_I2C u8g2(U8G2_R0, /* clock */ 12, /* data */ 11, U8X8_PIN_NONE);  // Display
WiFiClient client;
HttpRequestHandler hrh(server_name, port, client);

bool loggedIn = false;
String user_name = "";
int user_id = 0;
float balance = 0;

void setup()
{
	Serial.begin(9600);
	com.begin(9600);
	pinPeripheral(1, PIO_SERCOM); // Needed for sercom (rx)
	pinPeripheral(0, PIO_SERCOM); // Needed for sercom (tx)

  pinMode(LOGOUT_PIN, INPUT);
  pinMode(GAME_PIN, INPUT_PULLDOWN); // Pin is HIGH by default

  u8g2.begin();
  u8g2.setFont(u8g2_font_unifont_tr); 

	while (status != WL_CONNECTED)
	{
		Serial.print("Attempting to connect to network: ");
		Serial.println(ssid);
		status = WiFi.begin(ssid, pass);
		delay(1000);
	}
	Serial.println("\n\nConnected to the network");
	printWifiConnectionData();
}

void loop()
{
  u8g2.firstPage();
  do {
    u8g2.setCursor(0, 15);
    loggedIn ? u8g2.print(user_name) : u8g2.print("Not logged in.");  
    u8g2.setCursor(0, 30);  
    loggedIn ? u8g2.print(balance) : 0;
  } while (u8g2.nextPage());
  if (loggedIn)
  {
    if (digitalRead(LOGOUT_PIN))
    {
      user_name = "";
      balance = 0;
      loggedIn = false;
    }
    if (digitalRead(GAME_PIN))
    {
      String game_request_body = "{\"fee\": 10, \"user_id\": " + String(user_id) + "}";
      String game_data = hrh.sendPostRequest("/games", game_request_body);
      Serial.println(game_data);
      /* NOT TESTED
      String reel_symbols = getReelsArray(game_data);
      UARTSendMessage(Serial, reel_symbols);
      AWAIT_UART_MESSAGE(Serial);
      String game_status = UARTRecieveMessage(Serial);
      if (game_status.equals("DONE"))
      {
        JsonDocument doc;
        deserializeJson(doc, game_data);
        balance = doc["newBalance"];
      }
      */
    }

  }
  else
  {
    AWAIT_UART_MESSAGE(com);
    String hash_code = UARTReceiveMessage(com);
    Serial.println(hash_code);
    String login_response = hrh.sendGetRequest("/users/hash_code/", hash_code);
    Serial.println(login_response);
    if (!login_response.equals("{\"message\":\"User not found\"}"))
    {
      JsonDocument doc;
      deserializeJson(doc, login_response);
      user_name = doc["user_name"].as<String>();
      user_id = doc["id"];
      balance = doc["balance"];
      Serial.println(user_name);
      Serial.println(user_id);
      Serial.println(balance);
      loggedIn = true;
    }
  }
}

String getReelsArray(const String& jsonString) 
{
  int start = jsonString.indexOf('[');
  int end = jsonString.indexOf(']');
  if (start == -1 || end == -1 || start > end)
    return "";
  return jsonString.substring(start, end + 1);
}

void SERCOM3_Handler() // Needed for sercom(UART)
{
	com.IrqHandler();
}

void UARTSendMessage(Stream& serial, String message)
{
	serial.println(message);
}

String UARTReceiveMessage(Stream& serial)
{
	String message;
  if (serial.available())
	  message = serial.readString();
	return message;
}

void printWifiConnectionData() // For debugging
{
	Serial.println("----------------------------------------");
	Serial.println("Board Information:");
	IPAddress ip = WiFi.localIP();
	Serial.print("  IP Address: ");
	Serial.println(ip);

	Serial.println("Network Information:");
	Serial.print("  SSID: ");
	Serial.println(WiFi.SSID());

	long rssi = WiFi.RSSI();
	Serial.print("  Signal strength (RSSI):");
	Serial.println(rssi);
	Serial.println("----------------------------------------");
}
