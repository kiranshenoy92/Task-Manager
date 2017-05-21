
$('.thumbnail').hover(
    function(){
        $(this).find('.caption').slideDown(250); //.fadeIn(250)
    },
    function(){
        $(this).find('.caption').slideUp(250); //.fadeOut(205)
    }
); 

$('img').on("error", function () {
   this.src =("https://myspace.com/common/images/user.png");
});

$('.emphasis .btn-primary').on("click",function(){
        $.ajax({
        type: 'POST', 
        url: '/user/sendManagerChangeRequest/' + $(this).attr("id"),
        dataType: 'json', 
        contentType: 'application/json', 
        cache: false,
        success:function(data) {
            console.log(data);
        },         
        error: function() { 
            alert("Error while sending request"); 
        }
    })
})