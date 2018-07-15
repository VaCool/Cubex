    var id,check, i = 0;   
    var massOfAllId = new Array();
    var massOfAllNames = new Array();
    var massOfVisibleId = new Array();
    var contentName;
$(document).ready(function() {
    contentName = $(".workspace").not(":hidden").prop("id");
    getGallery();
    function getGallery(){
        $.ajax({
            url: "/" + contentName,
            method: "GET"
        }).then(function(contentGallery) {
            var $contentWrapper = $(".workspace").not(":hidden").find("#menu");
            contentGallery.forEach(function(content) {
                var $contentTemplate =  $(".workspace").not(":hidden").find("#template").find(".elements").clone();
                console.log($contentTemplate);
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
                massOfAllId[i] = "#" + "modalId" + content[contentName + "_id"];
                massOfAllNames[i] = content.name;
                i++;
            });
            var open_modal = $('.open_modal');
            var open_adminModal = $('#open_adminModal');
            var previousButton = $('.previousButton');
            var nextButton = $('.nextButton');
            var buttonDo = $('#buttonDo');
           
            if(localStorage.getItem("rights") === "admin"){
                $("#open_adminModal").show();
            }

            function getMassId(){
                $(".forModal").each(function (i) {
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
                    $('.forDelete').detach();
                    $("#"+massOfVisibleId[i]).children().clone().addClass("forDelete").appendTo(".forGalley");
                    id = massOfVisibleId[i];
            });

            nextButton.click( function(event){ 
                massOfVisibleId = [];
                getMassId();
                i = $.inArray(id, massOfVisibleId)
                    i==massOfVisibleId.length-1 ? i=0 : i++;
                    $('.forDelete').detach();
                    $("#"+massOfVisibleId[i]).children().clone().addClass("forDelete").appendTo(".forGalley");
                    id = massOfVisibleId[i];
            });

            open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
                $('.forDelete').detach();
                $('#galleryModal').modal("show");
                id = ($(this).parent().find('.forModal').attr( "id"));
                $(this).parent().find('.forClone').clone().addClass("forDelete").appendTo(".forGalley");
            });

            open_adminModal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal        
                $('.forDelete').detach();
                id = ($(this).parent().find('.forModal').attr( "id"));
                $(this).parent().find('.forClone').clone().addClass("forDelete").appendTo(".forGalley");
                $("#contentTitle").empty();
                verification(localStorage.getItem("client_id"), localStorage.getItem("verification"));
                $('#adminModal').modal("show");
                for(i = 0; i < massOfAllId.length; i++){
                    $("#contentTitle").prepend( $('<option value="' + massOfAllId[i] + '">' + massOfAllNames[i] 
                    + '</option>'));
                }
            });

            $('#addContent').click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
                $("#contentTitle").attr("disabled",true);
            });

             function changeSelect(){
                $("#adminModal").find("input[name ='name']").val($($("#contentTitle :selected")
                    .val()).parent().find("[data-name-first]").text());
                $("#adminModal").find("input[name ='weight']").val($($("#contentTitle :selected")
                    .val()).parent().find("[data-weight]").text());
                $("#adminModal").find("input[name ='price']").val($($("#contentTitle :selected")
                    .val()).parent().find("[data-price]").text());
                $("#adminModal").find("textarea[name ='consist']").val($($("#contentTitle :selected")
                    .val()).parent().find("[data-consist]").text());
                var className = $($("#contentTitle :selected")
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

            $('#changeContent').click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal               
                $("#contentTitle").attr("disabled",false);
                changeSelect();
            });

            $('#dellContent').click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal               
                $("#contentTitle").attr("disabled",false);
            });

            $("#contentTitle").change(function() {
                $("#adminModal").find("input[name ='first']").prop("checked",false);
                $("#adminModal").find("input[name ='second']").prop("checked",false);
                $("#adminModal").find("input[name ='popular']").prop("checked",false);
                $("#adminModal").find("input[name ='new']").prop("checked",false);
                changeSelect();
            });


            buttonDo.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal


            


               if($('#addContent').hasClass('active')){
                    addContent();
                }
                if($('#changeContent').hasClass('active')){
                    changeContent();
                }
                if($('#dellContent').hasClass('active')){
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


