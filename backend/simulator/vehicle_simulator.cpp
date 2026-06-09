#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
#include <thread>
#include <chrono>
#include <sstream>
#include <iomanip>
#include <cmath>
#include <algorithm>
#include <curl/curl.h>

using namespace std;

enum DrivingMode
{
    IDLE,
    ACCELERATING,
    CRUISING,
    BRAKING,
    STOPPED
};

struct TelemetryData
{
    string vehicleId;
    int speed;
    double fuel;
    int engineTemperature;
    int rpm;
    double latitude;
    double longitude;
    double odometer;
    string event;
    string timestamp;
};

TelemetryData vehicleState;

DrivingMode currentMode = IDLE;
double heading = 90.0;
int modeDuration = 0;
double targetSpeed = 0;

void initializeVehicle()
{
    vehicleState.vehicleId = "VH001";
    vehicleState.speed = 0;
    vehicleState.fuel = 100.0;
    vehicleState.engineTemperature = 75;
    vehicleState.rpm = 800;
    vehicleState.latitude = 23.0225;
    vehicleState.longitude = 72.5714;
    vehicleState.odometer = 0.0;
    vehicleState.event = "NONE";
}

string getCurrentTimestamp()
{
    time_t now = time(nullptr);
    tm *ltm = localtime(&now);

    stringstream ss;

    ss << 1900 + ltm->tm_year << "-"
       << setw(2) << setfill('0') << 1 + ltm->tm_mon << "-"
       << setw(2) << setfill('0') << ltm->tm_mday << " "
       << setw(2) << setfill('0') << ltm->tm_hour << ":"
       << setw(2) << setfill('0') << ltm->tm_min << ":"
       << setw(2) << setfill('0') << ltm->tm_sec;

    return ss.str();
}

void updateDrivingMode()
{
    if (modeDuration > 0)
    {
        modeDuration--;
        return;
    }

    int chance = rand() % 100;

    if (vehicleState.speed == 0)
    {
        currentMode = ACCELERATING;
        targetSpeed = 40 + rand() % 40;
        modeDuration = 15 + rand() % 15;
        return;
    }

    if (chance < 20)
    {
        currentMode = ACCELERATING;
        targetSpeed = 60 + rand() % 50;
        modeDuration = 10 + rand() % 15;
    }
    else if (chance < 70)
    {
        currentMode = CRUISING;
        targetSpeed = vehicleState.speed;
        modeDuration = 20 + rand() % 30;
    }
    else if (chance < 90)
    {
        currentMode = BRAKING;
        targetSpeed = 20 + rand() % 30;
        modeDuration = 5 + rand() % 10;
    }
    else
    {
        currentMode = STOPPED;
        targetSpeed = 0;
        modeDuration = 5 + rand() % 10;
    }
}

void updateSpeed()
{
    switch (currentMode)
    {
    case ACCELERATING:

        if (vehicleState.speed < targetSpeed)
        {
            vehicleState.speed += 2 + rand() % 2;
        }
        else
        {
            currentMode = CRUISING;
        }

        break;

    case CRUISING:

        vehicleState.speed += (rand() % 3) - 1;

        break;

    case BRAKING:

        if (vehicleState.speed > targetSpeed)
        {
            vehicleState.speed -= 3 + rand() % 2;
        }
        else
        {
            currentMode = CRUISING;
        }

        break;

    case STOPPED:

        vehicleState.speed -= 5;

        break;

    case IDLE:

        vehicleState.speed -= 1;

        break;
    }

    if (vehicleState.speed < 0)
        vehicleState.speed = 0;

    if (vehicleState.speed > 120)
        vehicleState.speed = 120;
}

void updateRPM()
{
    if (vehicleState.speed == 0)
    {
        vehicleState.rpm = 800;
        return;
    }

    int baseRPM;

    if (vehicleState.speed < 20)
        baseRPM = 1200;
    else if (vehicleState.speed < 40)
        baseRPM = 1800;
    else if (vehicleState.speed < 60)
        baseRPM = 2200;
    else if (vehicleState.speed < 80)
        baseRPM = 2600;
    else
        baseRPM = 3000;

    vehicleState.rpm =
        baseRPM + ((rand() % 201) - 100);
}

void updateTemperature()
{
    int targetTemp = 80;

    if (vehicleState.speed > 20)
        targetTemp += 5;

    if (vehicleState.speed > 60)
        targetTemp += 5;

    if (vehicleState.speed > 100)
        targetTemp += 5;

    if (vehicleState.engineTemperature < targetTemp)
        vehicleState.engineTemperature++;

    if (vehicleState.engineTemperature > targetTemp)
        vehicleState.engineTemperature--;
}

void updateFuel()
{
    double burnRate = vehicleState.rpm / 1000000.0;

    if (currentMode == ACCELERATING)
        burnRate *= 1.5;

    vehicleState.fuel -= burnRate;

    if (vehicleState.fuel < 0)
        vehicleState.fuel = 0;
}

void updateGPS()
{
    heading += ((rand() % 5) - 2);

    if (heading < 0)
        heading += 360;

    if (heading > 360)
        heading -= 360;

    double distance =
        vehicleState.speed * 0.000002;

    double radians =
        heading * M_PI / 180.0;

    vehicleState.latitude +=
        distance * cos(radians);

    vehicleState.longitude +=
        distance * sin(radians);
}

TelemetryData generateTelemetry()
{
    updateDrivingMode();

    updateSpeed();

    updateRPM();

    updateTemperature();

    updateFuel();

    updateGPS();

    vehicleState.timestamp = getCurrentTimestamp();

    return vehicleState;
}

string createJSON(const TelemetryData &data)
{
    stringstream json;

    json << "{"
         << "\"vehicleId\":\"" << data.vehicleId << "\","
         << "\"speed\":" << data.speed << ","
         << "\"fuel\":" << fixed << setprecision(2) << data.fuel << ","
         << "\"temperature\":" << data.engineTemperature << ","
         << "\"rpm\":" << data.rpm << ","
         << "\"latitude\":" << data.latitude << ","
         << "\"longitude\":" << data.longitude << ","
         << "\"timestamp\":\"" << data.timestamp << "\""
         << "}";

    return json.str();
}

void sendTelemetry(const string &jsonData)
{
    CURL *curl;
    CURLcode res;

    curl = curl_easy_init();

    if (!curl)
        return;

    struct curl_slist *headers = nullptr;

    headers = curl_slist_append(
        headers,
        "Content-Type: application/json");

    curl_easy_setopt(
        curl,
        CURLOPT_URL,
        "http://localhost:5000/api/telemetry");

    curl_easy_setopt(
        curl,
        CURLOPT_HTTPHEADER,
        headers);

    curl_easy_setopt(
        curl,
        CURLOPT_POSTFIELDS,
        jsonData.c_str());

    res = curl_easy_perform(curl);

    if (res != CURLE_OK)
    {
        cerr << "Send Failed: "
             << curl_easy_strerror(res)
             << endl;
    }
    else
    {
        cout << "Sent: "
             << jsonData
             << endl;
    }

    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);
}

int main()
{
    srand(static_cast<unsigned>(time(nullptr)));

    curl_global_init(CURL_GLOBAL_ALL);

    initializeVehicle();

    cout << "Vehicle Telemetry Simulator Started"
         << endl;

    while (true)
    {
        TelemetryData data =
            generateTelemetry();

        string jsonData =
            createJSON(data);

        sendTelemetry(jsonData);

        this_thread::sleep_for(
            chrono::seconds(2));
    }

    curl_global_cleanup();

    return 0;
}