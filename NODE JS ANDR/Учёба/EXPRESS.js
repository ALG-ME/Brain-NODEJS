const express = require('express');


const app = express()

app.set('view engine', 'ejs') // установили шаблонизатор ejs и дали настройку view engine  app.set('название настройки', 'значение настройки')

app.get('/', (req, res) => {
    res.render('index') // __dirname константа /res.sendFile стандартная отправка для отображения/ метод render с ним можно просто указать название текущего файла даже без расширения
}) 
//шаблонизатор ejs автоматически ищет шаблоны в папке views
//Все фалы которые будут взаимодействовать с шаблонизатором ejs они должны иметь расширение не .html, а .ejs
//с этим шаблонизатором мы можем передавать данные, также обрабатывать, создавать условия, циклы, и другие различные конструкции в файле index.html"ejs"

app.get('/about', (req, res) => {
    res.render('about') 
}) 

app.get('/user/:username', (req, res) => {
    let data = { username: req.params.username, hobbies: [ 'Footbal', 'Skate' ] }
    res.render('user', data) //что бы передать дополнительный параметр надо указать второй параметр вызвав объект {} передаём {одно свойство: req.params.передаём то что получили из url адреса это username}
}) 



//Опубликовываем сервак
const PORT = 3000
const HOST = 'localhost'
app.listen(3000, () => { 
    console.log(`Server started: http://${HOST}:${PORT}`);
})
//Опубликовываем сервак
//установили шаблонизатор EJS