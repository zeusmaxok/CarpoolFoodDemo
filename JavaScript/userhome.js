/*globals $:false */

var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

$(document).ready(function () {

    alert(currentUser.LoginName + "PickupUser: " + currentUser.IsPickupUser + ";  DriverUser: " + currentUser.IsDriverUser);


    $(".form-heading span").append(currentUser.LoginName);

    if (currentUser.IsPickupUser) {
        $(".list-group").append('<button type="submit" class="btn" id="btn1" data-toggle="modal" data-target="#CarpoolFoodModal">New Pickup Request</button><button type="submit" class="btn" id="btn2" data-toggle="modal" data-target="#CarpoolFoodFormModal">Search Driver Service</button><button type="submit" class="btn" id="btn3">My Pickup Requests</button>');

    } else if (currentUser.IsDriverUser) {
        $(".list-group").append('<button type="submit" class="btn" id="btn1" data-toggle="modal" data-target="#CarpoolFoodModal">New Driver Service</button><button type="submit" class="btn" id="btn2" data-toggle="modal" data-target="#CarpoolFoodFormModal">Search Pickup Request</button><button type="submit" class="btn" id="btn3">My Driver Services</button>');

    }

    $(".btn").addClass("list-group-item list-group-item-action btn-lg");

    var _url = '';
    var _role = '';

    $("#btn2").click(function () {

        alert("btn2");

        $("#form-content").append(searchForm());
        if (currentUser.IsPickupUser) {

            _url = 'http://localhost:50126/getdriverservices';
            _role = 'driver';

        } else if (currentUser.IsDriverUser) {

            _url = 'http://localhost:50126/getpickuprequests';
            _role = 'pickup';

        }

        $("#searchForm").submit(function (e) {

            e.preventDefault();
            // Coding
            $('#CarpoolFoodFormModal').modal('toggle'); 
            getDriversOrPickups(_role, _url);
            $("#CarpoolFoodModal").modal("show");
            return false;
        });
    });


    $("#btn3").click(function () {
        alert("btn3");
        if (currentUser.IsPickupUser) {

            getRequestsOrServices("pickup");

        } else if (currentUser.IsDriverUser) {

            getRequestsOrServices("driver");

        }
    });

    $("#CarpoolFoodModal").on("hidden.bs.modal", function () {
        $("#body-content").html("");
    });

    $("#CarpoolFoodFormModal").on("hidden.bs.modal", function () {
        $("#form-content").html("");
    });

});


function getDriversOrPickups(role, url) {
    alert("getDriversOrPickups ajax");
    $.ajax({
        type: "GET",
        url: url,
        data: {
            restaurant: $("#restaurant").val(),
            status: $("#status").val()
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
            getRequestsOrServices(role, data);
        }
    });
}



var examples = [
    {
        Restaurant: 'Andy1',
        FoodOrderNumber: 'asdfasddf',
        PreferedPickupTime: '1900-01-01 00:00:00.000',
        Notes: 'haha',
        Address: {
            Address1: '123 ABC Ave',
            Address2: '#307',
            City: 'Beijing',
            State: 'Beijing',
            Zipcode: '100000'
        }
    },

    {
        Restaurant: 'Andy2',
        FoodOrderNumber: 'asdfasddf2',
        PreferedPickupTime: '1900-01-01 00:00:00.000',
        Notes: 'haha2',
        Address: {
            Address1: '123 ABC Ave',
            Address2: '#3072',
            City: 'Beijing2',
            State: 'Beijing2',
            Zipcode: '100002'
        }
    }
];
