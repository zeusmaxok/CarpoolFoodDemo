/*globals $:false */

var url = "";




$(document).ready(function () {
    $("#Login").submit(function (event) {
        $.ajax({
            type: "POST",
            url: "http://localhost:50126/login",
            data: {
                loginName: $("#inputLoginName").val(),
                pwd: $("#inputPassword").val()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
            },
            statusCode: {
                404: function () {
                    alert("User Not Found");
                },              
                400: function () {
                    alert("Bad Request");
                }
            },
            success: function (data) {

                var data2 = JSON.parse(data);

                localStorage.setItem("CurrentUser", data);
                localStorage.setItem("firstName", data2.FirstName);
                window.location = "../Pages/UserHome.html";               
            }
        });
        return false;
    });
});
