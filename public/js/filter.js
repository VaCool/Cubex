$(function() {

	var newSelection = "";
	
	$("#category a").click(function(){
	

	
		$("#category a").removeClass("current");
		$(this).addClass("current");
		
		newSelection = $(this).attr("rel");
		
		$(".category").not("."+newSelection).hide(2000);
		$("."+newSelection).show("fast", function () {
    $(this).next().show("fast", arguments.callee);
  });
		

		
	});
	
});

/* 
$("#showr").click(function () {
  $("div:eq(0)").show("fast", function () {
    // use callee so don't have to name the function
    $(this).next().show("fast", arguments.callee);
  });
});
$("#hidr").click(function () {
  $("div").hide(2000);
});
*/