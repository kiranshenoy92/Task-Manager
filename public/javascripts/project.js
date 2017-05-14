function goBack() {
    window.history.back();
}

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
                        <div class="checkbox checkbox-success">
                            <input id="`+employee.employeeID+`" type="checkbox">
                            <label for="`+employee.employeeID+`">
                                `+employee.firstName+` `+employee.lastName+`
                            </label>
                            <p><strong>Email: </strong>`+employee.email+`</p>
                            <p><strong>Employee ID: </strong>`+employee.employeeID+`</p>
                            <p><strong>Designation: </strong>`+employee.designation.designation+`</p>
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

