// Copyright 2017, Google, Inc.
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

/**
 * This file contains the constant strings to be used in the code logic to allow for easy editing
 * Below are eslint comments to enforce JSON like syntax since strings are usually stored in JSON
 * They are written in JavaScript for easier organization of the data and in case functions are used
 */

/* eslint quote-props: ["error", "always"] */
/* eslint quotes: ["error", "double"] */

// eslint-disable-next-line quotes
const deepFreeze = require('deep-freeze');

const general = {
    /** Used to give responses for no inputs */
    "noInputs": [
        "I didn't hear that.",
        "If you're still there, say that again.",
        "We can stop here. See you soon."
    ],
    win: "You win!",
    winImage: "https://cdn.shopify.com/s/files/1/0185/5092/products/objects-0017.png?v=1369543805",
    winImageAlt: "Win image",
    // TODO(droeper) - Update sound
    winSound: "https://actions.google.com/sounds/v1/crowds/team_cheer.ogg",
    lose: "You lose!",
    loseImage: "https://cdn.pixabay.com/photo/2018/02/19/14/16/the-eleventh-hour-3165193_1280.jpg",
    loseImageAlt: "Lose image",
    // TODO(droeper) - Update sound
    loseSound: "https://actions.google.com/sounds/v1/crowds/voices_angry.ogg",
    status: (correct, incorrect, tries) => {
        const digit = (num, name, names) => {
            return `${num} ${num == 1 ? name : names}`;
        };
        let message = `You got ${digit(correct, 'number', 'numbers')} in the correct position and `;
        message += `${digit(incorrect, 'number', 'numbers')} in the wrong position. `;
        message += `You have ${digit(tries, 'try', 'tries')} remaining.`;
        return message;
    }
};

const response = {
    "win": "You win!",
    "error_not_a_number": "Please guess a four-digit number. Digit cannot repeat.",
    "start_new_game_speech": "OK, new game. Please guess a four digit number",
    "start_new_game_display": "Please guess a four digit number",
    "how_to_play": "Please guess a four-digit number. Digit cannot repeat. You have 10 tries. I will give you a hint for each guess",
};

const suggestions = {
    "giveup": "Give up",
    "instructions": "How to play",
    "play_again": "Play again",
    "start_new_game": "Start a new game",
    "quit": "Quit",
};

// Use deepFreeze to make the constant objects immutable so they are not unintentionally modified
module.exports = deepFreeze({
    general,
    response,
    suggestions
});
