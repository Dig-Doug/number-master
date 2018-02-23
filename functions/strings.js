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
    // TODO(droeper) - Update image
    winImage: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Search_GSA.2e16d0ba.fill-300x300.png",
    winImageAlt: "Win image",
    // TODO(droeper) - Update sound
    winSound: "https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg",
    lose: "You lose!",
    // TODO(droeper) - Update image
    loseImage: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Search_GSA.2e16d0ba.fill-300x300.png",
    loseImageAlt: "Lose image",
    // TODO(droeper) - Update sound
    loseSound: "https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg",
};

// Use deepFreeze to make the constant objects immutable so they are not unintentionally modified
module.exports = deepFreeze({
    general
});
