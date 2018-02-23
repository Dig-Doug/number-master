const generatePassword = require('./generate_password');

const NUM_DIGITS = 4;

/**
 * Set up app.data for use in the action
 * @param {DialogflowApp} app DialogflowApp instance
 */
const initData = app => {
    /** @type {AppData} */
    const data = app.data;
    if (!data.secretNumber) {
        data.secretNumber = generatePassword.generatePassword(NUM_DIGITS);
    }
    if (!data.numTriesLeft) {
        data.numTriesLeft = 10;
    }
    return data;
};

module.exports = {
   initData
};
