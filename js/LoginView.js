var LoginView = function() {

    this.initialise = function() {
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findContact);
    }

    this.render = function() {
        this.el.html(LoginView.loginTpl());
        return this;
    }

    this.initialise();

}

LoginView.bannerTpl = Handlebars.compile($("#header-banner-tpl").html());
LoginView.loginTpl = Handlebars.compile($("#login-tpl").html());
