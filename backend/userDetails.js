/* Copyright © Iwizdom Systems Pvt. Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Rohan Magar <rohanm@iwizdom.com>, September 2022
 */

const mongoose = require('mongoose');

const UserDetailsScehma = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true },
    phone: {type: Number},
    accountType: {type: String, required: true},
    password: {type: String, required: true},
  },
  {
    collection: 'UserInfo',
  }
);

mongoose.model('UserInfo', UserDetailsScehma);
