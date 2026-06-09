#include <iostream> // input/output library
#include <string>   // Used for working with text/string data.
#include <cstdlib>  // Used for rand()
#include <ctime>    // Used for getting current time
// Below libraries are used for delay and sleep timers
#include <thread>
#include <chrono>
#include <sstream>
#include <iomanip>
#include <curl/curl.h>

using namespace std;

struct TelemetryData
{
    string vehicleId;
    int speed;
    double fuel;
    int engineTemperature;
    int rpm;
    double latitude;
    double longitude;
    string timestamp;
};

TelemetryData vehicleState;

void initializeVehicle()
{
    vehicleState.vehicleId = "VH001";

    vehicleState.speed = 0;

    vehicleState.fuel = 100;

    vehicleState.engineTemperature = 75;

    vehicleState.rpm = 800;

    vehicleState.latitude = 23.0225;

    vehicleState.longitude = 72.5714;
}

string getCurrentTimestamp()
{
    time_t now = time(0);
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

TelemetryData generateTelemetry()
{
    // RANDOM ACCELERATION / DECELERATION
    int acceleration = (rand() % 11) - 5;

    vehicleState.speed += acceleration;

    // SPEED LIMITS
    if (vehicleState.speed < 0)
        vehicleState.speed = 0;

    if (vehicleState.speed > 120)
        vehicleState.speed = 120;

    // RPM BASED ON SPEED
    vehicleState.rpm = 800 + (vehicleState.speed * 40);

    // FUEL CONSUMPTION
    vehicleState.fuel -= vehicleState.speed * 0.0008;

    if (vehicleState.fuel < 0)
        vehicleState.fuel = 0;

    // ENGINE TEMPERATURE
    vehicleState.engineTemperature =
        70 + (vehicleState.speed * 0.3);

    // HARSH BRAKING EVENT
    if (rand() % 20 == 0)
        vehicleState.speed -= 30;

    // GPS MOVEMENT
    vehicleState.latitude += vehicleState.speed * 0.000001;

    vehicleState.longitude += vehicleState.speed * 0.000001;

    // TIMESTAMP
    vehicleState.timestamp = getCurrentTimestamp();

    return vehicleState;
}

string createJSON(TelemetryData data)
{
    return "{"
           "\"vehicleId\":\"VH001\","
           "\"speed\":" +
           to_string(data.speed) + ","
                                   "\"fuel\":" +
           to_string(data.fuel) + ","
                                  "\"temperature\":" +
           to_string(data.engineTemperature) + ","
                                               "\"rpm\":" +
           to_string(data.rpm) + ","
                                 "\"latitude\":" +
           to_string(data.latitude) + ","
                                      "\"longitude\":" +
           to_string(data.longitude) + ","
                                       "\"timestamp\":\"" +
           data.timestamp + "\""
                            "}";
}

void sendTelemetry(string jsonData)
{
    CURL *curl;
    CURLcode res;

    curl = curl_easy_init();
    if (curl)
    {
        curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:5000/api/telemetry");

        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonData.c_str());

        // Perform the request
        res = curl_easy_perform(curl);

        // Check for errors
        if (res != CURLE_OK)
        {
            cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << endl;
        }
        else
        {
            cout << "Telemetry sent successfully." << endl;
        }

        // Clean up
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
}

int main()
{
    srand(time(0));

    // REQUIRED: Global init
    curl_global_init(CURL_GLOBAL_ALL);

    initializeVehicle();

    while (true)
    {
        TelemetryData data = generateTelemetry();
        string jsonData = createJSON(data);
        sendTelemetry(jsonData);
        this_thread::sleep_for(chrono::seconds(2));
    }

    // Clean up before exit
    curl_global_cleanup();
    return 0;
}