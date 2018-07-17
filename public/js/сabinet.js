$(document).ready(function() {
    var sum = 0;
 	$.ajax({
        url: "/gethistory" ,
        method: "POST",
        data:  
        {
            client_id:  localStorage.getItem("client_id"),
        }
    }).then(function(contentHistory) {
        var $historyWrapper = $("#historyUl");
        contentHistory.forEach(function(content) {
            var $historyTemplate =  $("#templateHistory > div").clone();
            $historyTemplate.find("[data-name]").text(content.name);
            $historyTemplate.find("[data-price]").text(content.price);
            $historyTemplate.find("[data-count]").text(content.count);            
            $historyTemplate.find("[data-date]").text(content.date);
            $historyWrapper.append($historyTemplate);
            $("#phoneSettings").val(content["phone"]);
            $("#emailSettings").val(content["email"]);
            sum = sum + content.price * content.count;
        });
        $("#passwordSettings").val(localStorage.getItem("password"));
        $("#repeatPasswordSettings").val(localStorage.getItem("password"));
        
    });

    var history = $("#history");
    var settings = $("#settings");
    var sale = $("#sale");
    var changeSettings = $("#changeSettings");
    var saveSettings = $("#saveSettings");

    settings.click(function(event){
        $(".sale").hide();
        $(".history").hide();
        $(".settings").show();
    });    

        sale.click(function(event){
            var sale;
            $(".sale").show();
            $(".history").hide();
            $(".settings").hide();
            (0 < sum < 5000) ? sale = 0 : (5000 < sum < 10000) ? sale = 5 :
            (10000 < sum < 15000) ? sale = 10 : sale = 15;
            switch(sale){
                case 0:  
                    $("#imgSale").attr("src","./img/skidka0.png");
                    $("#allSum").text(sum);
                    $("#toNextSale").text(5000 - sum);
                    break;
                case 5:  
                    $("#imgSale").attr("src","./img/skidka5.png");
                    $("#allSum").text(sum);
                    $("#toNextSale").text(10000 - sum);
                    break;
                case 10:  
                    $("#imgSale").attr("src","./img/skidka10.png");
                    $("#allSum").text(sum);
                    $("#toNextSale").text(15000 - sum);
                    break;
                case 15:  
                    $("#imgSale").attr("src","./img/skidka15.png");
                    $("#allSum").text(sum);
                    $("#toNextSale").hide();
                    break;
        }
    });   

        history.click(function(event){
        $(".sale").hide();
        $(".history").show();
        $(".settings").hide();
    });

    changeSettings.click(function(event){
        changeSettings.hide();
        saveSettings.show();
        $("#phoneSettings").prop('disabled', false);
        $("#emailSettings").prop('disabled', false);
        $("#passwordSettings").prop('disabled', false);
        $(".repeatPassword").show();

    });   

    saveSettings.click(function(event){
        if($("#passwordSettings").val() === $("#repeatPasswordSettings").val()){
            $.ajax({
                url: "/changeclient" ,
                method: "POST",
                data:  
                {
                    client_id:  localStorage.getItem("client_id"),
                    phone:  $("#phoneSettings").val(),
                    email:  $("#emailSettings").val(),
                    password:  $("#passwordSettings").val(),
                }
            }).then(function(res) {
                changeSettings.show();
                saveSettings.hide();
                $(".repeatPassword").hide();
                $("#phoneSettings").prop('disabled', true);
                $("#emailSettings").prop('disabled', true);
                $("#passwordSettings").prop('disabled', true);
                alert("Данные успешно изменены");
            });
        }
        else{
            alert("пароли не совпадают!");
        }
    }); 

});    

