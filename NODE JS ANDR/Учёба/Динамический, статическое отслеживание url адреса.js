const express = require('express');

const app = express()

app.get('/', (req, res) => {
    res.send('this home page!') //информация которая будет выведена в странице
}) //app.get позволяет отслеживать любые url адреса, на данный момент статический адрес

app.get('/about', (req, res) => {
    res.send('About is') 
}) 

app.get('/user/:username/:id', (req, res) => { //динамичские параметры text/:    "/:username/:id", тут динамический url адрес
    res.send(`User ID: ${req.params.id}. Username: ${req.params.username}`) 
}) 



//Опубликовываем сервак
const PORT = 3000

app.listen(3000, () => { 
    console.log(`Server started: http://localhost:${PORT}`);
})
//Опубликовываем сервак