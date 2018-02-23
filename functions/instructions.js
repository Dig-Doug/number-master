const {initData} = require('./init_data');
const strings = require('./strings');
const generatePassword = require('./generate_password');

const instructions = app => {
    return app.ask(app.buildRichResponse()
            .addSimpleResponse(strings.response.how_to_play)
            .addSuggestions([
                generatePassword.generateSuggestion(),
                generatePassword.generateSuggestion(),
                generatePassword.generateSuggestion(),
                strings.suggestions.quit]),
        strings.general.noInputs);
};

module.exports = {
  instructions,
};
