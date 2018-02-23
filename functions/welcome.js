const {initData} = require('./init_data');
const strings = require('./strings');
const generatePassword = require('./generate_password');
  
const welcome = app => {
    const data = initData(app);
    data.secretNumber = generatePassword.generatePassword(NUM_DIGITS);
    data.numTriesLeft = 10;
    return app.ask(app.buildRichResponse()
            .addSimpleResponse(strings.response.welcome)
            .addSuggestions([
                generatePassword.generateSuggestion(),
                generatePassword.generateSuggestion(),
                generatePassword.generateSuggestion(),
                strings.suggestions.quit]),
        strings.general.noInputs);
};

module.exports = {
    welcome,
};
