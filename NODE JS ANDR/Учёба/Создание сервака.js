//Создаём свой сервак
const http = require('http');

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}) //"writeHead отправить заголовки"Страница доступна код 200, 404-страница не существует, потом мы передаём информацию для страницы, что будет отбражатся кодировка utf-8 контентный тип 
    res.end('Сюда мы можем вводить html тэги, а так же просто текст')    //за счёт метода end мы можем выводить информацию на страницу
})

const PORT = 3000

const HOST = 'localhost'

server.listen(PORT, HOST,()=> {  //опубликовывем сервак 
    console.log(`Сервер запущен: http://${HOST}:${PORT}`);
})

