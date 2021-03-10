

payload = {
    "payload_name": "sensor_data",
    "payload_data": [
        {
            "name": "temp",
            "value": 5.00
        },
        {
            "name": "pressure",
            "value": 100.00
        },
        {
            "name": "oxygen",
            "value": 1.00
        }
    ]
}


for data in payload["payload_data"]:
    size = len(data)
    print("Lenght: ", size)
    for k, v in data.items():
        print(k, v)
