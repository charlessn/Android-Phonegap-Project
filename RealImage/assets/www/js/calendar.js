
function showCalendar(id){
		var bind_event = "click";
        var cd = new Date();    	
		cd.setYear(cd.getFullYear());
		cd.setMonth(cd.getMonth());
		cd.setDate(cd.getDate());
		updateF();
		 var t = '<div class="calendarPopUPWholeDiv">'+
		'<table align="center" style="margin-top:5px;margin-bottom:5px;" cellpadding="0"  cellspacing="5" border="0">'+
			'<tr><td>'+
			   '<div id="pmon"  role="main" class="ui-content ui-body-b ui-corner-top-2 increaseValue" data-role="content">+</div><input type="text" class="ui-shadow-inset ui-body-c firstTextBox" id="mon" readonly="readonly"/><div id="mmon" role="main" class="ui-content ui-body-b ui-corner-bottom-2 decreaseValue" data-role="content" data-theme="a">-</div>'+
		   ' </td><td>'+
				'<div id="pday" role="main" class="ui-content ui-body-b ui-corner-top-2 increaseValue" data-role="content">+</div><input type="text" class="ui-shadow-inset ui-body-c firstTextBox" id="day" readonly="readonly"/><div id="mday" role="main" class="ui-content ui-body-b ui-corner-bottom-2 decreaseValue" data-role="content" data-theme="a">-</div>'+
		   ' </td><td>'+
			   ' <div id="pyear" role="main" class="ui-content ui-body-b ui-corner-top-2 yearIncrease" data-role="content">+</div><input type="text" class="ui-shadow-inset ui-body-c yearTextbox" id="year" readonly="readonly"/><div id="myear" role="main" class="ui-content ui-body-b ui-corner-bottom-2 yearDecrease" data-role="content" data-theme="a">-</div>'+
		   ' </td></tr></table>'+
	'</td></tr>'+
	'<tr><td colspan="3" class="calbuttonRow">'+
		'<table width="100%" style="margin-top:-10px;">'+
	   ' <tr><td width="50%">'+
	  '  <div role="main" id="set" class="ui-content ui-body-b ui-corner-all-1 setButton" data-role="content" data-theme="a">Set</div>'+
		'</td><td>'+
		'<div role="main" id="close" class="ui-content ui-body-b ui-corner-all-1 cancelButton" data-role="content" data-theme="a">Cancel</div>'+
		'</td>'+
	   ' </tr></table>'+
	'</td></tr>'+
	'</table>'+
	'</div>';
	
		var alertBox = '<div class="calendarPopUp">'+t+'</div>';
		showOverlayPopup(alertBox);
		
		$('#mon').val(formatDate(cd, "M"));
      	$('#day').val(formatDate(cd, "d"));
        $('#year').val(formatDate(cd, "Y"));
		
		//Increment Actions(+)
		$('#pday').on(bind_event,function(){
			cd.setDate(cd.getDate() + 1);
            updateF();
            return false;
		});
		
		$('#pmon').on(bind_event,function(){
			cd.setMonth(cd.getMonth() + 1);
            updateF();
            return false;
		});
		
		$('#pyear').on(bind_event,function(){
			cd.setYear(cd.getFullYear() + 1);
            updateF();
        	return false;
		});
		
		//Decrement Actions(-)
		$('#mday').on(bind_event,function(){
			cd.setDate(cd.getDate() - 1);
            updateF();
            return false;
		});
		
		$('#mmon').on(bind_event,function(){
			cd.setMonth(cd.getMonth() - 1);
            updateF();
            return false;
		});
		
		$('#myear').on(bind_event,function(){
			cd.setYear(cd.getFullYear() - 1);
            updateF();
            return false;
		});
		
		//Close Button Action
	    $('#close').on(bind_event,function (e) {
			$(".calendarPopUp").remove();
			$("#overlay").remove();
			e.preventDefault();
       	});
		
		//Set Button Action
		 $('#set').on(bind_event,function (e) {
			$('#'+id).val(formatDate(cd, "d/m/Y"));
            $(".calendarPopUp").remove();
			$("#overlay").remove();
            return false;
      	});
		
	//Update Day,Month,Year Values
	function updateF() {
		$('#year').val(formatDate(cd, "Y"));
    	$('#mon').val(formatDate(cd, "M"));
    	$('#day').val(formatDate(cd, "d"));
     	return false;
 	}
	
	function showOverlayPopup(content){
		$("body").append(content);
		var docHeight = $(document).height();
		$("body").append("<div id='overlay'></div>");
		$("#overlay").height(docHeight).css({
			'opacity' :0.5,
			'position':'fixed',
			'top': 0,
			'left': 0,
			'background-color': 'black',
			'width':'100%',
			'height':'100%',
			'display':'block',
			'z-index':999
		});
		return false;
	}
}

function formatDate(dateValue, format){
    format = (format) ? format : 'd M Y';
    var dt = new Date(dateValue);
    return dt.format(format);
}