
    $('.thumbnail').hover(
        function(){
            $(this).find('.caption').slideDown(250); //.fadeIn(250)
        },
        function(){
            $(this).find('.caption').slideUp(250); //.fadeOut(205)
        }
    ); 

$('img').on("error", function () {
    console.log("called");
   this.src =("https://myspace.com/common/images/user.png");
});