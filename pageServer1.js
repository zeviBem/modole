function createId() {
    const {v4: uuidv4} = require('uuid')
    return uuidv4()
}
// id1 = createId()
// id1 = createId()
// id1 = createId()
const users = [
    {id: 1, name: 'zev', password: '1234'},
    {id: 2, name: 'trump', password: '2134'},
    {id: 3, name: 'ari', password: '3214'}
]

const express = require('express')
const app = express()
const port = 4000
app.use(express.json())

app.get('/',(req, res) => {
    res.send(users)
})
app.get('/users/:id',(req, res) => {
    let bool = 0;
    console.log(req.params.id)
    users.forEach(element => {
        if (element.id == req.params.id) {
            res.send(element)
            bool ++;
         }
    })
    if (!bool) {
        res.send('this id is')
     }
})
app.post('/users',(req, res) => {
    const newUser = {id: req.body.id, name: req.body.name, password: req.body.password}
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

app.delete('/users/:id',(req, res) => {
    const deleteUser = req.params.id
    let count = 0
    users.forEach((element, index) => {
        if (element.id == deleteUser) {
            users.splice(index, 1)
            res.send(users)
            count ++;
        }
    })
    if (!count) {
        res.send('this id is not defined')
    }
})



app.listen(port,() => {
    console.log(`server is ap and running on port ${port}`)
})
