var RoundView = function(round) {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
	
    };
    
    this.render = function() {
	this.el.html(RoundView.template(round));
	console.log(round);
	return this;
    };
 
    this.initialise();
 
}
 
RoundView.template = Handlebars.compile($("#round-tpl").html());