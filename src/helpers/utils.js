export const extractWaypointIntoDict = (wp) => {
  if (wp === undefined) return;
  return {
    id: wp.id,
    img_name: wp.img_name,
    latitude: wp.latitude,
    longitude: wp.longitude,
  };
};

export const getEmptyArray = (MAX_ELEMENTS) => {
  /**
   * Generates an empty array for the Highcharts plot
   */
  var data = [];
  var time = new Date().getTime();
  for (var i = -MAX_ELEMENTS; i <= 0; i++) {
    data.push({
      x: time + i * 1000,
      y: 0,
    });
  }
  return data;
};

export const distanceBetweenLatLong = (p1, p2) => {
  /**
   * Calculates the distance between two GPS coordinates (latitude, longitude)
   *
   * return: the distance in metres
   */
  var [lat1, lon1] = p1;
  var [lat2, lon2] = p2;

  // metres
  var R = 6371e3;

  // φ, λ in radians
  var φ1 = (lat1 * Math.PI) / 180;
  var φ2 = (lat2 * Math.PI) / 180;
  var Δφ = ((lat2 - lat1) * Math.PI) / 180;
  var Δλ = ((lon2 - lon1) * Math.PI) / 180;

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // in metres
  return R * c;
};

export const isLatLongDistanceValid = (latLng1, latLng2, validDistance = 2) => {
  let dist = distanceBetweenLatLong(latLng1, latLng2);
  if (dist > validDistance) {
    return true;
  }
  return false;
};

export const createLatLng = (sensorData) => {
  /**
   * Craates a pair of longitude and latitude if found, otherwise undefined
   */
  var newLatLng = [undefined, undefined];
  sensorData.forEach((sensor) => {
    if (sensor.name === "latitude") {
      newLatLng[0] = sensor.value;
    } else if (sensor.name === "longitude") {
      newLatLng[1] = sensor.value;
    }
  });
  return newLatLng;
};
