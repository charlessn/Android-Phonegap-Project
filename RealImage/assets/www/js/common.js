//var baseUrl = "http://www.minervasoft.in/test/realimage/android_api";
var baseUrl="http://minervademo.com/customer_demo/realimage_pay/android_api"
var pay_id=[];

function navigateToPage(page){
	localStorage.setItem('update_entry',"");
	location.href=page+".html";
}

function showLoading(){
	$('#loading').css('display','block');
}
	
function hideLoading(){
	$('#loading').css('display','none');
}

function isNull(value) {
    return typeof value == 'undefined' || value == null || value == '' || value == 'unknown' || value == 'null';
}

function checkIsNetwork(){
	showPopUP("Server connection failed. Please try again later");
}

function login(){
	var username=$('#uname').val();
	var password=$('#pwd').val();
	
	if(isNull(username)){
		showPopUP("Please enter username");
	}else if(isNull(password)){
		showPopUP("Please enter password");
	}else{
		showLoading();
		$.ajax({
			url:baseUrl+"/login.php",
			type:"POST",
			data:{
				uname:username,
				pwd:password
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					localStorage.setItem("guser_id",obj.guser_id);
					localStorage.setItem("guser_name",obj.guser_name);
					localStorage.setItem("guser_admin",obj.guser_admin);
					localStorage.setItem("guser_category",obj.guser_category);
					localStorage.setItem("gdep_id",obj.gdep_id);
					localStorage.setItem("gmobile_no",obj.gmobile_no);
					localStorage.setItem("gdepartment",obj.gdepartment);
					navigateToPage('home');
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
	}
}

function forgotPassword(){
	
	var employeeId=$('#emp_id').val();
	var email=$('#email').val();
	
	if(isNull(employeeId)){
		showPopUP("Please enter employee ID");
	}else if(isNull(email)){
		showPopUP("Please enter email");
	}else{
		showLoading();
		$.ajax({
			url:baseUrl+"/forgot_req.php",
			type:"POST",
			data:{
				emp_id:employeeId,
				email_id:email
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					showPopUP(obj.succ);
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
	}
}

function changePassword(){
	
	var old_password=$('#old_password').val();
	var new_password=$('#new_password').val();
	var confirm_password=$('#confirm_password').val();
	
	if(isNull(old_password)){
		showPopUP("Please enter old password");
	}else if(isNull(new_password)){
		showPopUP("Please enter new password");
	}else if(isNull(confirm_password)){
		showPopUP("Please enter confirm password");
	}else{
		showLoading();
		$.ajax({
			url:baseUrl+"/change_password.php",
			type:"POST",
			data:{
				guser_id:localStorage.getItem('guser_id'),
				old_password:old_password,
				new_password:new_password,
				confirm_password:confirm_password
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					showPopUP(obj.succ);
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
	}
}


function getDepartment(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/get_department.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
			t+='<option value="">Select</option>';
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.id+'">'+row.value+'</option>'
				});
			$('#dep_id').html(t).trigger('create');
			getCategory();
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getCategory(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/get_category.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
			t+='<option value="">Select</option>';
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.id+'">'+row.value+'</option>'
				});
			$('#cat_id').html(t).trigger('create');
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function register(){
	var employeeId=$('#emp_id').val();
	var userName=$('#user_name').val();
	var userPass=$('#user_pass').val();
	var mobileNo=$('#mob_no').val();
	var emailId=$('#email_id').val();
	var depId=$('#dep_id').val();
	var catId=$('#cat_id').val();
	var isAdmin=$('#is_admin').val();
	
	if(isNull(employeeId)){
		showPopUP("Please enter Employee Id");
	}else if(isNull(userName)){
		showPopUP("Please enter Employee name");
	}else if(isNull(userPass)){
		showPopUP("Please enter password");
	}/*else if(userPass.length<6){
		showPopUP("Password must be atleast 6 characters");
	}else if(userPass.length>9){
		showPopUP("Password must be 6 to 9 characters");
	}*/else if(isNull(mobileNo)){
		showPopUP("Please enter mobile number");
	}/*else if(mobileNo.length>10){
		showPopUP("Mobile number must be 10 digits");
	}*/else if(isNull(emailId)){
		showPopUP("Please enter email");
	}else if(!validateEmail(emailId)){
		showPopUP("Please enter valid email");
	}else if(isNull(depId)){
		showPopUP("Please enter department");
	}else if(isNull(catId)){
		showPopUP("Please enter category");
	}else{
		showLoading();
		$.ajax({
			url:baseUrl+"/save_user_registration.php",
			type:"POST",
			data:{
				emp_id:employeeId,
				user_name:userName,
				user_pass:userPass,
				mob_no:mobileNo,
				email_id:emailId,
				dep_id:depId,
				cat_id:catId,
				is_admin:""
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					showPopUP(obj.succ);
					history.back();
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
	}
}

function getUserReport(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/user_report_arr.php",
		type:"POST",	
		dataType:"json",
		data:{
				guser_id:localStorage.getItem('guser_id'),
				guser_admin:localStorage.getItem('guser_admin'),
				gdep_id:localStorage.getItem('gdep_id')
		},
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
				return;
			}
			$.each(data.json_return_array,function(i,row){
				var cls = (i%2) ? "even" : "odd";
				t+='<div class="'+cls+'"><div class="user_reportDiv">'
				 	+'<div class="left">Employee Id</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.EmployeeID+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Employee Name</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.EmployeeName+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Mobile No</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right status_color" id="first_'+i+'" onclick="getMobileNumber('+i+');">'+row.MobileNo+'</div>'
					+'<div class="right status_color" id="second_'+i+'" style="display:none;">'
					+'<input type="text" value="'+row.MobileNo+'" data="'+row.user_id+'" id="value_'+i+'" class="register_textbox" style="width:100px;"/><span style="margin-left:5px;" onclick="updateMobileNo('+i+');">Update</span>'
					+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Email</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.EmailID+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Category</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.category+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Department</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.department+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Status</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.DisplayStatus+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">isAdmin</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.is_admin+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Option</div>'
				 	+'<div class="middle">:</div>';
					if(row.status=="upd" || row.status=="del" || row.status=="sus"){
						t+='<div class="right status_color" onclick="updateStatus('+row.user_id+',\'a\');">To Activate Click Here</div>'
					}else if(row.status=="act"){
						t+='<div class="right status_color" onclick="updateStatus('+row.user_id+',\'d\');">To Deactivate Click Here</div>'
					}else if(row.status=="fgt"){
						t+='<div class="right status_color" onclick="sendRandomPassword('+row.user_id+',\'f\');">Send Random Password</div>'
					}
   				t+='</div></div>'
			});
			$('#user_detail').html(t).trigger('create');
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getUserReportSearchResult(){
	var t="";
	var search=$('#user_search').val();
	$('#user_detail').html("");
	if(search==""){
		showPopUP("Please enter a search key");
		return;
	}
	showLoading();
	$.ajax({
		url:baseUrl+"/user_report_arr.php",
		type:"POST",	
		data:{
			search:search,
			guser_id:localStorage.getItem('guser_id'),
			guser_admin:localStorage.getItem('guser_admin'),
			gdep_id:localStorage.getItem('gdep_id')
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
				return;
			}
			$.each(data.json_return_array,function(i,row){
				var cls = (i%2) ? "even" : "odd";
				t+='<div class="'+cls+'"><div class="user_reportDiv">'
				 	+'<div class="left">Employee Id</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.EmployeeID+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Employee Name</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.EmployeeName+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Mobile No</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right status_color" id="first_'+i+'" onclick="getMobileNumber('+i+');">'+row.MobileNo+'</div>'
					+'<div class="right status_color" id="second_'+i+'" style="display:none;">'
					+'<input type="text" value="'+row.MobileNo+'" data="'+row.user_id+'" id="value_'+i+'" class="register_textbox" style="width:100px;"/><span style="margin-left:5px;" onclick="updateMobileNo('+i+');">Update</span>'
					+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Email</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.EmailID+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Category</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.category+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Department</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.department+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Status</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.DisplayStatus+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">isAdmin</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.is_admin+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Option</div>'
				 	+'<div class="middle">:</div>';
					if(row.status=="upd" || row.status=="del" || row.status=="sus"){
						t+='<div class="right status_color" onclick="updateStatus('+row.user_id+',\'a\');">To Activate Click Here</div>'
					}else if(row.status=="act"){
						t+='<div class="right status_color" onclick="updateStatus('+row.user_id+',\'d\');">To Deactivate Click Here</div>'
					}else if(row.status=="fgt"){
						t+='<div class="right status_color" onclick="sendRandomPassword('+row.user_id+',\'f\');">Send Random Password</div>'
					}
   				t+='</div></div>'
			});
			$('#user_detail').html(t).trigger('create');
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getMobileNumber(id){
	$('#first_'+id).css('display','none');
	$('#second_'+id).css('display','block');
}

function updateMobileNo(id){
	var mobileNo = $('#value_'+id).val();
	var userId = $('#value_'+id).attr('data');
	showLoading();
	$.ajax({
		url:baseUrl+"/update_mobile.php",
		type:"POST",
		data:{
			user_id:userId,
			mobile_no:mobileNo
		},	
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
			}else{
				showPopUP(obj.succ);
				getUserReport();
			}
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function sendRandomPassword(id,status){
	var mobileNo = $('#value_'+id).val();
	var userId = $('#value_'+id).attr('data');
	showLoading();
	$.ajax({
		url:baseUrl+"/random_pass.php",
		type:"POST",
		data:{
			id:id,
			status:status
		},	
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
			}else{
				showPopUP(obj.succ);
				getUserReport();
			}
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function updateStatus(id,status){
	showLoading();
	$.ajax({
		url:baseUrl+"/user_status.php",
		type:"POST",
		data:{
			status:status,
			id:id
		},	
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
			}else{
				showPopUP(obj.succ);
				getUserReport();
			}
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function validateEmail(sEmail) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(sEmail)) {
		return true;
	}else {
		return false;
	}
}

function getCustomerName(){
	var t="";
	$('#emp_id').html(localStorage.getItem('guser_id'));
	$('#user_name').html(localStorage.getItem('guser_name'));
	$('#mob_no').html(localStorage.getItem("gmobile_no"));
	showLoading();
	$.ajax({
		url:baseUrl+"/customer_name.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.id+'">'
				});
			$('#customerlist').html(t).trigger('create');
			getMovieLanguage();
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getMovieLanguage(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/mov_lang.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
			t+='<option value="">Select</option>';
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.id+'">'+row.value+'</option>'
				});
			$('#mov_lang').html(t).trigger('create');
			getPaymentMode();
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getPaymentMode(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/pay_mode.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
			t+='<option value="">Select</option>';
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.id+'">'+row.value+'</option>'
				});
			$('#pay_mod').html(t).trigger('create');
			getCollectionBy();
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getCollectionBy(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/collect_by.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
			t+='<option value="">Select</option>';
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.value+'" data="'+row.id+'">'+row.value+'</option>'
				});
			$('#coll_emp').html(t).trigger('create');
			if(localStorage.getItem("update_entry")!=""){
				updateMarketing();
			}
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getERPId(){
	$('#erp_id').html('-');
	$('#customermob').val();
	var cname=$('#customername').val();

	showLoading();
	$.ajax({
		url:baseUrl+"/filter_customer_name.php",
		type:"POST",
		data:{
			cname:cname
		},	
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
				var str=/new/ig;
				if(str.test(obj.err)){
 					$('#new_cus').attr('checked', true);
				}
			}else{
				$('#new_cus').attr('checked', false);
				$('#erp_id').html(obj.erp_id);
				$('#customermob').val(obj.mobile_no);
			}
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getCollectById(){
	$('#emp_name, #emp_mob').html('-');
	var collect_by=$('#coll_emp').val();
	showLoading();
	$.ajax({
		url:baseUrl+"/filter_collect_by.php",
		type:"POST",
		data:{
			collect_by:collect_by
		},	
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
			}else{
				$('#emp_name').html(obj.Employee_Name);
				$('#emp_mob').html(obj.Mobile_No);
			}
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function saveContentMarketing(ctype){
	var customername=$('#customername').val();
	var customermob=$('#customermob').val();
	var erp_id=$('#erp_id').html();
	var movie_name=$('#movie_name').val();
	var mov_lang=$('#mov_lang').val();
	var amount=$('#amount').val();
	var pay_mod=$('#pay_mod').val();
	var coll_emp=$('#coll_emp').val();
	var emp_name=$('#emp_name').html();
	var emp_mob=$('#emp_mob').html();
	var check1=$("#new_cus").is(':checked');
	var remarks=$('#remarks').val();
	
	if(isNull(customername)){
		showPopUP("Please select customer name");
	}else if(isNull(movie_name)){
		showPopUP("Please enter movie name");
	}else if(isNull(mov_lang)){
		showPopUP("Please enter movie language");
	}else if(isNull(amount)){
		showPopUP("Please enter amount");
	}else if(isNull(pay_mod)){
		showPopUP("Please select payment mode");
	}else if(isNull(coll_emp)){
		showPopUP("Please select collected by Employee Id");
	}else{
		showLoading();
		$.ajax({
			url:baseUrl+"/save_marketing_request.php",
			type:"POST",
			data:{
				guser_id:localStorage.getItem('guser_id'),
				customername:customername,
				check1:(check1)?1:0,
				customermob:customermob,
				movie_name:movie_name,
				mov_lang:mov_lang,
				amount:amount,
				pay_mode:pay_mod,
				collectby:coll_emp,
				remarks:remarks,
				rtype:"c",
				ctype:ctype,
				req_id:(localStorage.getItem("update_entry")!="")?localStorage.getItem("req_id"):"",
				eid:(localStorage.getItem("update_entry")!="")?localStorage.getItem("eId"):""
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					showPopUP(obj.succ);
					localStorage.setItem("update_entry","entry");
					localStorage.setItem("req_id", obj.req_id);
					localStorage.setItem("eId",obj.e_id);
					if(ctype==2){
						$('#new_cus').attr('checked', false);
						$('#erp_id').html("-");
						$('#emp_mob, #emp_name').html("-");
						$('#customername, #customermob, #movie_name, #mov_lang, #amount, #pay_mod, #coll_emp, #remarks').val("");
						$('#content_entry_save_btn').attr('value','Save');
						$('#content_entry_cfm_btn').css('visibility','hidden');

					}else{
						$('#content_entry_save_btn').attr('value','Update');
						$('#content_entry_cfm_btn').css('visibility','visible');
					}
					getContentEntryReport();
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
	}
}

function getContentEntryReport(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/marketing_report.php",
		type:"POST",
		data:{
				guser_id:localStorage.getItem('guser_id'),
				guser_admin:localStorage.getItem('guser_admin'),
				gdep_id:localStorage.getItem('gdep_id'),
				guser_category:localStorage.getItem('guser_category')
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
				return;
			}
			$.each(data.json_return_array,function(i,row){
				var cls = (i%2) ? "even" : "odd";
				if(row.Edit!=""){
					t+='<div class="'+cls+'"><div class="user_reportDiv">'
						+'<div class="left">Request type</div>'
						+'<div class="middle">:</div>'
						+'<div class="right status_color" onclick="updateContentMarketingEntry(\''+row.Request_type+'\','+row.Edit+');">'+row.Request_type+'</div>'
					+'</div>'
				}else{
					t+='<div class="'+cls+'"><div class="user_reportDiv">'
						+'<div class="left">Request type</div>'
						+'<div class="middle">:</div>'
						+'<div class="right">'+row.Request_type+'</div>'
					+'</div>'
				}
				t+='<div class="user_reportDiv">'
				 	+'<div class="left">Request Date</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_date+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Request By</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_By+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Customer Name</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Customer_name+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Customer Mobile No</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Customer_mobile+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected By</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collected_By+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collection Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collection_amount+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collected_amount+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Balance Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Balance+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Payment</div>'
				 	+'<div class="middle">:</div>'
					if(row.Payment!=""){
   						t+='<div class="right status_color" onclick="getPaymentInfo(\''+row.Payment+'\',\''+row.Request_type+'\');">Payment</div>'
					}else{
						t+='<div class="right">No</div>'
					}
   				t+='</div></div>'
			});
			$('#content_entry_detail').html(t).trigger('create');
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function updateContentMarketingEntry(type,id){
	localStorage.setItem('eId',id);
	localStorage.setItem('update_entry',"yes")
	if(type=="Content"){
		location.href="content_update_entry.html";
	}else{
		location.href="theatre_update_entry.html";
	}
}

function updateMarketing(){
	showLoading();
	$.ajax({
		url:baseUrl+"/get_marketing_edit_info.php",
		type:"POST",
		data:{
				id:localStorage.getItem('eId'),
				guser_category:localStorage.getItem('guser_category'),
				gdep_id:localStorage.getItem('gdep_id')
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
				return;
			}
			$('#customername').val(obj.Customer_Name);
			$('#erp_id').html(obj.erp_id);
			$('#customermob').val(obj.Customer_Mobile_no);
			$('#towards').val(obj.towards);
			$('#pay_mod').val(obj.payment_mode);
			$('#coll_emp').val(obj.collected_by_id);
			//$('#towards_desc').css('display','none');
			/*if(obj.towards=="Others"){
				$('#towards_desc').css('display','block');
				$('#towards_desc').val(obj.towards_desc);
			}*/
			$('#emp_name').html(obj.collected_by_name);
			$('#emp_mob').html(obj.collected_by_mno);
			$('#remarks').val(obj.remarks);
			$('#amount').val(obj.Amount_to_be_collected);
			$('#movie_name').val(obj.movie_name);
			$('#mov_lang').val(obj.movie_language);
			
			localStorage.setItem('req_id',obj.req_id);
			
			if(obj.is_new_customer=="y"){
				$('#new_cus').attr('checked', true);
			}else{
				$('#new_cus').attr('checked', false);
			}
		},
		error:function(err){
			hideLoading();
		}
	});
}

function getContentEntrySearchReport(){
	var t="";
	$('#content_entry_detail').html("");
	var search=$('#content_report').val();
	$('#content_report').html("");
	if(search==""){
		showPopUP("Please enter a search key");
		return;
	}
	showLoading();
	$.ajax({
		url:baseUrl+"/marketing_report.php",
		type:"POST",
		data:{
				guser_id:localStorage.getItem('guser_id'),
				guser_admin:localStorage.getItem('guser_admin'),
				gdep_id:localStorage.getItem('gdep_id'),
				guser_category:localStorage.getItem('guser_category'),
				search:search
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
				return;
			}
			$.each(data.json_return_array,function(i,row){
				var cls = (i%2) ? "even" : "odd";
				t+='<div class="'+cls+'"><div class="user_reportDiv">'
				 	+'<div class="left">Request type</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_type+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Request Date</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_date+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Request By</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_By+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Customer Name</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Customer_name+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Customer Mobile No</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Customer_mobile+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected By</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collected_By+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collection Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collection_amount+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collected_amount+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Balance Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Balance+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Status</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Balance+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Payment</div>'
				 	+'<div class="middle">:</div>'
					if(row.Payment!=""){
   						t+='<div class="right status_color" onclick="getPaymentInfo(\''+row.Payment+'\',\''+row.Request_type+'\');">Payment</div>'
					}else{
						t+='<div class="right">No</div>'
					}
   				/*t+='</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="right">'
						+'<input name="fileno" type="text" class="textfield5" id="name" value="" width="100%"/>'
					+'</div>'
					+'<div class="middle"></div>'
   					+'<div class="left">'
						+'<input name="Submit2" type="submit" class="input-save1" value=""/>'
					+'</div>'*/
   				t+='</div></div>'
			});
			$('#content_entry_detail').html(t).trigger('create');
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}


function getPaymentInfo(payment,type){
	localStorage.setItem('payment',payment);
	var page = (type=="Content")?"content_payment":"theatre_payment"
	navigateToPage(page);
}

function getPaymentDetail(){
	showLoading();
	getPaymentDetailMode();
	getBankName();
	$.ajax({
		url:baseUrl+"/get_payment_info.php",
		type:"POST",
		data:{
			id:localStorage.getItem('payment')
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					$('#emp_id').html(localStorage.getItem("guser_id"));
					$('#user_name').html(localStorage.getItem("guser_name"));
					$('#mob_no').html(localStorage.getItem("gmobile_no"));
					$('#movie_name').html(obj.Movie_Name);
					$('#movie_lang').html(obj.Movie_Lan);
					$('#towards').html(obj.Towards);
					$('#towards_desc').html(obj.Towards_Desc);
					$('#customername').html(obj.Customer_Name);
					$('#customermob').html(obj.Customer_Mobile_no);
					$('#amount').html(obj.Amount);
					$('#coll_emp_id').html(obj.Collected_By_EmpId);
					$('#coll_emp_name').html(obj.Collected_By_EmpName);
					$('#coll_mob_no').html(obj.Collected_By_Emp_Mobileno);
					$('#remarks').html(obj.Remarks);
					$('#erp_id').html(obj.erp_id);
					$('#coll_mob_no').html(obj.Collected_By_Emp_Mobileno);
					localStorage.setItem('customer_code',obj.customer_code);
					localStorage.setItem('payment_mode',obj.Paymode);
					setTimeout(function(){
						if(obj.Paymode=="Cash"){
							$('#p_pay_mode').val(1);
							$('#bank, #cheque').css('display','none');
						}else{
							$('#p_pay_mode').val(2);
							$('#bank, #cheque').css('display','block');
						}
					},1000);
				}
		},error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});	 
}

function changePayMode(){
	var mode = $('#p_pay_mode').val();
	if(mode=="1"){
		$('#bank, #cheque').css('display','none');
	}else{
		$('#bank, #cheque').css('display','block');
	}
}

function saveContentPaymentDetail(){
	var actual_amount=$('#ac_amt').val();
	var collect_date=$('#coll_date').val();
	var collect_from=$('#collect_from').val();
	var collect_from_mno=$('#collect_from_mno').val();
	var p_pay_mode=$('#p_pay_mode').val();
	var bank_name=$('#bank_name').val();
	var cheque_no=$('#cheque_no').val();
	var cheque_date=$('#cheque_date').val();
	var p_remarks=$('#p_remarks').val();
	
	if(localStorage.getItem('payment_mode')=="Cash"){
		bank_name="";
		cheque_no="";
		cheque_date="";
	}else{
		bank_name=$('#bank_name').val();
		cheque_no=$('#cheque_no').val();
		cheque_date=$('#cheque_date').val();
	}
	
	if(isNull(actual_amount)){
		showPopUP("Please enter actual amount");
	}else if(isNull(collect_date)){
		showPopUP("Please enter collection date");
	}else if(isNull(collect_from)){
		showPopUP("Please enter collect from");
	}else if(isNull(collect_from_mno)){
		showPopUP("Please enter collect from mobile number");
	}else if(isNull(p_pay_mode)){
		showPopUP("Please select payment mode");
	}else{
		showLoading();
		$.ajax({
			url:baseUrl+"/save_payment.php",
			type:"POST",
			data:{
				guser_id:localStorage.getItem('guser_id'),
				guser_name:localStorage.getItem('guser_name'),
				ac_amt:actual_amount,
				coll_date:collect_date,
				collect_from:collect_from,
				collect_from_mno:collect_from_mno,
				p_pay_mode:p_pay_mode,
				bank_name:bank_name,
				cheque_no:cheque_no,
				cheque_date:cheque_date,
				p_remarks:p_remarks,
				req_id:localStorage.getItem('payment'),
				customerid:localStorage.getItem('customer_code'),
				rtype:"c"
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					showPopUP(obj.succ);
					navigateToPage("content_report");
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
	}
}

function saveTheatrePaymentDetail(){
	var actual_amount=$('#ac_amt').val();
	var collect_date=$('#coll_date').val();
	var collect_from=$('#collect_from').val();
	var collect_from_mno=$('#collect_from_mno').val();
	var p_pay_mode=$('#p_pay_mode').val();
	var bank_name=$('#bank_name').val();
	var cheque_no=$('#cheque_no').val();
	var cheque_date=$('#cheque_date').val();
	var p_remarks=$('#p_remarks').val();
	
	if(localStorage.getItem('payment_mode')=="Cash"){
		bank_name="";
		cheque_no="";
		cheque_date="";
	}else{
		bank_name=$('#bank_name').val();
		cheque_no=$('#cheque_no').val();
		cheque_date=$('#cheque_date').val();
	}
	
	if(isNull(actual_amount)){
		showPopUP("Please enter actual amount");
	}else if(isNull(collect_date)){
		showPopUP("Please enter collection date");
	}else if(isNull(collect_from)){
		showPopUP("Please enter collect from");
	}else if(isNull(collect_from_mno)){
		showPopUP("Please enter collect from mobile number");
	}else if(isNull(p_pay_mode)){
		showPopUP("Please select payment mode");
	}else{
		showLoading();
		$.ajax({
			url:baseUrl+"/save_payment.php",
			type:"POST",
			data:{
				guser_id:localStorage.getItem('guser_id'),
				guser_name:localStorage.getItem('guser_name'),
				ac_amt:actual_amount,
				coll_date:collect_date,
				collect_from:collect_from,
				collect_from_mno:collect_from_mno,
				p_pay_mode:p_pay_mode,
				bank_name:bank_name,
				cheque_no:cheque_no,
				cheque_date:cheque_date,
				p_remarks:p_remarks,
				req_id:localStorage.getItem('payment'),
				customerid:localStorage.getItem('customer_code'),
				rtype:"t"
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					showPopUP(obj.succ);
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
	}
}

function getPaymentDetailMode(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/pay_mode.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
			t+='<option value="">Select</option>';
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.id+'">'+row.value+'</option>'
				});
			$('#p_pay_mode').html(t).trigger('create');
			getCollectionBy();
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function theatreEntryPage(){
	getCustomerName();
	getTowards();
}

function getTowards(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/get_towards.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
			t+='<option value="">Select</option>';
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.id+'">'+row.value+'</option>'
				});
			$('#towards').html(t).trigger('create');
			if(localStorage.getItem("update_entry")!=""){
				
				setTimeout(function(){			
					if($('#towards').val()=="Others"){
						$('#to_desc').css('display','block');
					}else{
						$('#to_desc').css('display','none');
					}
				},1000);
			}
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function saveTheatreEntry(ctype){
	
	var customername=$('#customername').val();
	var customermob=$('#customermob').val();
	var towards=$('#towards').val();
	var towards_desc=$('#towards_desc').val();
	var amount=$('#amount').val();
	var pay_mod=$('#pay_mod').val();
	var coll_emp=$('#coll_emp').val();
	var check1=$("#new_cus").is(':checked');
	var remarks=$('#remarks').val();

	
	if(isNull(customername)){
		showPopUP("Please select customer name");
	}else if(isNull(towards)){
		showPopUP("Please select towards");
	}else if(isNull(amount)){
		showPopUP("Please enter amount");
	}else if(isNull(pay_mod)){
		showPopUP("Please select payment mode");
	}else if(isNull(coll_emp)){
		showPopUP("Please select collected by Employee Id");
	}else{
		showLoading();
		$.ajax({
			url:baseUrl+"/save_marketing_request.php",
			type:"POST",
			data:{
				guser_id:localStorage.getItem('guser_id'),
				customername:customername,
				check1:(check1)?1:0,
				customermob:customermob,
				towards:towards,
				other_remarks:towards_desc,
				amount:amount,
				pay_mode:pay_mod,
				collectby:coll_emp,
				remarks:remarks,
				rtype:"t",
				ctype:ctype,
				req_id:(localStorage.getItem("update_entry")!="")?localStorage.getItem("req_id"):"",
				eid:(localStorage.getItem("update_entry")!="")?localStorage.getItem("eId"):""
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					showPopUP(obj.succ);
					localStorage.setItem("update_entry","entry");
					localStorage.setItem("req_id", obj.req_id);
					localStorage.setItem("eId",obj.e_id);
					if(ctype==2){
						$('#new_cus').attr('checked', false);
						$('#erp_id').html("-");
						$('#emp_name, #emp_mob').html("-");
						$('#customername, #towards,#customermob, #towards_desc, #amount, #pay_mod, #coll_emp, #remarks').val("");
						$('#content_entry_save_btn').attr('value','Save');
						$('#content_entry_cfm_btn').css('visibility','hidden');
					}
					$('#content_entry_save_btn').attr('value','Update');
					$('#content_entry_cfm_btn').css('visibility','visible');
					getContentEntryReport();
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
	}
}

function towardsOption(){
	var towards=$('#towards').val();
	if(towards=="Others"){
		$('#to_desc').css('display','block');
	}else{
		$('#to_desc').css('display','none');
	}
}

function getPaymentCollectionReport(){
	var t="";
	pay_id=[];
	showLoading();
	$.ajax({
		url:baseUrl+"/payment_collection_report.php",
		type:"POST",
		data:{
				guser_id:localStorage.getItem('guser_id'),
				guser_admin:localStorage.getItem('guser_admin'),
				guser_category:localStorage.getItem('guser_category'),
				gdep_id:localStorage.getItem('gdep_id')
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
				$('#content_entry_update_btn').css('display','none');
				return;
			}
			$('#content_entry_update_btn').css('display','block');
			$.each(data.json_return_array,function(i,row){
				pay_id.push(row.pay_item_id);
				var cls = (i%2) ? "even" : "odd";
				t+='<div class="'+cls+'"><div class="user_reportDiv">'
				 	+'<div class="left">Request type</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_type+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Request Date</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_date+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Request By</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_By+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Customer Name</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Customer_name+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Customer Mobile No</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Customer_mobile+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected By</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collected_By+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Cheque Number</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.cheque_number+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Cheque Date</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Cheque_date+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Bank Name</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Bank_name+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Temp Receipt No</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Temp_Receiptno+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collection Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collection_amount+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.col_amt+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Balance Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Balance+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected From</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.collected_from+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collection Date</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collection_date+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Deposit Date</div>'
				 	+'<div class="middle">:</div>';
					if(row.Deposit_date!=null){
   						t+='<div class="right">'+row.Deposit_date+'</div>';
					}else {
						t+='<div class="right"><input type="text" class="register_textbox dep_date"/></div>';
					}
   				t+='</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Deposit Date</div>'
				 	+'<div class="middle">:</div>';
					if(row.deposit_bank!=null){
   						t+='<div class="right">'+row.deposit_bank+'</div>';
					}else {
						t+='<div class="right"><input type="text" class="register_textbox dep_bank"/></div>';
					}
   				t+='</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">ERP Receipt Number</div>'
				 	+'<div class="middle">:</div>';
					if(row.ERP_receipt_number!=null && row.ERP_access==""){
   						t+='<div class="right">'+row.ERP_receipt_number+'</div>';
					}else {
						t+='<div class="right"><input type="text" class="register_textbox erp_number"/></div>';
					}
   				t+='</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">ERP Date</div>'
				 	+'<div class="middle">:</div>';
					if(row.ERP_DATE!=null && row.ERP_access==""){
   						t+='<div class="right">'+row.ERP_DATE+'</div>';
					}else {
						t+='<div class="right"><input type="text" class="register_textbox erp_date"/></div>';
					}
   				t+='</div></div>'
			});
			$('#payment_collection_detail').html(t).trigger('create');
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function getPaymentCollectionSearchReport(){
	var t="";
	pay_id=[];

	$('#payment_collection_detail').html("");
	var search=$('#coll_search').val();
	if(search==""){
		showPopUP("Please enter a search key");
		return;
	}

	showLoading();
	$.ajax({
		url:baseUrl+"/payment_collection_report.php",
		type:"POST",	
		data:{search:search},
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
			if(!isNull(obj.err)){
				showPopUP(obj.err);
				return;
			}
			$.each(data.json_return_array,function(i,row){
				pay_id.push(row.pay_item_id);
				var cls = (i%2) ? "even" : "odd";
				t+='<div class="'+cls+'"><div class="user_reportDiv">'
				 	+'<div class="left">Request type</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_type+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Request Date</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_date+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Request By</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Request_By+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Customer Name</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Customer_name+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Customer Mobile No</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Customer_mobile+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected By</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collected_By+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Cheque Number</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.cheque_number+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Cheque Date</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Cheque_date+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Bank Name</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Bank_name+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Temp Receipt No</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Temp_Receiptno+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collection Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collection_amount+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collected_amount+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Balance Amount</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Balance+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collected From</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.collected_from+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Collection Date</div>'
				 	+'<div class="middle">:</div>'
   					+'<div class="right">'+row.Collection_date+'</div>'
   				+'</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Deposit Date</div>'
				 	+'<div class="middle">:</div>';
					if(row.Deposit_date!=null){
   						t+='<div class="right">'+row.Deposit_date+'</div>';
					}else {
						t+='<div class="right"><input type="text" class="register_textbox dep_date"/></div>';
					}
   				t+='</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">Deposit Date</div>'
				 	+'<div class="middle">:</div>';
					if(row.deposit_bank!=null){
   						t+='<div class="right">'+row.deposit_bank+'</div>';
					}else {
						t+='<div class="right"><input type="text" class="register_textbox dep_bank"/></div>';
					}
   				t+='</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">ERP Receipt Number</div>'
				 	+'<div class="middle">:</div>';
					if(row.ERP_receipt_number!=null){
   						t+='<div class="right">'+row.ERP_receipt_number+'</div>';
					}else {
						t+='<div class="right"><input type="text" class="register_textbox erp_number"/></div>';
					}
   				t+='</div>'
				+'<div class="user_reportDiv">'
				 	+'<div class="left">ERP Date</div>'
				 	+'<div class="middle">:</div>';
					if(row.ERP_DATE!=null){
   						t+='<div class="right">'+row.ERP_DATE+'</div>';
					}else {
						t+='<div class="right"><input type="text" class="register_textbox erp_date"/></div>';
					}
   				t+='</div></div>'
			});
			$('#payment_collection_detail').html(t).trigger('create');
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}
function getBankName(){
	var t="";
	showLoading();
	$.ajax({
		url:baseUrl+"/get_bankname.php",
		type:"GET",	
		dataType:"json",
		success:function(data){
			hideLoading();
			t+='<option value="">Select</option>';
				$.each(data.json_return_array,function(i,row){
					t+='<option value="'+row.id+'">'+row.value+'</option>'
				});
			$('#bank_name').html(t).trigger('create');
		},
		error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});
}

function updatePaymentDeposit(){
	
	var dep_bank=[];
	var dep_date=[];
	var erp_date=[];
	var erp_number=[];

	showLoading();
	
	$('.dep_bank').each(function(){
        dep_bank.push($(this).val());
    });

	$('.dep_date').each(function(){
        dep_date.push($(this).val());
    });

    $('.erp_date').each(function(){
        erp_date.push($(this).val());
    });

    $('.erp_number').each(function(){
        erp_number.push($(this).val());
    });

	$.ajax({
			url:baseUrl+"/paymentdeposit.php",
			type:"POST",
			data:{
				guser_id:localStorage.getItem('guser_id'),
				pay_id:pay_id,
				dep_date:dep_date,
				dep_bank:dep_bank,
				erp_recp_no:erp_number,
				erp_recp_date:erp_date
			},	
			dataType:"json",
			success:function(data){
				hideLoading();
				var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					showPopUP(obj.succ);
				}
			},
			error:function(err){
				hideLoading();
				checkIsNetwork();
			}
		});
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 0) 
        return true;
    else 
        return false;
}

$(document).ready(function(){
	$('#user_search').on('keydown',function(e){
	setTimeout(function(){
		  if($('#user_search').val().length==0){
		  	if (e.which != 13) {
		  		getUserReport();
		  	}
		  }
		 },100);
	});

	$('#coll_search').on('keydown',function(e){
	setTimeout(function(){
		  if($('#coll_search').val().length==0){
		  	if (e.which != 13) {
		  		getPaymentCollectionReport();
		  	}
		  }
		 },100);
	});

	$('#content_report').on('keydown',function(e){
	setTimeout(function(){
		  if($('#coll_search').val().length==0){
		  	if (e.which != 13) {
		  		getPaymentCollectionReport();
		  	}
		  }
		 },100);
	});
});

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


function onBackPressed(){
	pageId = (/index|home/gi).test(window.location.href);
	if(pageId){
		appExitMsg();	
	}else{
		localStorage.setItem("update_entry","");
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


function getEntryAccess(ctype){
	showLoading();
	$.ajax({
		url:baseUrl+"/marketing_entry_access.php",
		type:"POST",
		data:{
			guser_category:localStorage.getItem('guser_category'),
			gdep_id:localStorage.getItem('gdep_id'),
			type:ctype

		},
		dataType:"json",
		success:function(data){
			hideLoading();
			var obj = data.json_return_array[0];
				if(!isNull(obj.err)){
					showPopUP(obj.err);
				}else{
					localStorage.setItem('update_entry',"");
					if(ctype=="c"){
						navigateToPage("content_entry");
					}else{
						navigateToPage("theatre_entry");
					}
				}
		},error:function(err){
			hideLoading();
			checkIsNetwork();
		}
	});	 
}
