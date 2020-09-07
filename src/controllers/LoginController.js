const Model = require('../models/LoginModel');

exports.index = (req, res) => {
	res.render('login');
	console.log(req.session.user);
};

exports.register = async function(req, res){
	try{
		const login = new Model(req.body);
		await login.register();

		if(login.errors.length > 0){
			req.flash('errors', login.errors);
			req.session.save(function(){
				return res.redirect('login');
			});
			return;
		}

		req.flash('success', ['seu usuario foi criado com sucesso']);
		req.session.save(function(){
			return res.redirect('login');
		});
		return;
	}catch(e){
		res.render('error', {error: e});
	}
};

exports.login = async function(req, res){
	try{
		const login = new Model(req.body);
		await login.login();

		if(login.errors.length > 0){
			req.flash('errors', login.errors);
			req.session.save(function(){
				return res.redirect('login');
			});
			return;
		}

		req.flash('success', ['Você entrou no sistema!']);
		req.session.user = login.user;
		req.session.save(function(){
			return res.redirect('login');
		});
		return;
	}catch(e){
		res.render('error', {error: e});
	}
};