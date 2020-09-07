const express = require('express');
const routes = express.Router();
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');

// Rotas da home
routes.get('/', HomeController.index);

// Rotas de login
routes.get('/login', LoginController.index);
routes.post('/login', LoginController.login);

// Rotas de registro
routes.post('/register', LoginController.register);

module.exports = routes;