
$('#news').show().load('./news.html');
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
        
        $('#forLogin').hide(); 
        $('#forsignUp').show();
        $('#signUp').parent().css({"background":"#826464", "border-bottom-left-radius":"20px", "border-top-left-radius":"20px"}); 
        $('#login').parent().css({"background":"#4c2c2c", "border-radius:":"none" }); 

    });

	buttonExit.click( function(event){ 
    	$("#buttonLogin").show();
    	$("#buttonSingUp").show(); 
    	$("#buttonExit").hide(); 
        $("#open_adminModal").hide();
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
                			name: $("#forsignUp").find("input[name ='name']").val(),
                			login: $("#forsignUp").find("input[name ='login']").val(),
                			password: $("#forsignUp").find("input[name ='password']").val(),
                			email: $("#forsignUp").find("input[name ='email']").val(),
                			phone: $("#forsignUp").find("input[name ='phone']").val(),
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
        			localStorage.setItem("login", data.login);
    		 		localStorage.setItem("password", data.password);
    		 		localStorage.setItem("verification", data.verification);
    		 		localStorage.setItem("rights", data.rights);
    		 		localStorage.setItem("name", data.name);
    		 		localStorage.setItem("client_id", data.client_id);
    		 		$("#buttonLogin").hide();
    		 		$("#buttonSingUp").hide(); 
    		 		$("#buttonExit").show();
    		 		$('#loginModal').modal("hide");
                    $("#open_adminModal").show();
                    verification(localStorage.getItem("client_id"), localStorage.getItem("verification"));
    			});  	
    		} 				
		});
	});

	function pageLoading(id){
		switch(id) {
			case 'li0':  
				$('.workspace').hide();
                $('#news').show();
    			break;
			case 'li1':  
                $('.workspace').hide();
                $('#pizza').is(':empty') ? $('#pizza').show().load('./gallery.html') : $('#pizza').show();
    			break;
			case 'li2': 
                $('.workspace').hide();
                $('#paste').is(':empty') ? $('#paste').show().load('./gallery.html') : $('#paste').show(); 
    			break;
   	 		case 'li3': 
                
                $('.workspace').hide();
                $('#risotto').is(':empty') ? $('#risotto').show().load('./gallery.html') : $('#risotto').show();  
    			break;
    		case 'li4':  
                $('.workspace').hide();
                $('#dessert').is(':empty') ? $('#dessert').show().load('./gallery.html') : $('#dessert').show();
    			break;
    		case 'li5': 
                $('.workspace').hide();
                $('#reviews').is(':empty') ? $('#reviews').show().load('./gallery.html') : $('#reviews').show(); 
    			break;
    		case 'li6':  
                $('.workspace').hide();
                $('#basket').is(':empty') ? $('#basket').show().load('./basket.html') : $('#basket').show();
    			break;
    		case 'li7': 
                $('.workspace').hide();
                $('#caninet').is(':empty') ? $('#caninet').show().load('./caninet.html') : $('#caninet').show(); 
    			break;
 			default:
			break;
		}
	}
});
