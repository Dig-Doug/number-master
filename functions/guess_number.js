const {initData} = require('./init_data');
const verification = require('./verification');
const strings = require('./strings');

const guessNumber = app => {
    const data = initData(app);

    const secretNumber = data.secretNumber;
    /** @type {string} */
    const userGuess = app.getArgument(Parameters.NUMBER);
    const userGuessArray = verification.stringToDigitArray(userGuess);
    if (!verification.isValidArray(userGuessArray)) {
        return app.ask(app.buildRichResponse()
                .addSimpleResponse('Please say a four-digit number. Digit cannot repeat.')
                .addSuggestions([
                    generateSuggestion(),
                    generateSuggestion(),
                    generateSuggestion(),
                    'Give up']),
            strings.general.noInputs);
    }
    const answer = verification.verify(userGuessArray, secretNumber);

    data.numTriesLeft = data.numTriesLeft - 1;
    if (answer[0] === NUM_DIGITS) {
        // Win
        const card = app.buildBasicCard(strings.general.win)
            .setImage(strings.general.winImage, strisgs.general.winImageAlt);

        const richResponse = app.buildRichResponse()
            .addSimpleResponse(strings.general.winSound)
            .addBasicCard(card)
            .addSuggestions([
                'Play again',
                'Quit']);
        // TODO: Play again

        return app.ask(richResponse, strings.general.noInputs);
    }
    else if (data.numTriesLeft == 0) {
        return app.ask(app.buildRichResponse()
                .addSimpleResponse('You lose!')
                .addSuggestions([
                    'Play again',
                    'Quit']),
            strings.general.noInputs);
    } else {
        const response = `You got ${answer[0]} digit in the correct position, and ${answer[1]} digit in the wrong position.`;
        return app.ask(app.buildRichResponse()
                .addSimpleResponse({
                    speech: `${userGuess}. ${response}`,
                    displayText: response
                })
                .addSuggestions(['1234', '5678', '1357', 'Give up']),
            strings.general.noInputs);
    }
    console.log('secretNumber: ' + secretNumber);

    const response = `You got ${answer[0]} digit in the correct position, and ${answer[1]} digit in the wrong position.`;
    return app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: `${userGuessArray}. ${response}`,
                displayText: response
            })
            .addSuggestions([
                generateSuggestion(),
                generateSuggestion(),
                generateSuggestion(),
                'Give up']),
        strings.general.noInputs);
};

module.exports = {
    guessNumber
};