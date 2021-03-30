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
