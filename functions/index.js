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
const {initData} = require('./init_data');
const {guessNumber} = require('./guess_number');
const {giveUp} = require('./give_up');
const {playAgain} = require('./play_again');

process.env.DEBUG = 'actions-on-google:*';


/** Dialogflow Actions {@link https://dialogflow.com/docs/actions-and-parameters#actions} */
const Actions = {
    GUESS_NUMBER: 'guess.number',
    GIVE_UP: 'giveup',
    PLAY_AGAIN: 'play_again',
};

/** @type {Map<string, function(DialogflowApp): void>} */
const actionMap = new Map();
actionMap.set(Actions.GUESS_NUMBER, guessNumber);
actionMap.set(Actions.GIVE_UP, giveUp);
actionMap.set(Actions.PLAY_AGAIN, playAgain);

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
