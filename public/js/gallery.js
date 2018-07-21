    var id,check, i = 0;   
    var massOfAllId = new Array();
    var massOfAllNames = new Array();
    var massOfVisibleId = new Array();
    var contentName;
$(document).ready(function() {
    contentName = $(".workspace").not(":hidden").prop("id");

    switch(contentName){
        case 'pizza':  
            $('#pizza').find('#categoryPizza').show();
            $('#pizza').find('#category').show();
            break;
        case 'paste':  
            $('#paste').find('#categoryPaste').show();
            break;
        case 'risotto':  
            $('#risotto').find('#categoryRisotto').show();
            break;
        case 'dessert':  
            $('#dessert').find('#categoryDessert').show();
            break;                        
    }




    getGallery();
    function getGallery(){
        $.ajax({
            url: "/" + contentName,
            method: "GET"
        }).then(function(contentGallery) {
            var $contentWrapper = $(".workspace").not(":hidden").find("#menu");
            contentGallery.forEach(function(content) {
                var $contentTemplate =  $(".workspace").not(":hidden").find("#template").find(".elements").clone();
                $contentTemplate.find("[data-class]").attr("class","category " + content.categories);
                $contentTemplate.find("[data-id]").attr("href","#" + "modalId" + content[contentName + "_id"] );
                $contentTemplate.find("[data-url-small]").attr("src", content.URL);
                $contentTemplate.find("[data-name-first]").text(content.name);
                $contentTemplate.find("[data-weight]").text(content.weight);
                $contentTemplate.find("[data-price]").text(content.price);
                $contentTemplate.find("[data-link]").attr("id", "modalId" + content[contentName + "_id"]);
                $contentTemplate.find("[data-url-big]").attr("src", content.URL);          
                $contentTemplate.find("[data-name-second]").text(content.name);
                $contentTemplate.find("[data-consist]").text(content.consist);              
                $contentWrapper.append($contentTemplate);
            });

            function getMassOfAllId(){
                $('#' + contentName).find(".forModal").each(function (i) {
                        massOfAllId.push($(this).attr('id'));
                });
            }           

            function getMassOfAllNames(){
                $('#' + contentName).find(".forModal").each(function (i) {
                        massOfAllNames.push($(this).find("[data-name-second]").text());
                });
            }   
            var open_modal = $('#' + contentName).find('.open_modal');
            var open_adminModal = $('#' + contentName).find('#open_adminModal');
            var previousButton = $('#' + contentName).find('.previousButton');
            var nextButton = $('#' + contentName).find('.nextButton');
            var buttonDo = $('#' + contentName).find('#buttonDo');
            var buy = $('#' + contentName).find('.buy'); 
           
            if(localStorage.getItem("rights") === "admin"){
                $('#' + contentName).find("#open_adminModal").show();
            }

            function getMassId(){
                $('#' + contentName).find(".forModal").each(function (i) {
                    if ($(this).parent().is(":visible")){
                        massOfVisibleId.push($(this).attr('id'));
                    }
                });
            }
            previousButton.click( function(event){ 
                massOfVisibleId = [];
                getMassId();
                i = $.inArray(id, massOfVisibleId)
                    i==0 ? i=massOfVisibleId.length-1: i--;
                    $('#' + contentName).find('.forDelete').detach();
                    $('#' + contentName).find("#"+massOfVisibleId[i]).children().clone().addClass("forDelete").appendTo(".forGalley");
                    id = massOfVisibleId[i];
            });

            nextButton.click( function(event){ 
                massOfVisibleId = [];
                getMassId();
                i = $.inArray(id, massOfVisibleId)
                    i==massOfVisibleId.length-1 ? i=0 : i++;
                    $('#' + contentName).find('.forDelete').detach();
                    $('#' + contentName).find("#"+massOfVisibleId[i]).children().clone().addClass("forDelete").appendTo(".forGalley");
                    id = massOfVisibleId[i];
            });

            
            buy.click(function(event){ 
    if(localStorage.getItem("login") !== null){
        var buyName = $("#category").find("h1").text() + ' "' + $(this).parent().find("[data-name-second]").text() + '"';
        var buyWeight = $(this).parent().parent().find("[data-weight]").text();
        var buyPrice = $(this).parent().parent().find("[data-price]").text();
        var buyURL = $(this).parent().parent().find("[data-url-small]").attr("src");
 
        if(localStorage.getItem("buyName") !== null){
            if(localStorage.getItem("buyName").indexOf(buyName) + 1) {
                alert("Заказ уже был добавлен в корзину");
         
            }
            else{
                localStorage.setItem("buyName", localStorage.getItem("buyName") + "," + buyName);
                localStorage.setItem("buyWeight", localStorage.getItem("buyWeight") + "," + buyWeight);
                localStorage.setItem("buyPrice", localStorage.getItem("buyPrice") + "," + buyPrice);
                localStorage.setItem("buyURL", localStorage.getItem("buyURL") + "," + buyURL);
                localStorage.setItem("quantity", localStorage.getItem("quantity") + "," + "1");
            }
        }
        else{
            localStorage.setItem("buyName", buyName);
            localStorage.setItem("buyWeight", buyWeight);
            localStorage.setItem("buyPrice", buyPrice);
            localStorage.setItem("buyURL", buyURL);
            localStorage.setItem("quantity", "1"); 
        }
    }
    else{
        $('#loginModal').modal("show");
        $('#forsignUp').hide(); 
        $('#forLogin').show();
        $('#login').parent().css({"background":"#826464", "border-bottom-right-radius":"20px", "border-top-right-radius":"20px" }); 
        $('#signUp').parent().css({"background":"#4c2c2c", "border-radius:":"none" });
    }
});

            open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
                contentName = $(".workspace").not(":hidden").prop("id");
                $('#' + contentName).find('.forDelete').detach();
                $('#' + contentName).find('#galleryModal').modal("show");
                id = ($(this).parent().find('.forModal').attr( "id"));
                $(this).parent().find('.forClone').clone().addClass("forDelete").appendTo(".forGalley");
            });

            open_adminModal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
             contentName = $(".workspace").not(":hidden").prop("id");
             massOfAllId= [];
             massOfAllNames= [];
             getMassOfAllNames();     
             getMassOfAllId();
             massOfAllNames.pop();
             massOfAllId.pop();
                $('#' + contentName).find('.forDelete').detach();
                id = ($(this).parent().find('.forModal').attr( "id"));
                $(this).parent().find('.forClone').clone().addClass("forDelete").appendTo(".forGalley");
                $('#' + contentName).find("#contentTitle").empty();
                verification(localStorage.getItem("client_id"), localStorage.getItem("verification"));
                $('#' + contentName).find('#adminModal').modal("show");
                for(i = 0; i < massOfAllId.length; i++){
                    $('#' + contentName).find("#contentTitle").prepend( $('<option value="' + massOfAllId[i] + '">' + massOfAllNames[i] 
                    + '</option>'));              
                }
                 if(contentName === "pizza"){
                    $(radioCategory).show();
                } 
            });

            $('#' + contentName).find('#addContent').click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
                $('#' + contentName).find("#contentTitle").attr("disabled",true);
            });

             function changeSelect(){
                $('#' + contentName).find("#adminModal").find("input[name ='name']").val($('#' + contentName).find('#' + $('#' + contentName).find("#contentTitle :selected")
                    .val()).parent().find("[data-name-first]").text());
                $('#' + contentName).find("#adminModal").find("input[name ='weight']").val($('#' + contentName).find('#' + $('#' + contentName).find("#contentTitle :selected")
                    .val()).parent().find("[data-weight]").text());
                $('#' + contentName).find("#adminModal").find("input[name ='price']").val($('#' + contentName).find('#' + $('#' + contentName).find("#contentTitle :selected")
                    .val()).parent().find("[data-price]").text());
                $('#' + contentName).find("#adminModal").find("textarea[name ='consist']").val($('#' + contentName).find('#' + $('#' + contentName).find("#contentTitle :selected")
                    .val()).parent().find("[data-consist]").text());
                
                var className = $('#' + $('#' + contentName).find("#contentTitle :selected")
                    .val()).parent().parent().find("[data-class]").attr("class");
                if(className.indexOf('first') + 1) {
                    $("#adminModal").find("input[name ='first']").prop("checked",true);
                }
                if(className.indexOf('second') + 1) {
                    $("#adminModal").find("input[name ='second']").prop("checked",true);
                }
                if(className.indexOf('popular') + 1) {
                    $("#adminModal").find("input[name ='popular']").prop("checked",true);
                }
                if(className.indexOf('new') + 1) {
                    $("#adminModal").find("input[name ='new']").prop("checked",true);
                }            
            }

            $('#' + contentName).find('#changeContent').click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal               
                $('#' + contentName).find("#contentTitle").attr("disabled",false);
                changeSelect();
            });

            $('#' + contentName).find('#dellContent').click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal               
                $('#' + contentName).find("#contentTitle").attr("disabled",false);
            });

            $('#' + contentName).find("#contentTitle").change(function() {
                $('#' + contentName).find("#adminModal").find("input[name ='first']").prop("checked",false);
                $('#' + contentName).find("#adminModal").find("input[name ='second']").prop("checked",false);
                $('#' + contentName).find("#adminModal").find("input[name ='popular']").prop("checked",false);
                $('#' + contentName).find("#adminModal").find("input[name ='new']").prop("checked",false);
                changeSelect();
            });


            buttonDo.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal


            


               if($('#' + contentName).find('#addContent').hasClass('active')){
                    addContent();
                }
                if($('#' + contentName).find('#changeContent').hasClass('active')){
                    changeContent();
                }
                if($('#' + contentName).find('#dellContent').hasClass('active')){
                    dellContent();
                }
                   
            });

            function dellContent(){
                if (getCheck()){
                    $.ajax({
                        url: "/del" +  contentName,
                        method: "POST",
                        data:  
                        {
                            id: $("#contentTitle :selected").val().substr(-1),
                            URL: "./public/img/pizza/" + $($("#contentTitle :selected").val()).parent()
                            .find('img')[1].src.split("/img/pizza/")[1],
                        }
                    });   
                    $($("#contentTitle :selected").val()).parent().parent().remove();
                    $('#adminModal').modal("hide");
                }
                else{
                    alert("Ошибка доступа");
                    $('#adminModal').modal("hide");
                }
             }

            function changeContent(){
                if (getCheck()){
                    var check = "all";
                    if ($(".adminContent").find("input[name='first']").prop('checked')){
                        check = check + " " + "first";
                    }
                    if ($(".adminContent").find("input[name='second']").prop('checked')){
                        check = check + " " + "second";
                    }   
                    if ($(".adminContent").find("input[name='popular']").prop('checked')){
                        check = check + " " + "popular";
                    }
                    if ($(".adminContent").find("input[name='new']").prop('checked')){
                        check = check + " " + "new";
                    }
                    $.ajax({
                        url: "/change" +  contentName,
                        method: "POST",
                        data:  
                        {
                            id: $("#contentTitle :selected").val().substr(-1),
                            name:  $(".adminContent").find("input[name ='name']").val(),
                            weight:  $(".adminContent").find("input[name ='weight']").val(),
                            price: $(".adminContent").find("input[name ='price']").val(),
                            consist:  $(".adminContent").find("textarea[name ='consist']").val(),
                            categories: check,
                        }
                    }).then(function(res) {
                        alert("Данные записаны успешно!");
                        $('#adminModal').modal("hide");
                    });
                }
                else{
                    alert("Ошибка доступа");
                    $('#adminModal').modal("hide");
                }              
            }


function validate(inp) {
    alert("hi");
    inp.value = inp.value.replace(/[^\d,.]*/g, '')
                         .replace(/([,.])[,.]+/g, '$1')
                         .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1');
}

            function addContent(){
                if (getCheck()){
                    if($(".adminContent").find("input[name ='name']").val() == "" || 
                    $(".adminContent").find("input[name ='weight']").val() == "" ||
                    $(".adminContent").find("input[name ='price']").val() == "" ||
                    $(".adminContent").find("input[name ='consist']").val() == ""||
                    $(".adminContent").find("input[name ='fileupload-input']").val() == "")
                    {
                        alert("Не все поля заполнины!");
                    }
                    else{
                        $.ajax({
                            url: "/upload" +  contentName,
                            method: "POST",
                            cache: false,
                            contentType: false,
                            processData: false,
                            data:  new FormData(jQuery('#uploadForm')[0])
                        }).then(function(res) {
                            alert("Данные записаны успешно!");
                            $('#adminModal').modal("hide");
                        });
                    }
                }
                else{
                    alert("Ошибка доступа");
                    $('#adminModal').modal("hide");
                } 
            }



        });
    }
});


