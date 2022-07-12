require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(cors())

const mongoose = require('mongoose')
const Person = require('./models/person')

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id',(request,response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request,response) => {
    const sid = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

app.post('/api/persons',(request,response) => {
    const body = request.body

    if(!body.name|| !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

app.get('/info', (request,response) => {
    const count = persons.length
    const timeLocation = new Date()
    console.log(count)
    console.log(timeLocation)

    response.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${timeLocation}</p>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})