var overlayElement = null;
var modalWindowElement = null;

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