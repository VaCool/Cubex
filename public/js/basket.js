var sum = 0;
var buyName;
var buyWeight;
var buyPrice;
var buyURL;

 $(document).ready(function() {
    if(localStorage.getItem("buyName") != null){
        showContetnt(); 
    }
    else{

    }
    var a  =  buyName;
    var dell = $('.dell'); 
    var order = $('#order'); 
  
    order.click(function(event){
        if($("[data-payment]").text() == 0){
            alert('Корзина пустая, что бы совершить заказ, выберете понравившееся блюдо на нашем сайти и нажмите кнопку "Купить"');
        }
        else{
                        $.ajax({
                        url: "/order",
                        method: "POST",
                        data:  
                        {
                            name: localStorage.getItem("buyName"),
                            price: localStorage.getItem("buyPrice"),
                            client_id:  localStorage.getItem("client_id"),
                        }
                    }).then(function(res) {
                        alert("Данные записаны успешно!");
                    });
            alert('Заказ успешно принят, в течении нескольких минут с вами звяжутся для уточнения деталей. Спасибо за то, что выбрали нас.');
                localStorage.removeItem('buyName');
                localStorage.removeItem('buyWeight');
                localStorage.removeItem('buyPrice');
                localStorage.removeItem('buyURL');
                $(".elements").each(function (i) {
                $(this).remove();
                });
                allSum();
        }
    });
    
    dell.click(function(event){
        var i = find(buyName, $(this).parent().parent().parent().find("[data-name]").text());
            buyName.splice(i, 1);
            buyWeight.splice(i, 1);
            buyPrice.splice(i, 1);
            buyURL.splice(i, 1);
            $(this).parent().parent().parent().parent().parent().remove();
            if(buyName == ""){
                localStorage.removeItem('buyName');
                localStorage.removeItem('buyWeight');
                localStorage.removeItem('buyPrice');
                localStorage.removeItem('buyURL');
            }
            else{
            localStorage.setItem("buyName", buyName);
            localStorage.setItem("buyWeight", buyWeight);
            localStorage.setItem("buyPrice", buyPrice);
            localStorage.setItem("buyURL", buyURL);

            allSum();  
            }




        //     localStorage.removeItem('image');

    });   


    function showContetnt(){
        buyName = localStorage.getItem("buyName").split(",");
        buyWeight = localStorage.getItem("buyWeight").split(",");
        buyPrice = localStorage.getItem("buyPrice").split(",");
        buyURL = localStorage.getItem("buyURL").split(",");
        quantity = localStorage.getItem("quantity").split(",");
        var $purchasesWrapper = $("#purchases");
        for(var i = 0; i < buyName.length; i++){
            var $purchasesTemplate = $("#templateBasket > div").clone();         
            $purchasesTemplate.find("[data-name]").text(buyName[i]);
            $purchasesTemplate.find("[data-weight]").text(buyWeight[i]);
            $purchasesTemplate.find("[data-price]").text(buyPrice[i]);  
            $purchasesTemplate.find("[data-url]").attr("src", buyURL[i]);
            $purchasesTemplate.find("[data-value]").attr("value", quantity[i]);
            $purchasesWrapper.append($purchasesTemplate);  
        }   
    }



    allSum();
            $('.minus').click(function () {
                var i = find(buyName, $(this).parent().parent().parent().find("[data-name]").text());
                var $input = $(this).parent().find('input');
                var count = parseInt($input.val()) - 1;
                count = count < 1 ? 1 : count;
                $input.val(count);         
                $input.change();
                allSum();
                quantity[i] = count;
                localStorage.setItem("quantity", quantity);

                return false;
            });
            $('.plus').click(function () {
                var i = find(buyName, $(this).parent().parent().parent().find("[data-name]").text());
                var $input = $(this).parent().find('input');
                var count = parseInt($input.val()) + 1;
                $input.val(count);         
                $input.change();
                allSum();
                quantity[i] = count;
                localStorage.setItem("quantity", quantity);

                return false;
            });


    $("#inputAmount").keydown(function(event) {
        // Разрешаем: backspace, delete, tab и escape
        if (event.keyCode == 8 ||  (event.keyCode == 65 && event.ctrlKey === true))  {
                 // Ничего не делаем
                 return;
        }
        else {
            // Обеждаемся, что это цифра, и останавливаем событие keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });



function allSum(){
sum = 0;



$(".price").find("span").each(function (i) {
    if(isNaN(parseInt($(this).text())) == true){
        return false;
    }
sum = sum +(parseInt($(this).text()) * parseInt($(this).parent().parent().parent().find("input[name ='inputAmount']").val()));
    });
$("[data-payment]").text(sum);
}




if ([].indexOf) {

  var find = function(array, value) {
    return array.indexOf(value);
  }

} else {
  var find = function(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) return i;
    }
    return -1;
  }

}














        });