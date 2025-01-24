export function updateObjectWithMatch(toUpdate, newData) {
  let toUpdateNew = { ...toUpdate };

  for (const key in newData) {
    toUpdateNew[key] = newData[key];
  }

  return { ...toUpdateNew };
}

export function capitalizeWord(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isEqualArrays(array1, array2) {
  if (!array1 || !array2) return false;

  // compare lengths - can save a lot of time
  if (array1.length !== array2.length) return false;

  for (var i = 0, l = array1.length; i < l; i++) {
    // Check if we have nested arrays
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!array1[i].equals(array2[i])) return false;
    } else if (array1[i] !== array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}

export const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export function sortArrOfObjects(arr, param, type) {
  if (type === "desc") return arr.sort((a, b) => (a[param] > b[param] ? -1 : b[param] > a[param] ? 1 : 0));
  else if (type === "asc") return arr.sort((a, b) => (a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0));
}

export function splitArrChunks(arr, noOfChunks) {
  if (!arr || !noOfChunks) throw new Error("Params missing");

  return arr.reduce((accum, curr, index, array) => {
    if (index % noOfChunks === 0) accum.push(array.slice(index, index + noOfChunks));
    return accum;
  }, []);
}

export function isTokenPresent() {
  return "accessToken" in localStorage || "accessToken" in sessionStorage;
}
