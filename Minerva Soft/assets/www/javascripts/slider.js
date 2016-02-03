function openLeftPanel(){
	$.mobile.activePage.find('#leftSlider').panel().panel("open");
	var listItem = new Array(); 
	var navigation = new Array();
	listItem=["Home","Ticket Entry","Report","Todo Entry","Log Report","Logout"];
	navigation=["home","ticket_entry","report","todo_entry","","index"]
	 var t='<div>'
	 	  +'<div class="leftSlider_title">MINERVA SOFT</div>';
	 		for(var i=0;i<listItem.length;i++){
				t+='<div class="leftSliderRow" id="leftslider_row'+i+'" onclick="navigateToPage(\''+navigation[i]+'\');">'+listItem[i]+'</div>'
			}
		t+='</div>'
	$('#leftSlider',$.mobile.activePage).html(t).trigger('create');
	
	for(var i=0;i<listItem.length;i++){
		$('#leftslider_row'+i).on('vmousedown', function(){
			$('.leftSliderRows').removeClass('leftSliderRow_hover');
        	$(this).addClass('leftSliderRow_hover');
    	}).on('vmouseup', function(){
        	$(this).removeClass('leftSliderRow_hover');
    	});
	}
}