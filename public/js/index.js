
$('#workspace').load('./news.html');
$(document).ready(function() {
	if(localStorage.getItem("login") !== null){
		$("#buttonLogin").hide();
    	$("#buttonSingUp").hide(); 
     	$("#buttonExit").show();
	}

	var li0 = $('#li0');
	var li1 = $('#li1');
 	var li2 = $('#li2');
 	var li3 = $('#li3');
 	var li4 = $('#li4');
 	var li5 = $('#li5');
 	var li6 = $('#li6');
 	var li7 = $('#li7');
 	var buttonLogin = $('#buttonLogin, #login');
	var buttonSingUp = $('#buttonSingUp, #signUp');
	var saveSignUp = $('#saveSignUp');
	var saveLogin = $('#saveLogin');
	var buttonExit = $('#buttonExit');

	li0.click(function(event){ 
		pageLoading("li0");
	});

	li1.click(function(event){ 
		pageLoading("li1");
	});

	li2.click(function(event){ 
		pageLoading("li2");
	});

	li3.click(function(event){ 
		pageLoading("li3");
	});

	li4.click(function(event){ 
		pageLoading("li4");
	});

	li5.click(function(event){ 
		pageLoading("li5");
	});

	li6.click(function(event){ 
		pageLoading("li6");
	});

	li7.click(function(event){ 
		pageLoading("li7");
	});

	buttonLogin.click( function(event){ 
		$('#loginModal').modal("show");
        $('#forsignUp').hide(); 
        $('#forLogin').show();
        $('#login').parent().css({"background":"#826464", "border-bottom-right-radius":"20px", "border-top-right-radius":"20px" }); 
        $('#signUp').parent().css({"background":"#4c2c2c", "border-radius:":"none" }); 
    });

	buttonSingUp.click( function(event){ 
        $('#loginModal').modal("show");
        $('#forLogin').hide(); 
        $('#forsignUp').show();
        $('#signUp').parent().css({"background":"#826464", "border-bottom-left-radius":"20px", "border-top-left-radius":"20px"}); 
        $('#login').parent().css({"background":"#4c2c2c", "border-radius:":"none" }); 

    });

	buttonExit.click( function(event){ 
    	$("#buttonLogin").show();
    	$("#buttonSingUp").show(); 
    	$("#buttonExit").hide(); 
    	localStorage.clear(); 
    });

	saveSignUp.click( function(){ 
  		if($("#forsignUp").find("input[name ='name']").val() == "" || $("#forsignUp").find("input[name ='login']").val() == "" ||
  		   $("#forsignUp").find("input[name ='password']").val() == "" || $("#forsignUp").find("input[name ='repeatPassword']").val() == "" ||
  		   $("#forsignUp").find("input[name ='email']").val() == "" || $("#forsignUp").find("input[name ='phone']").val() == "380"){
  		alert("Не все поля заполнины!");
		}
		else{
  			if($("#forsignUp").find("input[name ='password']").val()===$("#forsignUp").find("input[name ='repeatPassword']").val()){
  				var now = new Date();
  				$.ajax({
            		url: "/registration",
            		method: "POST",
            		data:  
            			{
                			name:  $("#forsignUp").find("input[name ='name']").val(),
                			login:  $("#forsignUp").find("input[name ='login']").val(),
                			password:  $("#forsignUp").find("input[name ='password']").val(),
                			email: $("#forsignUp").find("input[name ='email']").val(),
                			phone:  $("#forsignUp").find("input[name ='phone']").val(),
                			verification: window.btoa("" + now.getFullYear() + now.getMonth() + now.getHours() + now.getDate() + 
                				 		  now.getMinutes() + now.getSeconds() + now.getMilliseconds()),
            			}
    				}).then(function(res) {
        				alert(res);
        				if(res != "Пользователь с таким логином уже сущестует!"){
        					$('#loginModal').modal("hide");
        				}
    				});
  				}
  			else{
  				alert("Введенные пароли не совпадают!");
  			}
  		}
    });

  	saveLogin.click( function(){ 
  		$.ajax({
        	url: "/login",
            method: "POST",
            data:  
            	{
                	login:  $("#forLogin").find("input[name ='login']").val(),
                	password:  $("#forLogin").find("input[name ='password']").val(),
            	}
    		 }).then(function(res) {
    		 	if(res == "Не верно введен логин или пароль!"){
    		 		alert(res);
    		 	}
    		 	else{
    		 	res.forEach(function(data) {
            	var login = data.login;
            	var password = data.password;
            	var verification  = data.verification;
            	var rights = data.rights;
            	var name = data.name;
            	var client_id = data.client_id;
        		localStorage.setItem("login", login);
    		 	localStorage.setItem("password", password);
    		 	localStorage.setItem("verification", verification);
    		 	localStorage.setItem("rights", rights);
    		 	localStorage.setItem("name", name);
    		 	localStorage.setItem("client_id", client_id);
    		 	$("#buttonLogin").hide();
    		 	$("#buttonSingUp").hide(); 
    		 	$("#buttonExit").show();
    		 	$('#loginModal').modal("hide");
    			});  	
    		}
  				
		});
	});



	function pageLoading(id){

		switch(id) {
			case 'li0':  
				$('#workspace').load('./news.html');
    			break;
			case 'li1':  
				$('.workspace').load('./pizza.html');
    			break;
			case 'li2':  
				$('.workspace').load('./paste.html');
    			break;
   	 		case 'li3':  
				$('.workspace').load('./risotto.html');
    			break;
    		case 'li4':  
				$('.workspace').load('./dessert.html');
    			break;
    		case 'li5':  
				$('.workspace').load('./reviews.html');
    			break;
    		case 'li6':  
				$('.workspace').load('./basket.html');
    			break;
    		case 'li7':  
				$('.workspace').load('./basket.html');
    			break;
 			default:
			break;
		}
	}
});
