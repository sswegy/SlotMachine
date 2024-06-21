#include <SoftwareSerial.h>
#include <AccelStepper.h>

#define AWAIT_UART_MESSAGE(serial) while (serial.available() <= 0){}

#define REEL_SENSOR_PIN1 A0
#define REEL_SENSOR_PIN2 A1
#define REEL_SENSOR_PIN3 A2
#define REEL_SENSOR_PIN4 A3
#define REEL_SENSOR_PIN5 A4

#define BIGWIN 1
#define DOLLAR 41
#define CHERRY 81
#define LEMON 121
#define BANANA 161
const int symbolPositions[5] = { BIGWIN, DOLLAR, CHERRY, LEMON, BANANA };

int reelPositions[5] = { 1, 1, 1, 1, 1 }; // going to be overwritten

AccelStepper r1(AccelStepper::DRIVER, 2, 3),
    r2(AccelStepper::DRIVER, 4, 5),
    r3(AccelStepper::DRIVER, 6, 7),
    r4(AccelStepper::DRIVER, 8, 9),
    r5(AccelStepper::DRIVER, 10, 11);


void setup()
{
    Serial.begin(9600);

    r1.setMaxSpeed(1000);
    r1.setAcceleration(500);
    r2.setMaxSpeed(1000);
    r2.setAcceleration(500);
    r3.setMaxSpeed(1000);
    r3.setAcceleration(500);
    r4.setMaxSpeed(1000);
    r4.setAcceleration(500);
    r5.setMaxSpeed(1000);
    r5.setAcceleration(500);
}

void loop()
{
    AWAIT_UART_MESSAGE(Serial);
    String reelPositionString = UARTReceiveMessage(Serial);
    if (reelPositionString.startsWith("["))
    {
      parseMessage(reelPositionString);
      spinReel(r1, symbolPositions[reelPositions[0] - 1], REEL_SENSOR_PIN1);
      delay(1500);
      spinReel(r2, symbolPositions[reelPositions[1] - 1], REEL_SENSOR_PIN2);
      delay(1500);
      spinReel(r3, symbolPositions[reelPositions[2] - 1], REEL_SENSOR_PIN3);
      delay(1500);
      spinReel(r4, symbolPositions[reelPositions[3] - 1], REEL_SENSOR_PIN4);
      delay(1500);
      spinReel(r5, symbolPositions[reelPositions[4] - 1], REEL_SENSOR_PIN5);
      delay(500);
      UARTSendMessage(Serial, "DONE");
    }
}

void spinReel(AccelStepper& reel, int symbol, int sensorPin)
{
    reel.moveTo(10000);
    while (digitalRead(sensorPin))
        reel.run();
    reel.stop();
    int realZerothPosition = reel.currentPosition();
    int targetPosition = symbolPositions[symbol - 1];
    reel.moveTo(targetPosition + 600 + realZerothPosition);
    while (reel.distanceToGo())
        reel.run();
}

void parseMessage(String message) 
{
    message.trim();
    message.replace("[", "");
    message.replace("]", "");
    message.replace(" ", "");

    int index = 0;
    String number = "";
    for (char c : message)
        if (c == ',') 
        {
            if (index < 5)
                reelPositions[index++] = number.toInt();
            number = "";
        } 
        else
            number += c;

    if (index < 5 && number.length() > 0)
        reelPositions[index] = number.toInt();
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