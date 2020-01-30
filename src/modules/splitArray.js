//фнукция разибвать массив на подмассивы и записывает их в новый массив
function splitArray(arr, arraySize = 10) {
  const subarray = [],
        subarrayAmount = Math.ceil(arr.length / arraySize);
  
  for (let i = 0; i < subarrayAmount; i++) {
    subarray[i] = arr.slice((i * arraySize), (i * arraySize) + arraySize);
  }
  
  return subarray;
}

export {splitArray};