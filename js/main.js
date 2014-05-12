var app = {

    initialise: function() {
	var self = this;
	this.apiURL = 'http://equalitea.local/api';
        this.detailsURL = /^#(contact|round)\/(.*)/;
	this.registerEvents();
	this.store = new MemoryStore(function() {
	    self.route();
	});
    },
        
    route: function() {
	var self = this;
	var hash = window.location.hash;
	
	if (!hash) {
	    if (this.homePage) {
		this.slidePage(this.homePage);
	    } else {
		this.homePage = new HomeView(this.store).render();
		this.slidePage(this.homePage);
	    }
	    return;
	}
	
	var match = hash.match(app.detailsURL);
        console.log(match);
	if (match) {
            var id = match[2];
	    
            switch(match[1]){
                
                case 'contact':
                    this.findContactById(id);
                    break;
                    
                case 'round':
                    this.findRoundById(id);
                    break;
                    
                default:
                    break;
            }
	    //this.store.findById(Number(match[1]), function(contact) {
		//self.slidePage(new ContactView(contact).render());
	    //});
	}
    },
    
    findContactById: function(id){
	var self = this;
	var options = new ContactFindOptions();
	options.filter = id;
	options.multiple = false;
	var fields = ["displayName", "name", "id","addresses","photos"];
	navigator.contacts.find(fields, 
	    function onSuccess(contacts) {
                var msg = 'Found ' + contacts.length + ' contacts.';
		if(contacts.length > 0){
		    self.slidePage(new ContactView(contacts[0]).render());
                }
                else{
                }
	    }, 
	    function onError(contactError) {
		app.showAlert('onError!');
	    }, 
	    options);
    },
    
    /**
     * Look up a round and switch in the view.
     * 
     * @param {int} id
     * @returns {undefined}
     */
    findRoundById: function(id){
        var self = this;
        $.get(this.apiURL + '/round/' + id, null, function(data){
	    console.log(data);
	    self.slidePage(new RoundView(data[0]).render());
	});
    },
    
    slidePage: function(page) {
 
	var currentPageDest,
	self = this;
 
	// If there is no current page (app just started) -> No transition: Position new page in the view port
	if (!this.currentPage) {
	    $(page.el).attr('class', 'page stage-center');
	    $('body').append(page.el);
	    this.currentPage = page;
	    return;
	}
 
	// Cleaning up: remove old pages that were moved out of the viewport
	$('.stage-right, .stage-left').not('.homePage').remove();
 
	if (page === app.homePage) {
	    // Always apply a Back transition (slide from left) when we go back to the search page
	    $(page.el).attr('class', 'page stage-left');
	    currentPageDest = "stage-right";
	} else {
	    // Forward transition (slide from right)
	    $(page.el).attr('class', 'page stage-right');
	    currentPageDest = "stage-left";
	}
 
	$('body').append(page.el);
 
	// Wait until the new page has been added to the DOM...
	setTimeout(function() {
	    // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
	    $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
	    // Slide in the new page
	    $(page.el).attr('class', 'page stage-center transition');
	    self.currentPage = page;
	});
 
    },
    
    registerEvents: function() {
	//var self = this;
	$(window).on('hashchange', $.proxy(this.route, this));
	// Check of browser supports touch events...
	if (document.documentElement.hasOwnProperty('ontouchstart')) {
	    // ... if yes: register touch event listener to change the "selected" state of the item
	    $('body').on('touchstart', 'a', function(event) {
		$(event.target).addClass('tappable-active');
	    });
	    $('body').on('touchend', 'a', function(event) {
		$(event.target).removeClass('tappable-active');
	    });
	} else {
	    // ... if not: register mouse events instead
	    $('body').on('mousedown', 'a', function(event) {
		$(event.target).addClass('tappable-active');
	    });
	    $('body').on('mouseup', 'a', function(event) {
		$(event.target).removeClass('tappable-active');
	    });
	}
    },

    showAlert: function (message, title) {
	if (navigator.notification) {
	    navigator.notification.alert(message, null, title, 'OK');
	} else {
	    alert(title ? (title + ": " + message) : message);
	}   
    }

};

app.initialise();

//function onDeviceReady() {
//    // specify contact search criteria
//    var options = new ContactFindOptions();
//    options.filter="";          // empty search string returns all contacts
//    options.multiple=true;      // return multiple results
//    filter = ["displayName"];   // return contact.displayName field
//
//    // find contacts
//    navigator.contacts.find(filter, onSuccess, onError, options);
//}
//
//var names = [];
//
//// onSuccess: Get a snapshot of the current contacts
////
//function onSuccess(contacts) {
//    for (var i=0; i<contacts.length; i++) {
//        if (contacts[i].displayName) {  // many contacts don't have displayName
//            names.push(contacts[i].displayName);
//        }
//    }
//    alert('contacts loaded');
//}