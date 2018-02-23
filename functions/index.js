// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {DialogflowApp} = require('actions-on-google');
const functions = require('firebase-functions');
const {sprintf} = require('sprintf-js');

const strings = require('./strings');
const generatePassword = require('./generate_password');

process.env.DEBUG = 'actions-on-google:*';

/** Dialogflow Actions {@link https://dialogflow.com/docs/actions-and-parameters#actions} */
const Actions = {
    GUESS_NUMBER: 'guess.number',
    GIVE_UP: 'giveup',
};
/** Dialogflow Parameters {@link https://dialogflow.com/docs/actions-and-parameters#parameters} */
const Parameters = {
    NUMBER: 'number-integer'
};

/** @param {Array<string>} messages The messages to concat */
const concat = messages => messages.map(message => message.trim()).join(' ');

/**
 * Set up app.data for use in the action
 * @param {DialogflowApp} app DialogflowApp instance
 */
const initData = app => {
    /** @type {AppData} */
    const data = app.data;
    if (!data.secretNumber) {
        data.secretNumber = generatePassword.generatePassword(4);
    }
    return data;
};

const guessNumber = app => {
    const data = initData(app);
    const secretNumber = data.secretNumber;
    /** @type {string} */
    const userGuess = app.getArgument(Parameters.NUMBER);
    console.log('secretNumber: ' + secretNumber);
    const response = 'You got X digit in the correct position, and Y digit in the wrong position.';
    return app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: `${userGuess}. ${response}`,
                displayText: response
            })
            .addSuggestions(['1234', '5678', '1357', 'Give up']),
        strings.general.noInputs);
};

const giveUp = app => {
    const data = initData(app);
    const secretNumber = data.secretNumber;

    const message = "The secret number is %s";
    return app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: sprintf(message, secretNumber),
                displayText: sprintf(message, secretNumber.join('')),
            })
            .addSuggestions(['Start a new game', 'Quit']),
        strings.general.noInputs);
};

/** @type {Map<string, function(DialogflowApp): void>} */
const actionMap = new Map();
actionMap.set(Actions.GUESS_NUMBER, guessNumber);
actionMap.set(Actions.GIVE_UP, giveUp);

/**
 * The entry point to handle a http request
 * @param {Request} request An Express like Request object of the HTTP request
 * @param {Response} response An Express like Response object to send back data
 */
const numberMastermind = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({request, response});
    console.log(`Request headers: ${JSON.stringify(request.headers)}`);
    console.log(`Request body: ${JSON.stringify(request.body)}`);
    app.handleRequest(actionMap);
});

module.exports = {
    numberMastermind
};
