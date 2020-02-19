require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')


const {CONNECTION_STRING, SESSION_SECRET} = process.env
massive(CONNECTION_STRING).then(db=>{
    app.set('db', db)
    console.log(`db connected`)
})

const app = express()
app.use(express.json())
const  PORT = 4000
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)

app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)})