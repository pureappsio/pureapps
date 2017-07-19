Router.configure({
  layoutTemplate: 'layout'
});

// Routes
Router.route('/dashboard', {name: 'dashboard'});
Router.route('/status', {name: 'status'});
Router.route('/', {name: 'home', data: function() { this.render('dashboard') }});

Router.route('/signup', {name: 'signup'});
Router.route('/login', {name: 'login'});

Router.route('/admin', {name: 'admin'});