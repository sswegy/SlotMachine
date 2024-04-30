#include <ArduinoJson.h>
#include <ArduinoJson.hpp>
#include <WiFi101.h>
#include <SPI.h>
#include "HttpRequestHandler.hpp"
#include "wiring_private.h"

const char ssid[] = "Glavchev";				// Must be changed on WiFi change
const char pass[] = "!Obi4amte!";			// Must be changed on WiFi change
const char server_name[] = "192.168.88.59"; // Must be changed on WiFi change (get from ipconfig - windows)
const int port = 5000;						// Must be exposed
int status = WL_IDLE_STATUS;

Uart com(&sercom3, /* rx */ 1, /* tx */ 0, SERCOM_RX_PAD_1, UART_TX_PAD_0); // Instead of SoftwareSerial(unavailable for MKR1000)

WiFiClient client;
HttpRequestHandler hrh(server_name, port, client);

void setup()
{
	Serial.begin(9600);
	com.begin(9600);
	pinPeripheral(1, PIO_SERCOM); // Needed for sercom (rx)
	pinPeripheral(0, PIO_SERCOM); // Needed for sercom (tx)

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
	String response = hrh.sendPostRequest("/games", "{\"fee\": 10, \"user_id\": 1}");
	JsonDocument doc;
	deserializeJson(doc, response);

	Serial.println(response);

	const char *a = doc[0];

	Serial.println(a);

	delay(8000);
}

void SERCOM3_Handler() // Needed for sercom(UART)
{
	com.IrqHandler();
}

void UARTSendMessage(String message)
{
	com.println(message);
}

String UARTReceiveMessage()
{
	String message;
	while (com.available())
		message += char(com.read());
	return message;
}

void printWifiConnectionData()
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
