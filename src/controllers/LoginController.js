const Model = require('../models/LoginModel');

exports.index = (req, res) => {
	if (req.session.user) return res.render('logado');
	return res.render('login');
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
			return res.redirect('/');
		});
		return;
	}catch(e){
		res.render('error', {error: e});
	}
};

exports.logout = (req, res) => {
	req.session.destroy();
	res.redirect('login');
}