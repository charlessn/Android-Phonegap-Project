function hasCordova(){
    return ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) ? false : true;
}

document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
document.write('<link rel="stylesheet" type="text/css" href="stylesheets/jquery.mobile-1.4.4.min.css">');
document.write('<link rel="stylesheet" type="text/css" href="stylesheets/common.css">');
document.write('<link rel="stylesheet" type="text/css" href="stylesheets/iscroll.css">');
document.write('<script type="text/javascript" src="javascripts/jquery-1.11.1.min.js"></script>');
document.write('<script type="text/javascript" src="javascripts/jquery.mobile-1.4.4.min.js"></script>');
document.write('<script type="text/javascript" src="javascripts/common.js"></script>');
document.write('<script type="text/javascript" src="javascripts/iscroll.js"></script>');
document.write('<script type="text/javascript" src="javascripts/dateformat.js"></script>');