const {initData} = require('./init_data');
const strings = require('./strings');

const giveUp = app => {
    const data = initData(app);
    const secretNumber = data.secretNumber;
    return app.ask(app.buildRichResponse()
            .addSimpleResponse(`The secret number is ${secretNumber}`)
            .addSuggestions(['Start a new game', 'Quit']),
        strings.general.noInputs);
};
