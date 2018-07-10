app.service("myAjax", function($q,$http) {

    var ajax = function(method,url,data) {

        var deferred = $q.defer();
        var request = {
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (method === 'GET') {
            request.params = data;
        } else {
            request.data = data;
        }
        $http(request).then(function(response){
            deferred.resolve(response);
        },function(response){
            deferred.reject({data: response.data, status: response.status});
        });
        return deferred.promise;
    };


    this.signInUser = function(data) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/user/"+ data.username, data);
    };

    this.modifyUser = function (data) {
        return ajax("PUT", "http://localhost:8200/ticketingsystem/user/"+ data.username, data);

    };

    this.createTicket = function (data) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/ticket/", data);

    };

    this.getTickets = function(params) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/ticket", params);
    };

    this.getTargets = function (params) {
        return ajax("GET","http://localhost:8200/ticketingsystem/target",params);

    };

    this.myTickets = function (data) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/ticket/getTicketsByUser", data);

    };

    this.createTarget = function (data) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/target", data);

    };

    this.newRelation = function (data) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/relation/"+ data.name, data);

    };

    this.escalation = function (data) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/escalation", data);

    };

    this.getAllRel = function(params) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/relation", params);
    };

    this.getTicketForDep = function (params) {
        return ajax("GET","http://localhost:8200/ticketingsystem/ticket/findTicketForCreateDependency",params);

    };

    this.getTicketForReg = function (params) {
        return ajax("GET","http://localhost:8200/ticketingsystem/ticket/findTicketForCreateRegression",params);

    };

    this.getTicketForEqual = function (params) {
        return ajax("GET","http://localhost:8200/ticketingsystem/ticket/findTicketForCreateEquality",params);

    };

    this.putRelationEqual = function (data,choose) {
        return ajax("PUT", "http://localhost:8200/ticketingsystem/ticket/addEqualityTicket/"+ choose + "/" + data.sameTicket.id, data);

    };

    this.putRelationDep = function (data,choose,idChoose) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/ticket/addDependentTicket/"+ idChoose + "/" + choose, data);

    };

    this.putRelationRegression = function (data,choose,idChoose) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/ticket/addRegression/" + choose + "/" + idChoose, data);

    };

    this.putRelationCustom = function (data) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/relationInstance/" + data.relation.name + "/" + data.fatherTicket.id + "/" + data.sonTicket.id, data);

    };

    this.getQueue = function (data) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/ticket/findTicketInQueue", data);

    };

    this.getDetailsTicket = function (data,idTicket) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/ticket/" + idTicket, data);

    };

    this.getRelationTicket = function (data) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/relation", data);

    };

    this.getRelationCustomTicket = function (data,ticketId) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/relationInstance/findRelations/" + ticketId, data);

    };

    this.getTicketGantt = function(data,team) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/ticket/findTicketForGantt/" + team , data);

    };

    this.getMyTeam = function(data,username) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/team/findAllTeamsByPerson/" + username , data);

    };
    this.getPlanning = function(data,teamName,date,durat,idtick) {
        return ajax("POST", "http://localhost:8200/ticketingsystem/gantt/createGanttInstance/" + teamName + "/"+ date +"/"+ durat +"/"+idtick, data);

    };

    this.getFatherTicket = function(data,id) {
        return ajax("GET", "http://localhost:8200/ticketingsystem/ticket/findFatherTicket/" + id, data);

    };

});
