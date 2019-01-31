let outputs = [];

const DROP_POS_INDEX = 0;
const BOUNCINESS_INDEX = 1;
const SIZE_INDEX = 2;
const BUCKET_LABEL_INDEX = 3;

const k = 7;

function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function countValues(arr, index) {
  const count = {};
  arr.forEach(item => {
    if (count[item[index]]) {
      count[item[index]]++;
    } else {
      count[item[index]] = 1;
    }
  });
  return count;
}

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const testSetSize = 10;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  let numberCorrect = 0;

  testSet.forEach(testPoint => {
    const bucket = knn(trainingSet, testPoint[DROP_POS_INDEX]);
    if (bucket == testPoint[BUCKET_LABEL_INDEX]) {
      numberCorrect++;
    }
    console.log(bucket, testPoint[BUCKET_LABEL_INDEX]);
  });

  console.log('Accuracy: ', numberCorrect / testSetSize);
}

function knn(dataset, point) {
  // Transform outputs
  let data = dataset.map(row => {
    return [distance(row[DROP_POS_INDEX], point), row[BUCKET_LABEL_INDEX]];
  });
  // Sort by distance
  data.sort((item1, item2) => item1[0] - item2[0]);
  data = data.slice(0, k);
  data = countValues(data, 1);
  let max = 0;
  let maxIndex = -1;

  for (const [key, value] of Object.entries(data)) {
    if (max < value) {
      max = value;
      maxIndex = key;
    }
  }
  return maxIndex;
}

function shuffle(array) {

  array.forEach((item, index, arr) => {
    const randomPos = Math.floor(Math.random() * arr.length);
    const tmp = arr[randomPos];
    arr[randomPos] = arr[index];
    arr[index] = tmp;
  });

  return array;
}

function splitDataset(data, testCount) {
  const shuffled = shuffle(data);
  const testSet = shuffled.slice(0, testCount);
  const trainingSet = shuffled.slice(testCount);

  return [testSet, trainingSet];
}