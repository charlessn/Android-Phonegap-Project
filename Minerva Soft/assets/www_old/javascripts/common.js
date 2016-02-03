var verticalScroll = null;
var overlayElement = null;
var modalWindowElement = null;
var date = new Date();
var pageId="";
var file;
var count=0;

function isNull(value) {
    return typeof value == 'undefined' || value == null || value == '' || value == 'unknown' || value == 'null';
}
 
function isUserLogin(){
    return (isNull(localStorage.getItem('euser_id'))) ? false : true;
}

$(document).on("pageshow", 'div.minerava',function (event, ui) {
    pageId = $.mobile.activePage.attr('id');
    var fn = window[pageId];
	if (typeof fn === 'function') {
        fn();
    }
	$('#todo_date,#entry_date,#to_date,#start_date',$.mobile.activePage).val(formatDate(date, "d/m/Y"));
	initializeVerticalScroll(pageId);
	bindEvent();
}).on('pagebeforeshow', 'div.minerava', function(event, ui){  
	$('<div>').attr({'id':'leftSlider','data-role':'panel','data-position':'right'}).appendTo($(this));
	if($('.modalOverlay').is(':visible')){
		hidePopUp();
	}
	
	if($('.calendarPopUp').is(':visible')){
		$(".calendarPopUp").remove();
		$("#overlay").remove();
	}
			
}).on('pagebeforehide', 'div.minerava', function(event, ui){

});

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

function login(){
	var uname = $('#uname').val();
	var password = $('#password').val();
	
	if(isNull(uname)){
		showPopUP("Please enter username");
		return;
	}else if(isNull(password)){
		showPopUP("Please enter password");
		return;
	}	
	$.mobile.loading("show");
	$.ajax({
		url:"http://www.minervasoft.in/devtest/check_login.php",
		type:"POST",
		data:{username:uname,password:password},	
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
			}else{
				localStorage.setItem("euser_id",obj.euser_id);
				localStorage.setItem("edepartment",obj.edepartment);
				localStorage.setItem("ecustomer_id",obj.ecustomer_id);
				localStorage.setItem("ecompany_name",obj.ecompany_name);
				navigateToPage('home');
			}
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}
	});
}

function todoEntryPage(){
	var t="";
	$.mobile.loading("show");
	var userId = localStorage.getItem("euser_id");
	var department = localStorage.getItem("edepartment");
	
	$.ajax({
		url:"http://www.minervasoft.in/devtest/select_user.php",
		type:"POST",	
		data:{euser_id:userId,edepartment:department},
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
			t+='<option value="">Select</option>';
			$.each(data.json_return_array,function(i,row){
				t+='<option value="'+row.id+'">'+row.name+'</option>'
			});
			$('#employee_name').html(t).trigger('create');
			$("#employee_name option[value='"+userId+"']").attr("selected", "selected");
			$("#employee_name").selectmenu("refresh");
			editTodoEntry();
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}			
	});
}

function editTodoEntry(){
	$.mobile.loading("show");
	var userId = localStorage.getItem("euser_id");
	
	$.ajax({
		url:"http://www.minervasoft.in/devtest/todo_entry_edit.php",
		type:"POST",	
		data:{euser_id:userId},
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
			var obj = data.json_return_array;
			if(!obj[0].err){
				$('#todo_date').val(obj[0].date);
				$('#work_start_time').val(obj[0].work_start_time);
				$('#work_end_time').val(obj[0].work_end_time);
				$('#lunch_start_time').val(obj[0].lunch_start_time);
				$('#lunch_end_time').val(obj[0].lunch_end_time);
				$('#remarks').val(obj[0].remarks);	
			}
			
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}			
	});
}

function showTimePicker(id){
	cordova.exec(function(data) {
		$('#'+id).val(data);
	},function(error) {
		alert(error+'error');
	},"Plugin","timepicker",[]);
	
}

function todoEntry(){
	var user_id = $('#employee_name').val();
	var date = $("#todo_date").val();
	var status = $('#attendance_type').val();
	var remarks = $('#remarks').val();
	var work_sTime = $('#work_start_time').val();
	var work_eTime = $('#work_end_time').val();
	var lunch_sTime = $('#lunch_start_time').val();
	var lunch_eTime = $('#lunch_end_time').val();
	
	
	if(isNull(user_id)){
		showPopUP("Please select employee name");
		return;
	}
	$.mobile.loading("show");
	$.ajax({
		url:"http://www.minervasoft.in/devtest/save_todo_entry.php",
		type:"POST",	
		data:{euser_id:user_id,date:date,status:status,remarks:remarks,work_stime:work_sTime,work_etime:work_eTime,lunch_stime:lunch_sTime,lunch_etime:lunch_eTime},
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
			alert(JSON.stringify(data));
			var obj = data.json_return_array[0];
			showPopUP(obj.succ);
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}			
	});
}

function ticketEntryPage(){
	var t="";
	$.mobile.loading("show");
	$('input[type=file]').on('change', prepareUpload);
	var customer_id = localStorage.getItem("ecustomer_id");
	var department = localStorage.getItem("edepartment");
	$.ajax({
		url:"http://www.minervasoft.in/devtest/select_project_name.php",
		type:"POST",	
		data:{ecustomer_id:customer_id,edepartment:department},
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
			t+='<option value="">Select</option>';
			$.each(data.json_return_array,function(i,row){
				t+='<option value="'+row.project_id+'">'+row.project_name+'</option>'
			});
			$('#project_name').html(t).trigger('create');
			$("#project_name").selectmenu("refresh");
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}			
	});
}


function prepareUpload(event){
    file = event.target.files;
	if(file[0].size > 2000000){
		showPopUP('Please select file of size less than 2MB');
		return;
	}
}

function ticketEntry(){
	var proj_name = $('#project_name').val();
	var email = $('#email').val();
	var ticket_type = $('#ticket_type').val();
	var mode = $('#mode').val();
	var date = $('#entry_date').val();
	var subject = $('#subject').val();
	var description = $('#description').val();
	var file_attach = $('#attach_file').val();
	if(isNull(proj_name)){
		showPopUP("Please select project name");
		return;
	}else if(isNull(ticket_type)){
		showPopUP("Please select ticket type");
		return;
	}else if(isNull(mode)){
		showPopUP("Please select mode");
		return;
	}else if(isNull(date)){
		showPopUP("Please select date");
		return;
	}else if(isNull(subject)){
		showPopUP("Please enter subject");
		return;
	}else if(isNull(description)){
		showPopUP("Please enter description");
		return;
	}
	if(!isNull(file_attach)){
		uploadFiles();
		return;
	}
	saveTicketEntry("");	
}

function validateEmail(sEmail) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(sEmail)) {
		return true;
	}else {
		return false;
	}
}


function uploadFiles(){ 
	$.mobile.loading("show");
    var data = new FormData();
    $.each(file, function(key, value){
        data.append(key, value);
    });
    $.ajax({
        url: 'http://www.minervasoft.in/devtest/upload_file.php?files',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function(data, textStatus, jqXHR){
			saveTicketEntry(data.file_name);
        },
        error: function(jqXHR, textStatus, errorThrown){
			$.mobile.loading("hide");
			checkIsNetwork();
        }
    });
}


function saveTicketEntry(file_name){
	$.mobile.loading("show");
	var proj_name = $('#project_name').val();
	var email = $('#email').val();
	var ticket_type = $('#ticket_type').val();
	var mode = $('#mode').val();
	var date = $('#entry_date').val();
	var subject = $('#subject').val();
	var description = $('#description').val();
	var euser_id = localStorage.getItem("euser_id");
	var department = localStorage.getItem("edepartment");
	$.ajax({
		url:"http://www.minervasoft.in/devtest/send_ticket.php",
		type:"POST",	
		data:{
			euser_id:euser_id,
			edepartment:department,
			project_id: proj_name,
			email: email,
			ticket_type:ticket_type,
			mode:mode,
			date:date,
			subject:subject,
			description:description,
			file_name:file_name 
		},
		dataType:"json",
		success:function(data){
			var obj = data.json_return_array[0];
			showPopUP(obj.succ);
			$.mobile.loading("hide");
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}			
	});
}

function reportPage(){
	var t="";
	$.mobile.loading("show");
	var customerId = localStorage.getItem("ecustomer_id");
	var department = localStorage.getItem("edepartment");
	$.ajax({
		url:"http://www.minervasoft.in/devtest/select_customer_name.php",
		type:"POST",	
		data:{ecustomer_id:customerId,edepartment:department},
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
			getProjectName();
			t+='<option value="">Select</option>';
			$.each(data.json_return_array,function(i,row){
				t+='<option value="'+row.id+'">'+row.cname+'</option>'
			});
			$('#customer').html(t).trigger('create');
			$("#customer").selectmenu("refresh");
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}			
	});

}

function getProjectName(){
	var t="";
	$.mobile.loading("show");
	var customer_id = localStorage.getItem("ecustomer_id");
	var department = localStorage.getItem("edepartment");
	$.ajax({
		url:"http://www.minervasoft.in/devtest/select_project_name.php",
		type:"POST",	
		data:{ecustomer_id:customer_id,edepartment:department},
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
			t+='<option value="">Select</option>';
			$.each(data.json_return_array,function(i,row){
				t+='<option value="'+row.project_id+'">'+row.project_name+'</option>'
			});
			$('#projects').html(t).trigger('create');
			$("#projects").selectmenu("refresh");
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}			
	});
}

function getReport(){
	var hr = 0;
	var customer = $('#customer').val();
	var project_name = $('#projects').val();
	var ticket_type = $('#ticket_type').val();
	var start_date = $('#start_date').val();
	var to_date = $('#to_date').val();
	var status = $('#status').val();
	
	if($('input[type="checkbox"]').is(':checked')){
		hr = 1;
	}
	
	localStorage.setItem("customer_name",customer);
	localStorage.setItem("projectId",project_name);
	localStorage.setItem("typeId",ticket_type);
	localStorage.setItem("startDate",start_date);
	localStorage.setItem("endDate",to_date);
	localStorage.setItem("status",status);
	localStorage.setItem("timeChk",hr);
	
	setTimeout(function(){
		navigateToPage('report_list');
	},1000);
}

function getReportList(){
	getReportDetail("next");
}

function getReportDetail(type){
	var next =  "";
	var prev = "";
	if(type=="next"){
		next = count;
	}else{

		prev = count;
	}
	
	var t="";
	$.mobile.loading("show");
	$.ajax({
		url:"http://www.minervasoft.in/devtest/ticket_report.php",
		type:"POST",	
		data:{
			ecustomer_id:localStorage.getItem("ecustomer_id"),
			edepartment:localStorage.getItem("edepartment"),
			ecompany_name:localStorage.getItem("ecompany_name"),
			comy_id: localStorage.getItem("customer_name"),
			project_id: localStorage.getItem("projectId"),
			type_id:localStorage.getItem("typeId"),
			start_date:localStorage.getItem("startDate"),
			end_date:localStorage.getItem("endDate"),
			status:localStorage.getItem("status"),
			time_chk:localStorage.getItem("timeChk"),
			next:next,
			prev:prev
			},
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
			var obj = data.json_return_array;
			if(obj[0].err){
				t += '<div style="text-align:center;padding-top:10%;">'+obj[0].err+'</div>';
			}else{
				$.each(obj,function(i,row){
					t += setListUI("Date",getData(row.Date));
					t += setListUI("date",getData(row.date));
					t += setListUI("TicketNo",getData(row.TicketNo));
					t += setListUI("TicketType",getData(row.TicketType));
					t += setListUI("Status",getData(row.Status));
					t += setListUI("Title",getData(row.Title));
					t += setListUI("Hours",getData(row.Hours));
					t += '<div style="border-bottom:1px solid #ccc;"></div>'
				});
			}
			$('#list').html(t).trigger('create');
			
			if(obj[0].next=="true" && !isNull(obj[0].next)){
				$('#next').css('visibility','visible');
			}else{
				$('#next').css('visibility','hidden');
			}
			
			if(count==0){
				$('#prev').css('visibility','hidden');
			}else{
				$('#prev').css('visibility','visible');
			}
			
			if (verticalScroll != null) {
	   			setTimeout(function(){
		   			verticalScroll.refresh();
	   			}, 200);
			}
		},
		error:function(err){
			$.mobile.loading("hide");
			checkIsNetwork();
		}			
	});
	
}

function prev(){
	count--;
	getReportDetail('prev');
}

function next(){
	count++;
	getReportDetail('next');
}

function getData(value){
	return (isNull(value)) ? "" : value;
}

function setListUI(label,value){
	return '<div class="detail">'
			+'<div class="firstColnm">'+label+'</div>'
			+'<div class="secondColnm">:</div>'
			+'<div class="lastColmn">'+value+'</div>'
		+'</div>';
}

var app = {
    initialize: function () {
		if(hasCordova())
        	this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
    	document.addEventListener("backbutton", onBackPressed, false);	
    }
};

function initializeVerticalScroll(pageId) {
    if (verticalScroll != null) {
        verticalScroll.destroy();
    }
    if ($("#" + pageId).find("#wrapper").length > 0) {
        var wrapper = $("#wrapper", $.mobile.activePage);
        setTimeout(function () {
            if (wrapper.html() != null) {
                verticalScroll = new iScroll(wrapper[0], {
                    useTransition: true,
                    topOffset: 0,
                    hScrollbar: false,
                    scrollX: false,
                    scrollY: false,
					zoom:false,
                    onBeforeScrollStart: function (e) {
                        var target = e.target;
                        while (target.nodeType != 1) target = target.parentNode;

                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'IMG' && target.tagName != 'A') {
                            e.preventDefault();
                        }
                    }
                });
            }
        }, 500);
    }
}

function navigateToPage(page){
	if(page==""){
		return;
	}
	if(page=="index"){
		localStorage.setItem("euser_id",null);
		localStorage.setItem("edepartment",null);
		localStorage.setItem("ecustomer_id",null);
		localStorage.setItem("ecompany_name",null);
	}
	 $.mobile.changePage(page + '.html', {transition: "slide"});
}


function showPopUP(msg){
	if(!isNull(overlayElement)){
		hidePopUp();
	}
	var content = '<div align="center" class="popup_content">'+msg+'</div>'
				  +'<div onclick="hidePopUp();" class="popup_ok_btn">OK</div>';
	showPopUpMessage(content);
}
        
function showPopUpMessage(msg) {
    overlayElement = document.createElement("div");
    overlayElement.className = 'modalOverlay';
    modalWindowElement = document.createElement("div");
    modalWindowElement.className = 'modalWindow';
    modalWindowElement.style.zIndex = 1000;
    modalWindowElement.innerHTML = msg;                
    document.body.appendChild(overlayElement);
    document.body.appendChild(modalWindowElement);       
	modalWindowElement.style.opacity = 1;
	overlayElement.style.opacity = 0.5;  
	modalWindowElement.style.left = (window.innerWidth - modalWindowElement.offsetWidth) / 2 + "px";
	modalWindowElement.style.top = (window.innerHeight - modalWindowElement.offsetHeight) / 2 + "px";
	setTimeout(function(){
		setPopUpAttributes();
	},500);
	
	$('.popup_btn').on('vmousedown', function(){
        $(this).css('background','#28B1E8');
    }).on('vmouseup', function(){
        $(this).css('background','#FFFFFF');
    });
	
}

function setPopUpAttributes(){
	modalWindowElement.style.left = (window.innerWidth - modalWindowElement.offsetWidth) / 2 + "px";
	modalWindowElement.style.top = (window.innerHeight - modalWindowElement.offsetHeight) / 2 + "px";
}

function hidePopUp(status) {
    modalWindowElement.style.opacity = 0;
    overlayElement.style.opacity = 0;
    document.body.removeChild(overlayElement);
    document.body.removeChild(modalWindowElement);
	overlayElement = null;
	modalWindowElement = null;
}

$(window).on("orientationchange", function(event) {
	setTimeout(function(){
		setPopUpAttributes();
	},500);
});

function bindEvent(){
	$('.btnClass').on('vmousedown', function(){
        $(this).css('background','#F8A323');
    }).on('vmouseup', function(){
        $(this).css('background','#28B1E8');
    });
}

function onBackPressed(){
	pageId = $.mobile.activePage.attr('id');
	if(pageId=="homePage" && isUserLogin() || pageId=="indexPage" && !isUserLogin()){
		appExitMsg();	
	}else{
    	history.back();
    }
}

function appExitMsg(){
	if(!isNull(overlayElement)){
		hidePopUp();
	}
	var t ='<div align="center" class="popup_content">Are you sure want to exit the app</div>'
		+'<div style="text-align:center">'
			+'<div class="popup_btn" onclick="appExit();">OK</div>'
			+'<div class="popup_btn" style="margin-left:10px;" onclick="hidePopUp();">Cancel</div>'
		'</div>';
	showPopUpMessage(t);
}

function appExit(){
	navigator.app.exitApp();
}

function onAppBackPressed(){
	history.back();
}

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
			$('#'+id,$.mobile.activePage).val(formatDate(cd, "d/m/Y"));
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
	
function checkIsNetwork(){
	showPopUP("Server connection failed. Please try again later");
}
