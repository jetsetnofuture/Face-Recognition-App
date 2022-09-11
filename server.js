const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'danielcarbaugh',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Success') })
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })

app.listen(3000, () => {
	console.log('app is running on port 3000');
})



// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


/*
* You can copy and run the code below to play around with bcrypt
* However this is for demonstration purposes only. Use these concepts
* to adapt to your own project needs.
*/
 
// import bcrypt from'bcrypt'
// const saltRounds = 10 // increase this if you want more iterations  
// const userPassword = 'supersecretpassword'  
// const randomPassword = 'fakepassword'
 
// const storeUserPassword = (password, salt) =>  
//   bcrypt.hash(password, salt).then(storeHashInDatabase)
 
// const storeHashInDatabase = (hash) => {  
//    // Store the hash in your password DB
//    return hash // For now we are returning the hash for testing at the bottom
// }
 
// // Returns true if user password is correct, returns false otherwise
// const checkUserPassword = (enteredPassword, storedPasswordHash) =>  
//   bcrypt.compare(enteredPassword, storedPasswordHash)
 
 
// // This is for demonstration purposes only.
// storeUserPassword(userPassword, saltRounds)  
//   .then(hash =>
//     // change param userPassword to randomPassword to get false
//     checkUserPassword(userPassword, hash)
//   )
//   .then(console.log)
//   .catch(console.error)

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/