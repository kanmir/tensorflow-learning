let outputs = [];

const DROP_POS_INDEX = 0;
const BOUNCINESS_INDEX = 1;
const SIZE_INDEX = 2;
const BUCKET_LABEL_INDEX = 3;

const predictionPoint = 300;
const k = 7;

function distance(point) {
  return Math.abs(point - predictionPoint)
}

function countValues(arr, index) {
  const count = {};
  arr.forEach(item => {
    if (count[item[index]]) {
      count[item[index]] ++;
    } else {
      count[item[index]] = 1;
    }
  });
  return count;
}

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  console.log(outputs);
}

function runAnalysis() {
  // Transform outputs
  let knn = outputs.map(row => {
    return [distance(row[DROP_POS_INDEX]), row[BUCKET_LABEL_INDEX]];
  });
  // Sort by distance
  knn.sort((item1, item2) => item1[0] - item2[0]);
  console.log(knn);
  knn = knn.slice(0, k);
  console.log(knn);
  knn = countValues(knn, 1);
  console.log(knn);
  let max = 0;
  let maxIndex = -1;

  for (const [key, value] of Object.entries(knn)) {
    if (max < value) {
      max = value;
      maxIndex = key;
    }
  }
  

  console.log(maxIndex);
}

