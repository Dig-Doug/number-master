const {initData} = require('./init_data');
const verification = require('./verification');
const strings = require('./strings');
const generatePassword = require('./generate_password');

/** Dialogflow Parameters {@link https://dialogflow.com/docs/actions-and-parameters#parameters} */
const Parameters = {
  NUMBER: 'number-integer'
};

const generateSuggestion = () => {
  return generatePassword.generatePassword(4).join('');
};

const playSound = (sound, text) => {
  return `<speak><audio src=\"${sound}\"></audio>${text}</speak>`;
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
    if (data.numTriesLeft <= 0) {
        // Lose
        const card = app.buildBasicCard(
            strings.general.lose + " The answer was " + data.secretNumber.join(''))
            .setImage(strings.general.loseImage, strings.general.loseImageAlt);

        return app.ask(app.buildRichResponse()
                .addSimpleResponse(playSound(strings.general.loseSound))
                .addBasicCard(card)
                .addSuggestions([strings.suggestions.play_again]),
            strings.general.noInputs);
    }
    else if (answer[0] === NUM_DIGITS) {
        // Win
        const card = app.buildBasicCard(playSound(strings.general.winSound, strings.general.win))
            .setImage(strings.general.winImage, strings.general.winImageAlt);

        const richResponse = app.buildRichResponse()
            .addSimpleResponse(playSound(strings.general.winSound, strings.general.win))
            .addBasicCard(card)
            .addSuggestions([strings.suggestions.play_again]);

        return app.ask(richResponse, strings.general.noInputs);
    }
    else {
        const respone = strings.general.status(answer[0], answer[1], data.numTriesLeft);
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