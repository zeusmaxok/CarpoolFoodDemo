/*globals $:false */

function getRequestsOrServices(role, data) {

    var appendContent = injectDriverOrService(role, data);

    $("#body-content").append(appendContent);
}

function injectDriverOrService(role, CarpoolObjects) {
    if (role === 'driver') {

        var objectCard = '';

        $.each(CarpoolObjects, function (index, value) {
            var activityID = '';//'<option value="' + value.activity.id + '">';

            var restaurant = '<div><span>Restaurant: </span>' + value.activity.restaurant + '</div>';

            var availableSpots = '<div><span>Available Spots: </span>' + value.availableSpots + '<br></div>';

            var deliveringTimeStart = '<div><span>Delivering At: </span>' + value.deliveringTimeStart + '</div>';

            var notes = '<div><span>Note: </span>' + value.activity.notes + '</div>';

            var address = '<div><span>Drop-Off At: </span>' + value.address.address1 + '<br>' + value.address.address2 + '<br>' +
                value.address.city + '<br>' +
                value.address.state + '<br>' +
                value.address.zipcode + '</div>';

            objectCard = objectCard + '<div class="CarpoolObject">' + activityID + restaurant.concat(availableSpots, deliveringTimeStart, notes, address) + '</div>';
        });

        objectCard = '<div class="CarpoolObjectContainer"><form class="form-group" id="RequestOrService"><select multiple class="form-control">' + objectCard + '</select><button type="submit" class="btn btn-primary" data-toggle="modal">Submit</button></form></div>';

        return objectCard;
    }

    if (role === 'pickup') {

        var objectCard = '';

        $.each(CarpoolObjects, function (index, value) {
            var ActivityID = '';//'<option value="' + value.activity.id + '">';    
            
            var restaurant = '<div><span>Restaurant: </span>' + value.activity.restaurant + '</div>';

            var preferedPickupTime = '<div><span>Prefer Pickup At: </span>' + value.preferedPickupTime + '<br></div>';

            var notes = '<div><span>Note: </span>' + value.notes + '</div>';

            var address = '<div><span>Drop-Off At: </span>' + value.address.address1 + '<br>' + value.address.address2 + '<br>' +
                value.address.city + '<br>' +
                value.address.ctate + '<br>' +
                value.address.zipcode + '</div>';

            objectCard = objectCard + '<div class="CarpoolObject">' + ActivityID + restaurant.concat(preferedPickupTime, notes, address) + '</div>';
        });

        objectCard = '<div class="CarpoolObjectContainer"><form class="form-group" id="RequestOrService"><select multiple class="form-control">' + objectCard + '</select><button type="submit" class="btn btn-primary" data-toggle="modal">Submit</button></form></div>';

        return objectCard;
    }
}

function searchForm(){
    var _formbody = '<form id="searchForm">' +
                        '<div class="form-group">' +
                            '<input type="text" class="form-control" id="restaurant" placeholder="Restaurant">'+
                        '</div>' +
                        
                        '<div class="form-group">' +
                            '<input type="hidden" id="status" value="Ready"/>' +
                        '</div>' +                      
                        
                        '<button type="submit" class="btn btn-primary">Submit</button>' +
                    '</form>';
    return _formbody;
    
}



function logout() {
    localStorage.removeItem("CurrentUser");
}
