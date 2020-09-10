const express = require('express');
const routes = express.Router();

const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');
const ContatoController = require('./src/controllers/ContatoController');

// Rotas da home
routes.get('/', HomeController.index);

// Rotas de login
routes.get('/login', LoginController.index);
routes.post('/login', LoginController.login);

// Rotas de registro
routes.post('/register', LoginController.register);

// Rota de logout
routes.get('/logout', LoginController.logout);

// Rotas de contato
routes.get('/contato', ContatoController.index);
routes.post('/contato', ContatoController.register);
routes.get('/contato/:id', ContatoController.updateIndex);

module.exports = routes;