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

/*

<div class="col-ls-4 col-md-4 col-sm-6">
                    <div class="employee well">
                        <div class="checkbox checkbox-success">
                            <input style="display:none" id="`+employee.employeeID+`" type="checkbox">
                            <label for="`+employee.employeeID+`">
                                `+employee.firstName+` `+employee.lastName+`
                            </label>
                            <p><strong>Email: </strong>`+employee.email+`</p>
                            <p><strong>Employee ID: </strong>`+employee.employeeID+`</p>
                            <p><strong>Designation: </strong>`+employee.designation.designation+`</p>
                        </div>
                    </div> 
                    
                    

                    <div id="checkboxes">
                       <input type="checkbox" name="rGroup" value="1" id="r1"/>
                        <label class="whatever" for="r1">one</label>
                    </div>
                    
                    */