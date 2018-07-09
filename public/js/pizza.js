$(document).ready(function() { 
    getPizza();
    function getPizza(){
        $.ajax({
            url: "/pizza",
            method: "GET"
        }).then(function(contentGallery) {
            var $contentWrapper = $("#menu");
            contentGallery.forEach(function(content) {
                var $contentTemplate = $("#template > div").clone();
                $contentTemplate.find("[data-class]").attr("class","category " + content.categories);
                $contentTemplate.find("[data-id]").attr("href","#" + "modalId" + content.pizza_id );
                $contentTemplate.find("[data-url-small]").attr("src", content.URL);
                $contentTemplate.find("[data-name-first]").text(content.name);
                $contentTemplate.find("[data-weight]").text(content.weight);
                $contentTemplate.find("[data-price]").text(content.price);
                $contentTemplate.find("[data-link]").attr("id", "modalId" + content.pizza_id);
                $contentTemplate.find("[data-url-big]").attr("src", content.URL);          
                $contentTemplate.find("[data-name-second]").text(content.name);
                $contentTemplate.find("[data-consist]").text(content.consist);              
                $contentWrapper.append($contentTemplate);           
            });
            var open_modal = $('.open_modal');
            var previousButton = $('.previousButton');
            var nextButton = $('.nextButton');
            var massId = new Array();
            var id, i;   

            function getMassId(){
                $(".forModal").each(function (i) {
                    if ($(this).parent().is(":visible")){
                        massId.push($(this).attr('id'));
                    }
                });
            }
            previousButton.click( function(event){ 
                massId = [];
                getMassId();
                i = $.inArray(id, massId)
                    i==0 ? i=massId.length-1: i--;
                    $('.forDelete').detach();
                    $("#"+massId[i]).children().clone().addClass("forDelete").appendTo(".forGalley");
                    id = massId[i];
            });

            nextButton.click( function(event){ 
                massId = [];
                getMassId();
                i = $.inArray(id, massId)
                    i==massId.length-1 ? i=0 : i++;
                    $('.forDelete').detach();
                    $("#"+massId[i]).children().clone().addClass("forDelete").appendTo(".forGalley");
                    id = massId[i];
            });

            open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
                $('.forDelete').detach();
                $('#galleryModal').modal("show");
                id = ($(this).parent().find('.forModal').attr( "id"));
                $(this).parent().find('.forClone').clone().addClass("forDelete").appendTo(".forGalley");
            });


   
        });
    }
});
