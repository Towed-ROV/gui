export const getEmptyArray = (MAX_ELEMENTS) => {
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
