const {initData} = require('./init_data');
const strings = require('./strings');

const playAgain = app => {
    const data = initData(app);
    data.secretNumber = generatePassword.generatePassword(4);
    return app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: strings.response.start_new_game_speech,
                displayText: strings.response.start_new_game_display
            })
            .addSuggestions([
              strings.suggestions.start_new_game,
              strings.suggestions.quit]),
        strings.general.noInputs);
};
