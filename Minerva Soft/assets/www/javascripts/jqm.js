var verticalScroll = null;

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
			
});

$(window).on("orientationchange", function(event) {
	setTimeout(function(){
		setPopUpAttributes();
	},500);
});

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

function bindEvent(){
	$('.btnClass').on('vmousedown', function(){
        $(this).css('background','#F8A323');
    }).on('vmouseup', function(){
        $(this).css('background','#28B1E8');
    });
}
