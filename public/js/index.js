

$(document).ready(function() {

	var li0 = $('#li0');
	var li1 = $('#li1');
 	var li2 = $('#li2');
 	var li3 = $('#li3');
 	var li4 = $('#li4');
 	var li5 = $('#li5');
 	var li6 = $('#li6');
 	var li7 = $('#li7');

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

	function pageLoading(id){

		switch(id) {
			case 'li0':  
				$('#workspace').load('./news.html');
    			break;
			case 'li1':  
				$('.workspace').load('./newss.html');
    			break;
			case 'li2':  
				$('.workspace').load('./pizza.html');
    			break;
   	 		case 'li3':  
				$('.workspace').load('./paste.html');
    			break;
    		case 'li4':  
				$('.workspace').load('./risotto.html');
    			break;
    		case 'li5':  
				$('.workspace').load('./dessert.html');
    			break;
    		case 'li6':  
				$('.workspace').load('./reviews.html');
    			break;
    		case 'li7':  
				$('.workspace').load('./basket.html');
    			break;
 			default:
			break;
		}
	}
});
