$(function() {
	var newSelection = "";
	$("#category a").click(function(){
		$("#category a").removeClass("current");
		$(this).addClass("current");
		newSelection = $(this).attr("rel");
		$(".category").not("."+newSelection).hide().parent().css('position', 'fixed');
		$("."+newSelection).show(0, function () {
    	$(this).next().show(0, arguments.callee);
  		}).parent().css('position', 'static');
		
	});
	
});

