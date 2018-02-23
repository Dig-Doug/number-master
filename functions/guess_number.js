const {initData} = require('./init_data');
const verification = require('./verification');
const strings = require('./strings');

/** Dialogflow Parameters {@link https://dialogflow.com/docs/actions-and-parameters#parameters} */
const Parameters = {
  NUMBER: 'number-integer'
};

const generateSuggestion = () => {
  return generatePassword.generatePassword(4).join('');
};

const NUM_DIGITS = 4;

const guessNumber = app => {
    const data = initData(app);

    const secretNumber = data.secretNumber;
    /** @type {string} */
    const userGuess = app.getArgument(Parameters.NUMBER);
    const userGuessArray = verification.stringToDigitArray(userGuess);
    if (!verification.isValidArray(userGuessArray)) {
        return app.ask(app.buildRichResponse()
                .addSimpleResponse(strings.response.error_not_a_number)
                .addSuggestions([
                    generateSuggestion(),
                    generateSuggestion(),
                    generateSuggestion(),
                    strings.suggestions.giveup,
                    strings.suggestions.start_new_game]),
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
                strings.suggestions.giveup,
                strings.suggestions.play_again]);
        // TODO: Play again

        return app.ask(richResponse, strings.general.noInputs);
    }
    else if (data.numTriesLeft == 0) {
        // Lose
        return app.ask(app.buildRichResponse()
                .addSimpleResponse('You lose!')
                .addSuggestions([
                  generateSuggestion(),
                  generateSuggestion(),
                  generateSuggestion(),
                  strings.suggestions.giveup,
                  strings.suggestions.play_again]),
            strings.general.noInputs);
    } else {
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
                    strings.suggestions.giveup,
                    strings.suggestions.start_new_game]),
            strings.general.noInputs);
    }
};

module.exports = {
    guessNumber
};