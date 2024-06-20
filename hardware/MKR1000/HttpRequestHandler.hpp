#ifndef HTTP_REQUEST_HANDLER
#define HTTP_REQUEST_HANDLER

#include <Arduino.h>
#include <ArduinoJson.h>
#include <ArduinoJson.hpp>
#include <WiFi101.h>
#include <SPI.h>

class HttpRequestHandler
{
	String server_name;
	const int port;
	WiFiClient client;

	String parseResponse();

public:
	HttpRequestHandler(String server_name, const int port, WiFiClient client);

  void stop();

	String sendGetRequest(String path, String query);
	String sendPostRequest(String path, String query);
};

#endif