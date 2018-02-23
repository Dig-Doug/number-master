const random = require('random-js');

const RAND_ENG = random.engines.nativeMath;

function generatePassword(numDigits) {
    if (numDigits > 10 || numDigits <= 0) {
        throw new Error("Password length must be [1,10]");
    }

    // Create an array of all digits 0-9
    const remainingDigits = [];
    for (let i = 0; i < 10; i++) {
        remainingDigits.push(i);
    }

    // Shuffle the aray
    random.shuffle(RAND_ENG, remainingDigits);

    // Return the first N numbers
    return remainingDigits.slice(0, numDigits);
}

module.exports = {
   generatePassword
};
