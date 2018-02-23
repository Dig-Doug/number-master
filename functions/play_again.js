const {initData} = require('./init_data');
const strings = require('./strings');

const playAgain = app => {
    const data = initData(app);
    data.secretNumber = generatePassword.generatePassword(4);
    data.numTries = 10;
    return app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: 'OK, new game. Please guess a four digit number',
                displayText: 'Please guess a four digit number'
            })
            .addSuggestions(['Start a new game', 'Quit']),
        strings.general.noInputs);
};
