const fs = require('fs');
fs.readFile('some.txt', 'utf-8',(err, data) => {
    fs.writeFile('some.txt', data + '\n Я тут ура!', (err, data) => {
        console.log('Всё зарабюотало!');
    })
})