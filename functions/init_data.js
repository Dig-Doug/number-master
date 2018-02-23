/**
 * Set up app.data for use in the action
 * @param {DialogflowApp} app DialogflowApp instance
 */
const initData = app => {
    /** @type {AppData} */
    const data = app.data;
    if (!data.secretNumber) {
        data.secretNumber = generatePassword.generatePassword(4);
    }
    if (!data.numTriesLeft) {
        data.numTriesLeft = 10;
    }
    return data;
};

module.exports = {
   initData
};
