/*globals $:false */

var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

$(document).ready(function () {

    alert('Id: ' + currentUser.Id + ';  User: ' + currentUser.LoginName + ";  PickupUser: " + currentUser.IsPickupUser + ";  DriverUser: " + currentUser.IsDriverUser);

    $(".form-heading span").append(currentUser.LoginName);

    if (currentUser.IsPickupUser) {
        $(".list-group").append('<button type="submit" class="btn mbtn" id="btn1" data-toggle="modal" data-target="#CarpoolFoodModal">New Pickup Request</button><button type="submit" class="btn mbtn" id="btn2" data-toggle="modal" data-target="#CarpoolFoodFormModal">Search Driver Service</button><button type="submit" class="btn mbtn" id="btn3">My Pickup Requests</button>');

    } else if (currentUser.IsDriverUser) {
        $(".list-group").append('<button type="submit" class="btn mbtn" id="btn1" data-toggle="modal" data-target="#CarpoolFoodModal">New Driver Service</button><button type="submit" class="btn mbtn" id="btn2" data-toggle="modal" data-target="#CarpoolFoodFormModal">Search Pickup Request</button><button type="submit" class="btn mbtn" id="btn3">My Driver Services</button>');

    }

    $(".mbtn").addClass("list-group-item list-group-item-action btn-lg");

    var _url = '';
    var _role = '';


    $("#btn1").on('click', function () {
        var buttonText = $(this).text();

        if (buttonText.toLowerCase().indexOf("driver") >= 0) {

            $("#CarpoolFoodModal .modal-title").html("Create New Driver Service");
            $("#body-content").append(NewRequestOrService("driver"));

        } else if (buttonText.toLowerCase().indexOf("pickup") >= 0) {

            $("#CarpoolFoodModal .modal-title").html("Create New Pickup Request");
            $("#body-content").append(NewRequestOrService("pickup"));

        }

        $("#createRequest").submit(function (e) {
            if (buttonText.toLowerCase().indexOf("driver") >= 0) {

                _url = 'http://localhost:50126/newdriverservice';
                _role = 'driver';

                DriverService.Activity.restaurant = $("#restaurant").val();
                DriverService.Activity.Notes = $("#note").val();
                DriverService.Activity.UserId = currentUser.Id;
                DriverService.DeliveringTimeStart = $("#deliveringTimeStart").val();
                DriverService.PickupQuantity = $("#pickupQuantity").val();
                DriverService.Address.Address1 = $("#address1").val();
                DriverService.Address.Address2 = $("#address2").val();
                DriverService.Address.City = $("#city").val();
                DriverService.Address.State = $("#state").val();
                DriverService.Address.ZipCode = $("#zipcode").val();

                newRequestOrService(_role, _url, DriverService);

            } else if (buttonText.toLowerCase().indexOf("pickup") >= 0) {

                _url = 'http://localhost:50126/newpickuprequest';
                _role = 'pickup';

                PickupRequest.Activity.Restaurant = $("#restaurant").val();
                PickupRequest.Activity.Notes = $("#note").val();
                PickupRequest.Activity.UserId = currentUser.Id;
                PickupRequest.PreferedPickupTime = $("#PreferedPickupTime").val();
                PickupRequest.FoodOrderNumber = $("#foodOrder").val();
                PickupRequest.Tips = $("#tips").val();
                PickupRequest.Address.Address1 = $("#address1").val();
                PickupRequest.Address.Address2 = $("#address2").val();
                PickupRequest.Address.City = $("#city").val();
                PickupRequest.Address.State = $("#state").val();
                PickupRequest.Address.ZipCode = $("#zipcode").val();

                newRequestOrService(_role, _url, PickupRequest);
            }

            return false;

        });


    });

    $("#btn2").click(function () {

        //alert("btn2");

        $("#CarpoolFoodFormModal .modal-title").html("New Search");

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

            $('#CarpoolFoodFormModal').modal('toggle');

            if (currentUser.IsPickupUser) {
                getDriversOrPickups('driver', 'http://localhost:50126/getdriverservices', 0, 2);
                getDriversOrPickups('pickup', 'http://localhost:50126/getpickuprequests', currentUser.Id, 3);
            } else if (currentUser.IsDriverUser) {
                getDriversOrPickups('pickup', 'http://localhost:50126/getpickuprequests', 0, 2);
                getDriversOrPickups('driver', 'http://localhost:50126/getdriverservices', currentUser.Id, 3);

            }

            $("#CarpoolFoodModal .modal-title").html("Choose your Service/Request");
            $("#CarpoolFoodModal").modal("show");



            return false;
        });
    });

    $("#btn3").click(function () {
        //alert("btn3");
        if (currentUser.IsPickupUser) {

            _role = 'pickup';
            _url = 'http://localhost:50126/getpickuprequests';

            getDriversOrPickups(_role, _url, currentUser.Id, 1);

            $("#CarpoolFoodModal .modal-title").html("Your Requests");
            $("#CarpoolFoodModal").modal("show");

            return false;

        } else if (currentUser.IsDriverUser) {

            _role = 'driver';
            _url = 'http://localhost:50126/getdriverservices';

            getDriversOrPickups(_role, _url, currentUser.Id, 1);

            $("#CarpoolFoodModal .modal-title").html("Your Services");
            $("#CarpoolFoodModal").modal("show");

            return false;

        }
    });

    $("#save").click(function () {
        var requestID = $("input[name='request']:checked").val();
        var serviceID = $("input[name='service']:checked").val();

        //alert('RequestId: ' + requestID + ';  ServiceId: ' + serviceID);

        placeOrder(requestID, serviceID);
    });



    $("#CarpoolFoodModal").on("hidden.bs.modal", function () {
        $("#body-content").html("");
    });

    $("#CarpoolFoodFormModal").on("hidden.bs.modal", function () {
        $("#form-content").html("");
    });

});

function newRequestOrService(role, url, data) {
    //alert(JSON.stringify(data));
    if (role === 'driver') {
        $.ajax({
            type: "POST",
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
            },
            statusCode: {
                404: function () {
                    alert("New Request 404");
                },
                400: function () {
                    alert("Bad Request");
                }
            },
            success: function (data) {
                alert(data);
            }
        });
    }

    if (role === 'pickup') {
        $.ajax({
            type: "POST",
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
            },
            statusCode: {
                404: function () {
                    alert("New Request 404");
                },
                400: function () {
                    alert("Bad Request");
                }
            },
            success: function (data) {
                alert(data);
            }
        });
    }
}


function getDriversOrPickups(role, url, userId, caller) {
    //alert("getDriversOrPickups ajax");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            restaurant: $("#restaurant").val(),
            status: $("#status").val(),
            userId: userId,
            caller: caller
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

            $("#serviceStart").on('click', function () {
                var serviceID = $("input[name='service']:checked").val();
                alert("#serviceStart " + serviceID);
                
            });

            $("#completeService").on('click', function () {
                var serviceID = $("input[name='service']:checked").val();
                alert("#completeService " + serviceID);
                completeService(serviceID);
            });
        }
    });
}


function placeOrder(requestId, serviceId) {
    //alert("placeOrder ajax");
    $.ajax({
        type: "POST",
        url: 'http://localhost:50126/plcaerequestorservice',
        data: {
            requestID: requestId,
            serviceID: serviceId
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
            alert("Place order success");
        }
    });
}

function completeService(serviceId) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:50126/completedriverservice',
        data: {
            serviceID: serviceId
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

            $.each(data, function (index, value) {
                connection.invoke("SendNotification", value, "Your food is successfully delivered.").catch(function (err) {
                    return console.error(err.toString());
                });
            });
        }
    });
}

var PickupRequest = {
    "Activity": {
        "UserId": 0,
        "Restaurant": "",
        "Notes": ""
    },
    "FoodOrderNumber": "",
    "Tips": 0,
    "PreferedPickupTime": "",
    "Address": {
        "Address1": "",
        "Address2": "",
        "City": "",
        "State": "",
        "ZipCode": ""
    }
};

var DriverService = {
    "Activity": {
        "UserId": 0,
        "restaurant": "",
        "Notes": ""
    },
    "PickupQuantity": 0,
    "DeliveringTimeStart": "",
    "Address": {
        "Address1": "",
        "Address2": "",
        "City": "",
        "State": "",
        "ZipCode": ""
    }
};
