module.exports = function packageSort(packages) {
  var i = 0;
  return function sort(a, b) {
    if (packages[i] === a.names[0]) {
      return -1;
    }
    if (packages[i] === b.names[0]) {
      return 1;
    }
    i++;
    return 0;
  }
};