function createId() {
    const { v4: uuidv4 } = require('uuid')
    return uuidv4()
}
id1 = '2cbe5d7d-d2a2-410d-a199-62722eb1e17b';
id2 = '961dc7bd-835a-4d06-a2f5-d2ab340a3171';
id3 = "501b46c1-ee18-4d05-a3eb-a30744b50d5b";

const users = [
    { id: id1, email: 'zev@', password: '1111' },
    { id: id2, email: 'trump@', password: '2222' },
    { id: id3, email: 'ari@', password: '3333' }
]

const express = require('express')
const app = express()
const port = 4000
app.use(express.json())

app.get('/', (req, res) => {
    res.send(users)
})
app.get('/users/:id', (req, res) => {
    let bool = 0;
    users.forEach(element => {
        if (element.id == req.params.id) {
            res.send(element)
            bool++;
        }
    })
    if (!bool) {
        res.send('this id is')
    }
})
app.post('/users', (req, res) => {

    const newUser = { id: createId(),
                      name: req.body.name,
                     password: req.body.password
                    }
    console.log(newUser)
    users.push(newUser)
    res.send(users)

})

app.put('/users/', (req, res) => {
    const putUser = req.body.id
    let count = 0
    users.forEach(element => {
        if (element.id == putUser) {
            element.name = req.body.name
            element.password = req.body.password
            res.send(users)
        }
    })
    if (!count) {
        res.send('user not defined')
    }
})

app.delete('/users/:id', (req, res) => {
    const deleteUser = req.params.id
    let count = 0
    users.forEach((element, index) => {
        if (element.id == deleteUser) {
            users.splice(index, 1)
            res.send(users)
            count++;
        }
    })
    if (!count) {
        res.send('this id is not defined')
    }
})

app.post("/users//", (req, res) => {
    const userEmail = req.body.email;
    const userPas = req.body.password;
    let answer = false
    users.forEach(element => {
        if ((element.email == userEmail) & (element.password == userPas)) {
            res.send('ERROR!! this user its create before you!')
            answer = true
        }
    })
    if (!answer) {
        res.send('this is correct!')
    }
})



app.listen(port, () => {
    console.log(`server is ap and running on port ${port}`)
})
