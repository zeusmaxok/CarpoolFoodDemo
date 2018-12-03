/*globals $:false */

function getRequestsOrServices(role, data) {

    var appendContent = injectDriverOrService(role, data);

    $("#body-content").append(appendContent);
}

function injectDriverOrService(role, CarpoolObjects) {
    if (role === 'driver') {

        var objectCard = '';

        $.each(CarpoolObjects, function (index, value) {
            var disabled = ''

            if (value.activity.requestStatus !== 'Ready') {
                disabled = 'disabled';
            }

            var activityID = '<div><input type="radio" name="service" value="' + value.activity.id + '"' + disabled + '>';

            var serviceStatus = '<div><span>Service Status: </span>' + value.activity.requestStatus + '</div>';

            var restaurant = '<div><span>Restaurant: </span>' + value.activity.restaurant + '</div>';

            var availableSpots = '<div><span>Available Spots: </span>' + value.availableSpots + '<br></div>';

            var deliveringTimeStart = '<div><span>Delivering At: </span>' + value.deliveringTimeStart + '</div>';

            var notes = '<div><span>Note: </span>' + value.activity.notes + '</div>';

            var address = '<div><span>Drop-Off At: </span>' + value.address.address1 + '<br>' + value.address.address2 + '<br>' +
                value.address.city + '<br>' +
                value.address.state + '<br>' +
                value.address.zipcode + '</div>';

            objectCard = objectCard + '<div class="CarpoolObject">' + activityID + restaurant.concat(serviceStatus, availableSpots, deliveringTimeStart, notes, address) + '</div>';
        });

        objectCard = '<div class="CarpoolObjectContainer"><p>Driver Services</p><form class="form-group" id="RequestOrService">' + objectCard + '<button type="button" id="submitSOR" class="btn btn-primary" data-toggle="modal">Submit</button></form></div>';

        return objectCard;
    }

    if (role === 'pickup') {

        var objectCard = '';

        $.each(CarpoolObjects, function (index, value) {
            var disabled = ''

            if (value.activity.requestStatus !== 'Ready') {
                disabled = 'disabled';
            }

            var activityID = '<div><input type="radio" name="request" value="' + value.activity.id + '"' + disabled + '>';

            var serviceStatus = '<div><span>Service Status: </span>' + value.activity.requestStatus + '</div>';

            var restaurant = '<div><span>Restaurant: </span>' + value.activity.restaurant + '</div>';

            var preferedPickupTime = '<div><span>Prefer Pickup At: </span>' + value.preferedPickupTime + '<br></div>';

            var notes = '<div><span>Note: </span>' + value.notes + '</div>';

            var address = '<div><span>Drop-Off At: </span>' + value.address.address1 + '<br>' + value.address.address2 + '<br>' +
                value.address.city + '<br>' +
                value.address.ctate + '<br>' +
                value.address.zipcode + '</div>';

            objectCard = objectCard + '<div class="CarpoolObject">' + activityID + restaurant.concat(serviceStatus, preferedPickupTime, notes, address) + '</div>';
        });

        objectCard = '<div class="CarpoolObjectContainer"><p>Pickup Requests</p><form class="form-group" id="RequestOrService">' + objectCard + '<button type="button" id="submitSOR" class="btn btn-primary" data-toggle="modal">Submit</button></form></div>';

        return objectCard;
    }
}

function searchForm() {
    var _formBody = '<form id="searchForm">' +
        '<div class="form-group">' +
        '<input type="text" class="form-control" id="restaurant" placeholder="Restaurant">' +
        '</div>' +

        '<div class="form-group">' +
        '<input type="hidden" id="status" value="Ready"/>' +
        '</div>' +

        '<button type="submit" class="btn btn-primary">Submit</button>' +
        '</form>';
    return _formBody;

}

function NewRequestOrService(role) {
    var _formbody = '';

    if (role === 'pickup') {
        
        _formbody = '<form id="createRequest">' +
            '<div class="form-group">' +
            '<label>Restaurant</label><br>' +
            '<input type="text" class="form-control" id="restaurant" placeholder="Restaurant"/><br>' +
            '<label>Food Order Number</label><br>' +
            '<input type="text" class="form-control" id="foodOrder" placeholder="Order Number"/><br>' +
            '<label>Tips</label><br>' +
            '<input type="number" class="form-control" id="tips" min="0"/><br>' +
            '<label>Prefered Pickup Time</label><br>' +
            '<input type="datetime-local" class="form-control" id="PreferedPickupTime"/><br>' +
            '<label>Note</label><br>' +
            '<input type="text" class="form-control" id="note"/><br>' +
            '<div class="form-group">' +
            '<label>Address1</label><br>' +
            '<input type="text" class="form-control" id="address1"/><br>' +
            '<label>Address2</label><br>' +
            '<input type="text" class="form-control" id="address2"/><br>' +
            '<label>City</label><br>' +
            '<input type="text" class="form-control" id="city"/><br>' +
            '<label>State</label><br>' +
            '<input type="text" class="form-control" id="state"/><br>' +
            '<label>Zipcode</label><br>' +
            '<input type="text" class="form-control" id="zipcode"/><br>' +
            '</div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary">Submit</button>' +
            '</form>';
    } else if (role === 'driver') {
        
        _formbody = '<form id="createRequest">' +
            '<div class="form-group">' +
            '<label>Restaurant</label><br>' +
            '<input type="text" class="form-control" id="restaurant" placeholder="Restaurant"/><br>' +
            '<label>Total Pickups</label><br>' +
            '<input type="number" class="form-control" id="pickupQuantity" min="0"/><br>' +
            '<label>Delivering Time Start</label><br>' +
            '<input type="datetime-local" class="form-control" id="deliveringTimeStart"/><br>' +
            '<label>Note</label><br>' +
            '<input type="text" class="form-control" id="note"/><br>' +
            '<div class="form-group">' +
            '<label>Address1</label><br>' +
            '<input type="text" class="form-control" id="address1"/><br>' +
            '<label>Address2</label><br>' +
            '<input type="text" class="form-control" id="address2"/><br>' +
            '<label>City</label><br>' +
            '<input type="text" class="form-control" id="city"/><br>' +
            '<label>State</label><br>' +
            '<input type="text" class="form-control" id="state"/><br>' +
            '<label>Zipcode</label><br>' +
            '<input type="text" class="form-control" id="zipcode"/><br>' +
            '</div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary">Submit</button>' +
            '</form>';
    }

    return _formbody;
}

function logout() {
    localStorage.removeItem("CurrentUser");
    window.location = "../Pages/Login.html";   
}
