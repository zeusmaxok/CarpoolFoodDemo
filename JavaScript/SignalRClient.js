function signalClient() {
    var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:50126/signalserver").build();

    connection.on("ReceiveNotification", function (userId, message) {
        if (userId != currentUser.Id) {
            alert(userId + "  $$$  " + message);
        }
    });

    connection.start().catch(function (err) {
        return console.error(err.toString());
    });


    $('#textme').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var message = $(this).val();
            connection.invoke("SendNotification", currentUser.Id, message).catch(function (err) {
                return console.error(err.toString());
            });
            event.preventDefault();
        }
    });


}
