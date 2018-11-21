/*globals $:false */

$(document).ready(function () {
    var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
    alert(currentUser.LoginName + "PickupUser: " + currentUser.IsPickupUser + ";  DriverUser: " + currentUser.IsDriverUser);
    
    
    $(".form-heading span").append(currentUser.LoginName);
    
    if (currentUser.IsPickupUser) {
        $(".list-group").append('<button type="submit" class="btn">New Pickup Request</button><button type="submit" class="btn">Search Driver Service</button><button type="submit" class="btn">My Pickup Requests</button>');
        
        $(".btn").addClass("list-group-item list-group-item-action btn-lg");
    } else if (currentUser.IsDriverUser) {
        $(".list-group").append('<button type="submit" class="btn" id="btn1">New Driver Service</button><button type="submit" class="btn" id="btn2">Search Pickup Request</button><button type="submit" class="btn" id="btn3">My Driver Services</button>');
        
        $(".btn").addClass("list-group-item list-group-item-action btn-lg");
    } else {

    }
});
