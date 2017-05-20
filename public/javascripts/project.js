function goBack() {
    window.history.back();
}

$(document.body).on( "click","input[type=checkbox]",function() {
    if(this.checked) {
        $(this).parent().parent().css("background-color","rgba(56, 122, 56, 0.68)");
    } else {        
        $(this).parent().parent().css("background-color","#698592");
    }
});

$('#managerID').on('change',(e)=>{
    $.ajax({
        type: 'GET', 
        url: '/project/getemployees/' + $('#managerID').val(),
        dataType: 'json', 
        contentType: 'application/json', 
        cache: false,
        success:function(data) { 
            var teamMembers = $('#teamMembers');
            teamMembers.html('');

            data.employees.forEach(function(employee) {
                teamMembers.append(`
                    <div class="col-ls-4 col-md-4 col-sm-6">
                    <div class="employee well">
                        <div class="checkbox">
                            <input  id="`+employee._id+`" type="checkbox" name ="teamMembersID" value="`+employee._id+`">
                            <label for="`+employee._id+`">
                                <h3>`+employee.firstName+` `+employee.lastName+`</h3>
                            
                            <p><strong>Email: </strong>`+employee.email+`</p>
                            <p><strong>Employee ID: </strong>`+employee.employeeID+`</p>
                            <p><strong>Designation: </strong>`+employee.designation.designation+`</p></label>
                        </div>
                    </div> 
                `)
            });
        },         
        error: function() { 
            alert("Error while getting results"); 
        }
    })
});

$('#projectDetailsForm').submit(function(event){
    $('#projectName, #projectType').each(function(){
        if($.trim(this.value)==""){
            console.log(this.value);
            event.preventDefault();
            $("#"+this.id+"message").html("This is a required field").css("color","red");
            $(this).css("border","2px solid red");
        }
        else {
            $("#"+this.id+"message").html('')
            $(this).css("border","2px solid green");
        }
    })
})

$('#projectDurationForm').submit(function(event){
    var sitStartDate = new Date($('#sitStartDate').val());
    var sitEndDate = new Date($('#sitEndDate').val());

    var uatStartDate = new Date($('#uatStartDate').val());
    var uatEndDate = new Date($('#uatEndDate').val());

    var prodStartDate = new Date($('#prodStartDate').val());
    var prodEndDate = new Date($('#prodEndDate').val());

     if (!/Invalid|NaN/.test(sitStartDate) || !/Invalid|NaN/.test(sitEndDate)) {
        if(sitStartDate<=sitEndDate){
            $('#sitStartDate').css("border","2px solid green");
            $('#sitEndDate').css("border","2px solid green");
            $('#sitmessage').html('');
        } else {
            $('#sitStartDate').css("border","2px solid red");
            $('#sitEndDate').css("border","2px solid red");
            $('#sitmessage').html('Start Date should be lower than End Date.').css("color","red");
            event.preventDefault();
        }
    } else {
        $('#sitStartDate').css("border","");
        $('#sitEndDate').css("border","");
        $('#sitmessage').html('');
    }

    if (!/Invalid|NaN/.test(uatStartDate) || !/Invalid|NaN/.test(uatEndDate)) {
        if(uatStartDate<=uatEndDate){
            $('#uatStartDate').css("border","2px solid green");
            $('#uatEndDate').css("border","2px solid green");
            $('#uatmessage').html('');
        } else {
            $('#uatStartDate').css("border","2px solid red");
            $('#uatEndDate').css("border","2px solid red");
            $('#uatmessage').html('Start Date should be lower than End Date.').css("color","red");
            event.preventDefault();
        }
    } else {
        $('#uatStartDate').css("border","");
        $('#uatEndDate').css("border","");
        $('#uatmessage').html('');
    }

    if (!/Invalid|NaN/.test(prodStartDate) || !/Invalid|NaN/.test(prodEndDate)) {
        if(prodStartDate<=prodEndDate){
            $('#prodStartDate').css("border","2px solid green");
            $('#prodEndDate').css("border","2px solid green");
            $('#prodmessage').html('');
        } else {
            $('#prodStartDate').css("border","2px solid red");
            $('#prodEndDate').css("border","2px solid red");
            $('#prodmessage').html('Start Date should be lower than End Date.').css("color","red");
            event.preventDefault();
        }
    } else {
        $('#prodStartDate').css("border","");
        $('#prodEndDate').css("border","");
        $('#prodmessage').html('');
    }
})