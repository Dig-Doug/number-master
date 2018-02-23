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
    console.log(data);

    const secretNumber = data.secretNumber;
    /** @type {string} */
    const userGuess = app.getArgument(Parameters.NUMBER);
    const userGuessArray = verification.stringToDigitArray(userGuess);
    console.log("UserGuess: " + userGuess);
    console.log("UserGuessArray: " + userGuessArray);
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
        const msg = strings.general.lose + " The answer was " + data.secretNumber.join('');
        const card = app.buildBasicCard(playSound(strings.general.loseSound, msg))
            .setImage(strings.general.loseImage, strings.general.loseImageAlt);

        return app.ask(app.buildRichResponse()
                .addBasicCard(card)
                .addSuggestions([
                    strings.suggestions.quit,
                    strings.suggestions.play_again]),
            strings.general.noInputs);
    }
    else if (answer[0] === NUM_DIGITS) {
        // Win
        const card = app.buildBasicCard(playSound(strings.general.winSound, strings.general.win))
            .setImage(strings.general.winImage, strings.general.winImageAlt);

        const richResponse = app.buildRichResponse()
            .addBasicCard(card)
            .addSuggestions([
                strings.suggestions.quit,
                strings.suggestions.play_again]);

        return app.ask(richResponse, strings.general.noInputs);
    }
    else {
        const response = strings.general.status(answer[0], answer[1], data.numTriesLeft);
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