var ContactStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        // find all contacts with 'Bob' in any name field
	var options = new ContactFindOptions();
	options.filter="";
	options.multiple=true;
	var fields = ["displayName", "name"];
        var contacts = navigator.contacts.find(fields, 
	    function onSuccess(contacts) {
	    }, 
	    function onError(contactError) {
		app.showAlert('onError!');
	    }, 
	    options);
//        var contacts = this.contacts.filter(function(element) {
//            var fullName = element.firstName + " " + element.lastName;
//            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
//        });
        callLater(callback, contacts);
    }
//
//    this.findById = function(id, callback) {
//        var contacts = this.contacts;
//        var contact = null;
//        var l = contacts.length;
//        for (var i=0; i < l; i++) {
//            if (contacts[i].id === id) {
//                contact = contacts[i];
//                break;
//            }
//        }
//        callLater(callback, contact);
//    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }
    
    callLater(successCallback);

}