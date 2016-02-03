var date = new Date();
var pageId="";
var file;
var count=0;
var baseUrl = "http://www.minervasoft.in/android/mportal/";

function isNull(value) {
    return typeof value == 'undefined' || value == null || value == '' || value == 'unknown' || value == 'null';
}
 
function isUserLogin(){
    return (isNull(localStorage.getItem('euser_id'))) ? false : true;
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
		url:baseUrl+"check_login.php",
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
		url:baseUrl+"select_user.php",
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
		url:baseUrl+"todo_entry_edit.php",
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
		url:baseUrl+"save_todo_entry.php",
		type:"POST",	
		data:{euser_id:user_id,date:date,status:status,remarks:remarks,work_stime:work_sTime,work_etime:work_eTime,lunch_stime:lunch_sTime,lunch_etime:lunch_eTime},
		dataType:"json",
		success:function(data){
			$.mobile.loading("hide");
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
		url:baseUrl+"select_project_name.php",
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
        url: baseUrl+'upload_file.php?files',
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
		url:baseUrl+"send_ticket.php",
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
		url:baseUrl+"select_customer_name.php",
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
		url:baseUrl+"select_project_name.php",
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
		url:baseUrl+"ticket_report.php",
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
	
function checkIsNetwork(){
	showPopUP("Server connection failed. Please try again later");
}
