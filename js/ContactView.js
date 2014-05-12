var ContactView = function(contact) {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
	$("body").on('click','.send-present',function(){
	    app.showAlert('Sending a msg to ' + contact.displayName,"Jeremy-Deals!");
	});
    };
    
    this.render = function() {
	var self = this;
	self.el.html(ContactView.template(contact));
	//console.log(contact);
	//Render the giftlist.
	$.get(app.apiURL, null, function(data){
	    console.log(data);
	    self.el.append(ContactView.giftLiTpl(data));
	});
	
	return this;
    };
 
    this.initialise();
 
}
 
ContactView.template = Handlebars.compile($("#contact-tpl").html());
ContactView.giftLiTpl = Handlebars.compile($("#gift-li-tpl").html());