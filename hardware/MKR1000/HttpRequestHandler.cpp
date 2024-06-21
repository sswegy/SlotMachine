#include "HttpRequestHandler.hpp"

HttpRequestHandler::HttpRequestHandler(String server_name, const int port, WiFiClient client) : port(port)
{
	this->server_name = server_name;
	this->client = client;
}

void HttpRequestHandler::stop() { this->client.stop(); }

String HttpRequestHandler::parseResponse()
{
	String response;

	bool isBody = false;
	while (client.connected())
		if (client.available())
		{
			String line = client.readStringUntil('\n');
			if (line == "\r")
			{
				isBody = true;
				break;
			}
		}

	while (client.connected() && isBody)
		if (client.available())
		{
			char c = client.read();
			response += c;
		}

	return response;
}

String HttpRequestHandler::sendGetRequest(String path, String query)
{
	if (client.connect(this->server_name.c_str(), this->port))
	{
		client.println(String("GET ") + path + query + String(" HTTP/1.1"));
		client.println("Host: " + String(server_name));
		client.println("Connection: close");
		client.println();
	}
	else
		Serial.print("Connection to server failed.");

	return this->parseResponse();
}

String HttpRequestHandler::sendPostRequest(String path, String query)
{
	if (client.connect(this->server_name.c_str(), this->port))
	{
		client.println(String("POST ") + path + String(" HTTP/1.1"));
		client.println("Host: " + String(this->server_name));
		client.println("Connection: close");
		client.println("Content-Type: application/json");
		client.println("Accept: */*");
		client.println("Content-Length: " + String(query.length()));
		client.println();
		client.println(query);
	}
	else
		Serial.print("Connection to server failed.");

	return this->parseResponse();
}
