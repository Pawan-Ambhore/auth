/* Copyright © Iwizdom Systems Pvt. Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Rohan Magar <rohanm@iwizdom.com>, September 2022
 */

/** @format */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

const mongoUrl = "mongodb://0.0.0.0:27017/login";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => console.log(e));

require('./userDetails');

const User = mongoose.model('UserInfo');
app.post('/register', async (req, res) => {
  const { name, email, password, phone, accountType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: 'User Exists' });
    }
    await User.create({
      name,
      email,
      phone,
      accountType,
      password: encryptedPassword,
    });
    res.send({ status: 'ok' });
  } catch (error) {
    res.send({ status: 'error' });
  }
});

app.post('/login-user', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: 'User Not found' });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: 'ok', data: token });
    } else {
      return res.json({ error: 'error' });
    }
  }
  res.json({ status: 'error', error: 'InvAlid Password' });
});

app.post('/userData', async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: 'ok', data: data });
      })
      .catch((error) => {
        res.send({ status: 'error', data: error });
      });
  } catch (error) {}
});



app.listen(6000, () => {
  console.log('Server Started at 6000');
});
