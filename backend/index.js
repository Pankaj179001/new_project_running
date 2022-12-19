const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
const config = require('./db/config')
app.use(cors())
const User = require('./db/users')

//signup api
app.post('/register', async (req, res) => {
    let user = new User(req.body)
    res.send(req.body)
    result = await user.save()
    result = result.toObject();
    delete result.Password //to not show the password in console result
    res.send(result.Password)
})

//login route
app.post('/login', async (req, res) => {
    console.log(req.body)
    if (req.body.Password && req.body.Email) {
        let person = await User.findOne(req.body).select("-password");//to remove password field
        if (person) {
            res.send(person)
        } else {
            res.send({ result: "no user found" })
        }
    }
    else {
        res.send({ result: "error found" })
    }
}
)

app.listen(3200)
//     ,()=>{
//     console.log('http://localhost:3200')
// }
