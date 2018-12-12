
    var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:50126/signalserver").build();

    connection.on("ReceiveNotification", function (userId, message) {
        if (userId == currentUser.Id) {
            alert(userId + "  $$$  " + message);
        }
    });

    connection.start().catch(function (err) {
        return console.error(err.toString());
    });