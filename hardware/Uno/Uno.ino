#include <SoftwareSerial.h>

SoftwareSerial com(2, 3); // rx, tx

void setup()
{
    Serial.begin(9600);
    com.begin(9600);
}

void loop()
{
}

void UARTSendMessage(String message) // Same as MKR1000
{
    com.println(message);
}

String UARTReceiveMessage()
{
    if (com.available())
        String message = com.readStringUntil('\n');
    return message;
}