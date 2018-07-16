

$(document).ready(function() {
var send = $('#send'); 
var $booksWrapper = $("#reviews");

     $.ajax({
        url: "/getreviews",
        method: "GET"
    }).then(function(Reviews) {
 
        Reviews.forEach(function(Review) {
            var $bookTemplate = $("#templateReviews > div").clone();
    
            $bookTemplate.find("[data-name]").text(Review.name);
            $bookTemplate.find("[data-date]").text(Review.date);
            $bookTemplate.find("[data-review]").text(Review.review);


            $booksWrapper.prepend($bookTemplate);
        });
    })



send.click(function(event){
    if(localStorage.getItem("login") !== null){
        if($('textarea').val().length < 25){
            alert("Отзыв должен состоять не менее чем из 25 символов");
        }
        else{

            alert($('textarea').val());

                $.ajax({
                    url: "/sendreviews",
                    method: "POST",
                    data:  
                        {
                            client_id:  localStorage.getItem("client_id"),
                            review: $('textarea').val(),
                        }
                }).then(function(res) {
                    var $bookTemplate = $("#templateReviews > div").clone();
                    $bookTemplate.find("[data-name]").text(localStorage.getItem("login"));
                    $bookTemplate.find("[data-date]").text("Только что");
                    $bookTemplate.find("[data-review]").text($('textarea').val());
                    $booksWrapper.prepend($bookTemplate);
                });
        }
    }
    else{
        $('#forsignUp').hide(); 
        $('#forLogin').show();
        $('#login').parent().css({"background":"#826464", "border-bottom-right-radius":"20px", "border-top-right-radius":"20px" }); 
        $('#signUp').parent().css({"background":"#4c2c2c", "border-radius:":"none" }); 
        openModal("#loginModal");
    }
});  


     
});








