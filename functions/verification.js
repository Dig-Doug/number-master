function stringToDigitArray(inputString) {
  var digits = [];

  var charArray = inputString.split("");
  for (var i = 0; i < charArray.length; ++i) {
    digits.push(parseInt(charArray[i]));
  }
  return digits;
}

// input should be an array of digits.
function isValidArray(userAnswer) {
  // Check for NaN (created by letters in the given string).
  for (var i = 0; i < userAnswer.length; ++i) {
    if (userAnswer[i] == NaN) {
      return false;
    }
  }

  // Check for duplicates.
  if (hasDuplicates(userAnswer)) {
    return false;
  }

  // Check for length.
  if (userAnswer.length != 4) {
    return false;
  }

  return true;
}

function hasDuplicates(array) {
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (array.indexOf(value) !== i) {
      return true;
    }
  }
  return false;
}


// a and b should be arrays of 4 distinct digits of size 4.
function verify(a, b) {
  var correctCount = 0;
  for (var i = 0; i < 4; i++) {
    if (a[i] == b[i]) {
      correctCount = correctCount + 1;
    }
  }
  
  var match = a.filter(function(n) {
    return b.indexOf(n) !== -1;
  }).length;

  return [correctCount, match - correctCount];
}

module.exports = {
  stringToDigitArray,
  isValidArray,
  verify
};
