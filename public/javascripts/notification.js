$(function(){
    $.ajax({
        type: 'GET', 
        url: '/user/getNotification',
        dataType: 'json', 
        contentType: 'application/json', 
        cache: false,
        success:function(data) {
            var notification = $('#notification')
           
            data.notifications.forEach(function(element) {
               
                if(element.type=='EMPLOYEE_MOVEMENT'){
                    notification.append(`
                        <li>
                            <div>
                                <p>You have a employee Movement Request</p>
                                <div class="notification_buttons">
                                <a href="#" class="btn btn-success btn-sm">Accept</a>
                                <a href="#" class="btn btn-danger btn-sm pull-right">Reject</a>
                                </div>
                            </div>
                        </li>
                    `)
                } else {

                } 
            });           
        },         
        error: function(err) { 
            alert(err); 
        }
    })

})