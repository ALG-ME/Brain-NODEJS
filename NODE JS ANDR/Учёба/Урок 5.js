const fs = require('fs')

let result = fs.readFileSync('some.txt', 'utf-8') //читаем

console.log(`В файле написанно: ${result}`);

//? fs.writeFileSync('some.txt', 'Hello World!') //записываем "Открывает->Всё удаляет->записывает новый текст"

fs.writeFileSync('some.txt', result + '\nHello World!') // приписываем считываемый файл, и добавляем результат на новую строку \n
