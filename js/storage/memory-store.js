var MemoryStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var players = this.players.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, players);
    }

    this.findById = function(id, callback) {
        var players = this.players;
        var player = null;
        var l = players.length;
        for (var i=0; i < l; i++) {
            if (players[i].id === id) {
                player = players[i];
                break;
            }
        }
        callLater(callback, player);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    this.players = [
            {"id": 1, "firstName": "Steven", "lastName": "Gerrard", "postion":"Midfield", "joined": 0, "squadNumber":"New York, NY", "dob":"212-999-8888", "officePhone":"212-999-8887", "email":"ryan@dundermifflin.com"},
            {"id": 2, "firstName": "Raheem", "lastName": "Sterling", "position":"Midfield", "joined": 1, "squadNumber":"Scranton, PA", "dob":"570-865-2536", "officePhone":"570-123-4567", "email":"michael@dundermifflin.com"},
            {"id": 3, "firstName": "Luis", "lastName": "Suarez", "position":"Striker", "joined": 2, "squadNumber":"Scranton, PA", "dob":"570-865-1158", "officePhone":"570-843-8963", "email":"dwight@dundermifflin.com"},
            {"id": 4, "firstName": "Daniel", "lastName": "Sturridge", "position":"Striker", "joined": 2, "squadNumber":"Scranton, PA", "dob":"570-865-8989", "officePhone":"570-968-5741", "email":"dwight@dundermifflin.com"},
            {"id": 5, "firstName": "Jordan", "lastName": "Henderson", "position":"Midfield", "joined": 2, "squadNumber":"Scranton, PA", "dob":"570-999-5555", "officePhone":"570-999-7474", "email":"pam@dundermifflin.com"},
            {"id": 6, "firstName": "Simon", "lastName": "Mignolet", "position":"Goal", "joined": 2, "squadNumber":"Scranton, PA", "dob":"570-555-9696", "officePhone":"570-999-3232", "email":"angela@dundermifflin.com"},
            {"id": 7, "firstName": "Philippe", "lastName": "Coutinho", "position":"Midfield", "joined": 6, "squadNumber":"Scranton, PA", "dob":"570-777-9696", "officePhone":"570-111-2525", "email":"kmalone@dundermifflin.com"},
            {"id": 8, "firstName": "Martin", "lastName": "Skrtel", "position":"Defense", "joined": 6, "squadNumber":"Scranton, PA", "dob":"570-321-9999", "officePhone":"570-585-3333", "email":"oscar@dundermifflin.com"},
            {"id": 9, "firstName": "Mamadou", "lastName": "Sakho", "position":"Defense", "joined": 2, "squadNumber":"Scranton, PA", "dob":"570-222-6666", "officePhone":"570-333-8585", "email":"creed@dundermifflin.com"},
            {"id": 10, "firstName": "Glen", "lastName": "Johnson", "position":"Defense", "joined": 4, "squadNumber":"2", "dob":"23 Aug 1984", "officePhone":"570-646-9999", "email":"andy@dundermifflin.com"},
            {"id": 11, "firstName": "Jon", "lastName": "Flanagan", "position":"Defense", "joined": 10, "squadNumber":"Scranton, PA", "dob":"570-241-8585", "officePhone":"570-632-1919", "email":"phyllis@dundermifflin.com"},
            {"id": 12, "firstName": "Brendan", "lastName": "Rodgers", "position":"Manager", "joined": 10, "squadNumber":"Scranton, PA", "dob":"570-700-6464", "officePhone":"570-787-9393", "email":"shudson@dundermifflin.com"}
            
        ];

    callLater(successCallback);

}