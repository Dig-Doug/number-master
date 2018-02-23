const {initData} = require('./init_data');
const strings = require('./strings');
const generatePassword = require('./generate_password');

const playAgain = app => {
    const data = initData(app);
    data.secretNumber = generatePassword.generatePassword(4);
    data.numTriesLeft = 10;
    return app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: strings.response.start_new_game_speech,
                displayText: strings.response.start_new_game_display
            })
            .addSuggestions([
                generatePassword.generateSuggestion(),
                generatePassword.generateSuggestion(),
                generatePassword.generateSuggestion(),
                strings.suggestions.quit]),
        strings.general.noInputs);
};

module.exports = {
    playAgain,
};
