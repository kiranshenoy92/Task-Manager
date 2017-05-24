$(function(){
    $.ajax({
        type: 'GET', 
        url: '/user/getNotification',
        dataType: 'json', 
        contentType: 'application/json', 
        cache: false,
        success:function(data) {
            var notification = $('#notification')
            console.log(data)
            data.notifications.forEach(function(element) {
                if(element.type=='EMPLOYEE_MOVEMENT'){
                    notification.append(`
                        <li>
                            <div id ="`+element._id+`">
                                <p>You have a employee Movement Request for `+element.targetEmployeeID.firstName+` `+element.targetEmployeeID.lastName+` from `+element.fromEmployeeID.firstName+` `+element.fromEmployeeID.lastName+`</p>
                                <div class="notification_buttons">
                                    <button id ="`+element.referenceID+`" class="Accept btn btn-success btn-sm">Accept</button>
                                    <button id ="`+element.referenceID+`" class="Reject btn btn-danger btn-sm pull-right">Reject</button>
                                </div>
                            </div>
                        </li>
                        <hr>
                    `)
                } else if(element.type=='EMPLOYEE_MOVEMENT_SUCCESS') {
                    notification.append(`
                        <li>
                            <div>
                                <p>`+element.fromEmployeeID.firstName+` `+element.fromEmployeeID.lastName+` has approved the movement of `+element.targetEmployeeID.firstName+` `+element.targetEmployeeID.lastName+` under you</p>
                            </div>
                        </li>
                        <hr>
                    `)
                }
            }); 
            notification.append(`<p>SEE ALL</p>`)           
        },         
        error: function(err) { 
            alert(err); 
        }
    })

$(document).on('click', '#employee-notification .dropdown-menu', function (e) {
  e.stopPropagation();
});

$(document).on('click', '#employee-notification-btn', function (e) {
  $.ajax({
        type: 'PUT',
        url : '/user/updateNotificationRead',
        dataType : 'json',
        contentType : 'application/json',
        cache : false,
        success : function(data) {
            
           
        },
        error : function() {
            alert("error occured")
        }
    })
});

$(document.body).on("click",".Accept",function(){
    $.ajax({
        type: 'PUT',
        url : '/user/changeManagerAccept/'+this.id,
        dataType : 'json',
        contentType : 'application/json',
        cache : false,
        success : function(data) {
            
            if(data.success==true) {
                var id = $('#'+data.notification._id)
                console.log(id)
                id.html(``)
                console.log(id)
                id.append(`<p>`+data.notification.targetEmployeeID.firstName+` `+data.notification.targetEmployeeID.lastName+` has been moved under `+data.notification.fromEmployeeID.firstName+` `+data.notification.fromEmployeeID.lastName+`</p>`)
            }
        },
        error : function() {
            alert("error occured")
        }
    })
})

$(document.body).on("click",".Reject",function(){
       /* $.ajax({
        type: 'PUT',
        url : '/user/changeManagerRreject/'+this.id,
        dataType : 'json',
        contentType : 'application/json',
        cache : false,
        success : function(data) {

        },
        error : function() {
            alert("error occured")
        }
    })*/
    var id = $(this).parent().parent()[0].id
    $("#"+id).html('')
    $("#"+id).append(`<p>Done Deleting</p>`)
    
    //console.log($(this).parent().parent().id)
    //console.log($(this).parent().parent()[0].html(''))
})

})