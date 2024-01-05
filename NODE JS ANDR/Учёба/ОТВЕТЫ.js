ОТВЕТЫ ПО 13 СПРИНТУ

Серверная на ноде
 3)Сервер на Node Js

3.1   //В самом низу
const server = http.createServer(() => {
console.log(“Здарова!”)
}
server.listen(3000);

3.2 //Вместо того что в 3.1
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(markup);
});
server.listen(3000);

3.3 // добавь константу с подсказки и вызови в listen
const { PORT } = process.env;
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(markup);
});
server.listen(PORT);

3.4 //добавь значение по дефолту
const { PORT= 3000 } = process.env;  
//вместо сроки в 3.3………………………………
4) Тело Запроса : потоки

4.1 //в самом начале 
const http = require('http');
const { PORT = 3000 } = process.env;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(mainPageMarkup);
});
server.listen(PORT)

4.2 //добавили условие 
const http = require('http');
const { PORT = 3000 } = process.env;
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(mainPageMarkup);  }
});
server.listen(PORT);

4.3 //вставляем баш в константу и в Body вписываем значения для формы
const { PORT = 3000, BASE_PATH } = process.env;
//далее спускаемся вниз и меняем
<form class="container" action="${BASE_PATH}/submit" method="POST" enctype="text/plain">
      <h1>Список дел</h1>
      <div class="input">
        <input type="text" placeholder="Дело" class="input__text" name="item">
        <button class="input__btn input__btn_add">
          Добавить
        </button>
      </div>
</form>
4.4 //  обновляем константы с запросами  
const http = require('http');
const { PORT = 3000, BASE_PATH } = process.env; 
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(mainPageMarkup);
  } else if (req.url === '/submit' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(submitSuccessMarkup);
  }
});
server.listen(PORT);
//и после вставляем == const submitSuccessMarkup == c времяжора

4.5 //добавляем условие Post

const http = require('http');
const { PORT = 3000, BASE_PATH } = process.env; 
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(mainPageMarkup);
  } else if (req.url === '/submit' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(submitSuccessMarkup);
  }
  if (req.url === '/submit' && req.method === 'POST') {
  let body = ''; 
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(submitSuccessMarkup);
  });}
});
server.listen(PORT);

4.6 //добавляем массив todos и делаем spirit
const http = require('http');
const { PORT = 3000, BASE_PATH } = process.env; 
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(mainPageMarkup);
  } else if (req.url === '/submit' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(submitSuccessMarkup);
  }
  if (req.url === '/submit' && req.method === 'POST') {
  let body = ''; 
const todos = [];
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    console.log(body);
    const item = body.split('=')[1]; 
    todos.push(item);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(submitSuccessMarkup);
  });}
});
server.listen(PORT);

4.7  //тупо нажимаем дальше или в req.on добавь консоль
 req.on('end', () => {
    console.log(body);
console.log(todos);

5.Система модулей Node.js

5.1 // тут с подсказки просят импортировать модульно  
 1)Создаем views.js
2)копипастим 2 константы mainPageMarkup, submitSuccessMarkup в нее
3)также в views пишем:
const { BASE_PATH } = process.env;
module.exports = {
    mainPageMarkup,
    submitSuccessMarkup
};  
4)в app.js пишем :
const { mainPageMarkup, submitSuccessMarkup } = require('./views');

 5.2 //выносим все в компонент что требуется подсказка дана итого:
В app.js остается:
const { getMainPage, postForm } = require('./routes');
const { mainPageMarkup, submitSuccessMarkup } = require('./views');
const http = require('http');
const { PORT = 3000, BASE_PATH } = process.env;
const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        getMainPage(req, res);
    } else if (req.url === '/submit' && req.method === 'POST') {
        postForm(req, res);
    }
});
server.listen(PORT);
В  routes.js переходит:
const { mainPageMarkup, submitSuccessMarkup } = require('./views');
const todos = [];
const getMainPage = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(mainPageMarkup);
};
const postForm = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        console.log(body);
        const item = body.split('=')[1];
        todos.push(item);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(submitSuccessMarkup);
    });
};
module.exports = {
    getMainPage,
    postForm
};

5.3 // опять 25
1) Создаем папку routes и перемещаем туда routes.js
2)в routes.js  меняем импорт на :
const { mainPageMarkup, submitSuccessMarkup } = require('../views');
3)в папке Роуты создайте файл index.js и переместите туда 

const { postForm, getMainPage } = require('./routes');
const router = (req, res) => {
    if (req.url === '/submit' && req.method === 'POST') {
        postForm(req, res);
    }
    if (req.url === '/' && req.method === 'GET') {
        getMainPage(req, res);
    }
};
module.exports = {
    router
};
4) app.js теперь просто к константами
const { router } = require('./routes');
const { PORT = 3000 } = process.env;

const server = http.createServer(router);

server.listen(PORT);

6.Работа с файловой системой 
6.1 //в app.js пишем 2 константы 
const fs = require('fs');
const path = require('path');

6.2 //в константу server вписываем обработчик jsona 
const server = http.createServer((req, res) => {
  const dataPath = path.join(__dirname, 'data.json'); 
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

6.3 //создай fs.readfile  как в подсказке и вложи в него все что было :
  const fs = require('fs');
const path = require('path');
const http = require('http');
const { generateMainView } = require('./views');
const { PORT = 3000 } = process.env;
const server = http.createServer((req, res) => {
  const dataPath = path.join(__dirname, 'data.json'); 
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.log(err); //тут консолим
        return;
    }
//кладем ответ сервера вовнутрь
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    const markup = generateMainView([]);
    res.end(markup);
  });
});
server.listen(PORT);

6.4  //меняем строку     const markup = generateMainView([]);
 и  перед ней пишем метод ждейсон.парс
const songs = JSON.parse(data);
const markup = generateMainView(songs);

6.5 // в задании  и в подсказке сказано передайте в строку длину songs
Заходим в views.js и листаем вниз до боди .Далее меняем там строку p на :
   <p class="cover__count">${songs.length} треков</p>

6.6 //заходим в views.js листаем вниз и как в задании и меняем строки. Где надпись «здесь будут треки» пишем :
<div class="songs-container">
        ${songs.map(generateSongMarkup).join('')}
      </div>
8. Потоки для чтения и записи файлов

8.1 // в константу сервера кладем книгу
const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer(function (req, res) {
const filePath = path.join(__dirname, 'war-and-peace.txt') 
});
server.listen(3000);

8.2 //как в теории только путь уже есть в константе 
const server = http.createServer(function (req, res) {
  const filePath = path.join(__dirname, 'war-and-peace.txt');
const fileReader = fs.createReadStream(filePath,{ encoding: 'utf8' });
});
  
server.listen(3000);

8.3 //не понял их теоретическую жоповытиралку к 8мому уроку в общем ответ таков
const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer(function (req, res) {
  const filePath = path.join(__dirname, 'war-and-peace.txt');
  const fileReader = fs.createReadStream(filePath, { encoding: 'utf8' });
   res.writeHead(200, {'Content-Type':'text/plain'});
});
server.listen(3000);

8.4 //добавляем пипу
const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer(function (req, res) {
  const filePath = path.join(__dirname, 'war-and-peace.txt');
  const fileReader = fs.createReadStream(filePath, { encoding: 'utf8' });
  res.writeHead(200, {'Content-Type': 'text/plain'});
  fileReader.pipe(res); //пипа
});
server.listen(3000);

УРА СЕРВЕРНАЯ ЗАКОНЧЕНА!!!!!!!!!!!!!!!!!!!!!

Express.js

Урок 3 Как общаются клиент и сервер? Настройка роутинга

3.1 // сделайте гет запрос чтобы вывести сказочных д-бов которые придумывали задание
app.get('/animals', (req, res) => {
  res.send(animals);
});
3.2 //пишем res.send 
const express = require('express');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.get('/animals', (req, res) => {
  const { animal, type } = req.query;
  res.send =res.send(animals[req.query.animal][req.query.type]);
});
3.3 // вставь импорты которые созданы в запросы 
app.patch('/users/:id', updateUserProfile);
app.post('/users',createUser );
app.get('/users', getUsers);
app.delete('/users/:id', deleteUser);
4.Блок все говорят о роутинге. (Типо) объясняем  что это

4.1 // создаем и импортируем 
В app.js:
const routes = require('./routes');
app.use('/', routes);
В routes.js:
const router = require('express').Router();
module.exports = router;

4.2 //импортируем db.js и передаем оттуда обьекты 
В routes.js:
const router = require('express').Router();
const { users } = require('./db');  
router.get('/users', (req, res) => {
  res.send(users);
});
module.exports = router; 

4.3 //после router.get еще один запрос в итоге в routes.js будет так:
const router = require('express').Router();
const { users } = require('./db');  
router.get('/users', (req, res) => {
  res.send(users);
});
router.get('/users/:id', (req, res) => {
 res.send(users[req.params.id]);
});
module.exports = router;

4.4 // вставь условие 
const router = require('express').Router();
const { users } = require('./db');  

router.get('/users', (req, res) => {
  res.send(users);
});
router.get('/users/:id', (req, res) => {
  if (!users[req.params.id]) { 
    res.send({ error: 'Такого пользователя нет' });
  } else {
    res.send(users[req.params.id]);
  }
});

5 МидлВары
5  // в app.js  найди дату и напиши 2 консоли
const express = require('express');
const routes = require('./routes.js');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
const timeLog = (req, res, next) => {
  const currentDate = new Date();
  console.log(currentDate);
  console.log(req.method);
  next();
};
app.use(timeLog);
app.use('/', routes);
app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});

Тема 6 Продвинутые мидлвары 
6.1 // вставь после константы аpp в app.js две строки
const express = require('express');
const routes = require('./routes');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes); 
app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});

6.2 //заходим в helper.js изменяем константу постмэн .Можешь скопипастить с подсказки Яндекса
const { mainPageMarkup, submitSuccessMarkup } = require('./views');
const todos = [];
const postForm = (req, res) => {
    const { item } = req.body;
    todos.push(item);
    console.log(todos);
    res.send(submitSuccessMarkup);
}; 
const getMainPage = (req, res) => {
  res.send(mainPageMarkup);
};
module.exports = {
  postForm,
  getMainPage
};
 
Урок 7 отдача html файлов в Express.js
7.1. // тут банальщина   создаем папку паблик .далее index.html и в него копируем константу в кодом html разметки const markup = `

7.2. // Удаляем константу из app.js и app.get вместо этого всего вставляем строку:
app.use(express.static(__dirname + '/public'));

 Урок 8 Кеширование ответа сервера в Express.js
8.1 // заходим в midlewares.js и вписываем код 
const setNoCacheHeaders = (req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
};
module.exports = {
  setNoCacheHeaders
};

8.2 // заходим в app.js и импортируем функцию из мидлвэйра
const { setNoCacheHeaders } = require('./middlewares');
далее пишем там же юсю:
app.use(setNoCacheHeaders);

Урок 9 CORS Обработка ошибок
9.1 //заходим в utils.js и дописываем константу
const { quotes } = require('./data');
module.exports.getRandomQuote = () => {
  const getRandomElement = () => quotes[Math.floor(Math.random() * quotes.length)];
  return getRandomElement();
};

9.2 //заходим в апп  и импортируем модуль полный код таков:
const { getRandomQuote } = require('./utils.js');
const express = require('express');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.get('/', (req, res) => {
  res.send({
    quote: getRandomQuote()
  });
});
app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});

9.3 //импортируем корс и вставляем юсю в app.js
const { getRandomQuote } = require('./utils.js');
const express = require('express');
const cors = require('cors'); //импорт корс

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.use(cors()); //юся
app.get('/', (req, res) => {
  res.send({
    quote: getRandomQuote()
  });
});
app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
   УРА Express  закончился

SQL и NoAQL

Урок 5 подключение к Moнгусу
5.// в серой строке пропиши в app.js:    mongoose.connect('mongodb://localhost:27017/mynewdb');
Урок 6 схемы и модели
6.1 //заходим в film.js и  пишем :
const mongoose = require('mongoose');
const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  }
});
module.exports = mongoose.model('Film', filmSchema);

6.2 // добавляем массив в функцию filmSchema :
const mongoose = require('mongoose');
const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  genre: {
    type: String,
    enum: ['комедия', 'драма', 'боевик', 'триллер', 'документальный'],
    required: true
  }
});
module.exports = mongoose.model('Film', filmSchema);

6.3 // создать строку  монгус модели
const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  genre: {
    type: String,
    enum: ['комедия', 'драма', 'боевик', 'триллер', 'документальный'],
    required: true
  }
});
module.exports = mongoose.model('film', filmSchema); 
module.exports = mongoose.model('Film', filmSchema);

Урок 7 Создание ,чтение,обновление и удаление документов
7.1 //добавь в app.js юсю
app.use('/films', require('./routes/films'));

7.2 //зайди в films.js и добавь  фаинд:
const router = require('express').Router();
const Film = require('../models/film');
router.get('/', (req, res) => {
 Film.find({})
    .then(films => res.send({ data: films }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;

7.3 // также есть в подсказке добавить create

Film.create({ title, genre })
    .then(film => res.send({ data: film }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

 Урок 8 Как структурировать код
8.1 //Копипастим из подскаки и вставляем в films.js
module.exports.getFilms = (req, res) => {
    Film.find({})
        .then(films => res.send({ data: films }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

8.2 //копипастим из film.js  в папке routes  пост запрос и вставляем в controllers
const Film = require('../models/film');
module.exports.getFilms = (req, res) => {
    Film.find({})
        .then(films => res.send({ data: films }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}; 
module.exports.createFilm =(req, res) => {
  const { title, genre } = req.body;
  Film.create({ title, genre })
    .then(film => res.send({ data: film }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
8.3 // в папке routes.films.js меняем все что там на :
const router = require('express').Router();
const { getFilms, createFilm } = require('../controllers/films');
router.get('/', getFilms);
router.post('/', createFilm);
module.exports = router;
module.exports = router;


Урок 9 Настраиваем связи

9.1 //заходим в папку models /films.js и добавляем модель
const mongoose = require('mongoose');
const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  genre: {
    type: String,
    enum: ['комедия', 'драма', 'боевик', 'триллер', 'документальный'],
    required: true
  },
   director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'director',
    required: true
  }
});
module.exports = mongoose.model('film', filmSchema);

9.2// заходим в controllers/film js  :
const Film = require('../models/film');
module.exports.getFilms = (req, res) => {
  Film.find({})
    .then(films => res.send({ data: films }))
    .catch(err => res.status(500).send({ message: err.message }));
};
module.exports.createFilm = (req, res) => {
  const { title, genre, directorId } = req.body;
  Film.create({ title, genre, director: directorId })
    .then(film => {
      res.status(200).json(film);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
9.3 // добавляем populate в папке controllers/films.js:
module.exports.getFilms = (req, res) => {
    Film.find({})
        .populate('director')
        .then(films => res.send({ data: films }))
        .catch(err => res.status(500).send({ message: err.message }));
}; 

module.exports.createFilm = (req, res) => {
  const { title, genre, directorId } = req.body;
  Film.create({ title, genre, director: directorId })
    .then(film => {
      res.status(200).json(film);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

НОВЫЙ МОДУЛЬ ТЕОРИЯ И ПРАКТИКА ОБРАБОТКИ ОШИБОК 

Урок 3  Способы обработки ошибок в JS
 3.1.//   добавь try ,catch и fs.read 
const fs = require('fs');
const incorrectFileName = '';

function doSyncTask(path) {
  console.log('Вызвана функция doSyncTask');
  try {
    const result = fs.readFileSync(path, {encoding: 'utf-8'});
    console.log(`Результат чтения файла: ${result}`);
    console.log('Функция doSyncTask успешно завершена');
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}
doSyncTask(incorrectFileName);

3.2 // проверяем значение err
const fs = require('fs');
const incorrectFileName = '';
function doAsyncTaskCallback(path) {
  console.log('Вызвана функция doAsyncTaskCallback');
  fs.readFile(path, { encoding: 'utf-8' }, (err, result) => {
    if (err) { 
      console.log(`Произошла ошибка: ${err.name} ${err.message}`); 
      return; 
    }
    console.log(`Результат чтения файла: ${result}`);
    console.log('Функция doAsyncTaskCallback успешно завершена');
  });
}
doAsyncTaskCallback(incorrectFileName);

3.3 //лови ответ:
const fs = require('fs');
const incorrectFileName = '';

function doAsyncTaskPromise(path) {
  console.log('Вызвана функция doAsyncTaskCallback');

  fs.promises.readFile(path, { encoding: 'utf-8' }).then((result) => {
    console.log(`Результат чтения файла: ${result}`);
    console.log('Функция doAsyncTaskCallback успешно завершена');
  }).catch((error) => {
    console.log(`Произошла ошибка: ${error.name} ${error.message}`);
  });
}

doAsyncTaskPromise(incorrectFileName);



ОТВЕТЫ ПО 14 СПРИНТУ

Аутентификация и авторизация
Урок 2 Создание пользователя
2.1. В app.js   в пост запросе добавляем  хеш библиотеки bcrypt и then для обработки .Полный пост запрос таков(красным что вставили)
app.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
2.2. В  этом задании вместо user  передаем мыло и айди:
app.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id:user._id,
        email:user.email
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
Урок 3 Аутентификация на практике
3.1.Теперь нужно дописать пост запрос на авторизацию signin в app.js также :
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
});

3.2.После сверки компаером паролей сравниваем  их условием:
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
   .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      res.send({ message: 'Всё пучком!' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
});
Урок 5 как не проходить аутентификацию при каждом заходе джвт токена
5.1 Импортируем jwt библиотеку, далее спускаемся вниз и  вставляем фаинбай кренделябры : )
const jwt = require('jsonwebtoken');
//  вставляем в пост запрос
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
const token = jwt.sign({ _id: user._id }, 'super-strong-secret');
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
});
5.2. Задаем период действия токена туда же спускаемся и в пост запросе задаем выделил красным :
   const token = jwt.sign({ _id: user._id }, 'super-strong-secret',{ expiresIn: '7d' });
Урок 6 Защита роутов авторизацией
6.1. дописываем функцию  передав ей статус и текст ошибки
const handleAuthError = (res) => {
  res.status(401) .send({ "message": "Ошибка авторизации" } );
};
6.2 Впихиваем с подсказки строку  которая убирает подпись Bearer(Носитель) с токена
  return header.replace('Bearer ', '');
6.3. по подсказке делаем импорт в app.js  3 строк


Регулярки
Урок 2 регулярные выражения
2.1. Вместо слова шаблон вставь англ букву -  с
const regex = /c/g;
2.2. Вместо слова шаблон  цифры  911
const regex = /911/;

Урок 3 методы и флаги
3.1 В файле script.js добавляем ги
const regex = /тара-тина/gi
3.2. Тест Зоркий глаз : )
Ответ такой:
const regex = /словакия/gi;
const slovak = iceHockeyPrizes.match(regex);

Урок 4 Спецсимволы и их обратные классы
4.1 зайди в файл js и исправь регулярку на :
const regex = /\d\d\d\d/g;
4.2. ответ таков :
const letterRegExp = /\W/g;
const digitRegExp = /\d/g;

Урок 5 Наборы и диапазоны
 5.1 Напиши диапазон на 3 буквы (не те что ты подумал, а как в задании)
Ответ:
const regex = /[^при]/g;
5.2.Регулярка помоги Васе Пупкину:
const forbidden = /[^_A-Z]/g;

Урок 6 Квантификаторы
6.1. Сразу нажмите проверить там подсказка примерная .
 Ответ:
const regExp = /\d{2} [а-яА-Я]{7}/;
6.2. Жмем на подсказку и на проверить сразу там подсказки!
Ответ :
const regExp = /\d{1,2}\s[а-я]{1,}/g;
6.3 Нажмите проверить там подсказка  что нужно добавить длину времени с 3ч до 8ми:
Ответ:
const regExp = /\d{1,2}\s[a-я]{3,8}/g;
6.4. Тяжелое задание
Ответ:
const regExp = /https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/g;

Урок 7 Начало и конец строки Флаг m
7.1. Тоже тяжелый 
Ответ:
const regex = /[а-яё]+\S*$/mig;
7.2  там есть подсказка  немного зашифровали 
Ответ:
const regex = /^—/gm;

 Урок 8 Методы регулярных выражений
8.1 Нажми подтвердить 
Ответ
const regex = /\s\-{1,}\s/;

Раздел Функции под микроскопом
Урок 3 Замыкания
3.1.Без комментариев…
Ответ:
function makeConsoleMessage(text) {
  function consoleMessage() {
    console.log(text)
  }
  return consoleMessage;
}
3.2. Исправьте эти 2 строки добавь аргумент и используйте:
Ответ:
  function consoleMessage(username)
    console.log(text+username); 

Урок 4 Замыкания на практике
4.1 Создать функцию с счетчиком 
Ответ:
function createCounter() {
  let counter = 0
}
4.2. Плюсани каунтер
Ответ:
function createCounter() {
  let counter = 0;
  function increaseCounter() {
    counter++;
  }
}
4.3. Сделай  ретурн функции .
return {increaseCounter};

4.4. Добавь вызов функции и листенер после функции createCoutner
Ответ:
const myCounter = createCounter()
increaseButton.addEventListener('click', function () {
  myCounter.increaseCounter(); 
});
4.5.Преобразовать нужно функцию  каунтер. Добавь переменную с классом
Ответ всей функции:
function createCounter() {
  let counter = 0;
  const counterText = document.querySelector('.counter__text');
  function increaseCounter() {
    counter++;
    counterText.textContent = counter;
  }
  return { increaseCounter };
}
4.6. Добавь в фукцию счетчика еще один обработчик и вызови его в листенере 
function createCounter() {
  let counter = 0;
  const counterText = document.querySelector('.counter__text');
  function increaseCounter() {
    counter++;
    counterText.textContent = counter;
  }
  function decreaseCounter() {
    counter -= 1;
    counterText.textContent = counter;
  }
  return {
    increaseCounter,
    decreaseCounter
  };
}
И листенер:
decreaseButton.addEventListener('click', function () {
 myCounter.decreaseCounter(); 
});
4.7. еще функцию вставь  и обрабочик 
function createCounter() {
  let counter = 0;
  const counterText = document.querySelector('.counter__text');
  
  function increaseCounter() {
    counter++;
    counterText.textContent = counter;
  }
  function decreaseCounter() {
    counter -= 1;
    counterText.textContent = counter;
  }
 function resetCounter() {
    counter = 0;
    counterText.textContent = counter;
  }
  return {
    increaseCounter,
    decreaseCounter,
    resetCounter
  };
}
И листенер:
resetButton.addEventListener('click', function () {
 myCounter.resetCounter()
});
4.8.Создаешь внутри ф-ции createCounter универсальную функцию и выносишь туда повторение .
Тут ответ по 8ми пунктам весь копирую !:
const increaseButton = document.querySelector('.btns__btn_increase');
const decreaseButton = document.querySelector('.btns__btn_decrease');
const resetButton = document.querySelector('.btns__btn_reset');

function createCounter() {
  function render() {
  counterText.textContent = counter;
} 
  let counter = 0;
  const counterText = document.querySelector('.counter__text');
  
  function increaseCounter() {
    counter++;
  render()
  }
  function decreaseCounter() {
    counter -= 1;
  render()
  }
 function resetCounter() {
    counter = 0;
 render()
  }
  return {
    increaseCounter,
    decreaseCounter,
    resetCounter
  };
}
const myCounter = createCounter()
increaseButton.addEventListener('click', function () {
  myCounter.increaseCounter(); 
}); 
decreaseButton.addEventListener('click', function () {
 myCounter.decreaseCounter();

На этом все   времяжер окончен !!!!

