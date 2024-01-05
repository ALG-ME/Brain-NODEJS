// запустите этот файл и перейдите
// в браузере по адресу: http://localhost:3000

const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200; // статус ответа
  res.statusMessage = 'OK'; // сообщение ответа
  res.setHeader('Content-Type', 'text/plain'); // добавить ответу заголовок

  res.write('Hello, '); // отправить часть ответа — строку "Hello, "
  res.write('world!'); // отправить часть ответа — строку "world!"

  res.end(); // закончить отправку ответа
});

server.listen(3000); 