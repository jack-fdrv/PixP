var jqueryIs = function waitJQ() {
    if (typeof jQuery != "undefined") {
(function($){
$.noConflict();
$(function() {
$.ajaxSetup({cache: true});
$('body').before('<div id="pp-load" style="opacity:0.7;z-index: 9999999; width:100%; position: absolute; top:0; left:0; display:block;"><div style="text-align: center;"><img src="https://raw.github.com/jek-fdrv/PixP/master/ajax-loader.gif"></div></div>');
$.getScript("https://raw.github.com/jek-fdrv/PixP/master/jquery-cookie.js", function() {
$.getScript("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js", function() {
$.getScript("https://raw.github.com/jek-fdrv/PixP/master/hotkeys.js", function() {	
	if ($.cookie('display')) {var Cdisplay = $.cookie('display');} else {var Cdisplay = 'block';}
	if ($.cookie('top')) {var Ctop = $.cookie('top');} else {var Ctop = 0;}
	if ($.cookie('left')) {var Cleft = $.cookie('left');} else {var Cleft = 0;}
	if ($.cookie('opacity')) {var Copacity = $.cookie('opacity');} else {var Copacity = 0.4;}	
	$.cookie('NF','');
	if (!$.cookie('PreOpacity')) {$.cookie('PreOpacity',0.4)}	
	var msg="Please type the url or patch where u store 'pp-bg.jpg/png'";
	var msgE="I cant found pp-bg,please select new patch or url.";
	function Pltgs() {$('#pp-load').show();}
	function Pltgh() {$('#pp-load').hide();} 
	function Pdtgs() {$('#pp-dialog').show();}
	function Pdtgh() {$('#pp-dialog').hide();}
	var dh = $(document).height();
	if ($.cookie('Cpatch')) {showImg($.cookie('Cpatch'));} else { ppDialog(msg);}
	function ppDialog(msg) {
		if ($('#pp-dialog').length > 0) { 
			Pltgh();$('#pp-dialog p').html(msg);$('#pp-dialog #pp-nf').text($.cookie('NF'));$.cookie('NF','');$('#pp-dialog').toggle("slide", { direction: "up" }, 100);
		} else {			
			$('body').before('<div  style="position: absolute; width: 300px; left: 50%; margin-left: -150px;"><form id="pp-dialog" style=" display:'+Cdisplay+';z-index: 99999999;direction: ltr; border: 4px solid #333;box-shadow: 0 -1px 6px -1px #262626;border-radius: 3px 3px 3px 3px;padding: 5px;position: relative;top: 15px; width: 300px; background: #5ECEFE;height: 138px;"><p style="color: #fff;text-shadow: 0 0 5px #434343;margin: 0px;padding-right: 60px; padding-left: 7px;">'+msg+'</p><input name="url" value="/" style="width: auto; padding: 3px; position: absolute; left: 10px; top: 50px;width: 228px; margin-top: 10px; box-shadow: 0px 0px 2px inset; border: 2px solid rgb(51, 51, 51);"><span id="pp-jpg-r" style="position: absolute; right: 10px; top: 52px;"><input type="radio" value="pp-bg.jpg" name="imgExt">.jpg <br><input type="radio" value="pp-bg.png" name="imgExt">.png</span><span id="pp-close"style="position: absolute; top: 0px; right: 7px; font-size: 22px; font-weight: bold; text-shadow: 0px 0px 5px; color: rgb(34, 34, 34); cursor: pointer;"> &times;</span><span id="pp-nf"style="position: absolute; bottom: 10px; overflow: hidden; left: 0px; padding-left: 10px; width: 290px; white-space: nowrap; font-size: 15px;">'+$.cookie('NF')+'</span></form></div>');
			$.cookie('NF','');$('#pp-close').click(function() {ppDialog(msg);});
			Pltgh();
			$('#pp-dialog input').focus(function() {if($(this).val() === '/') {$(this).val('')}});$('#pp-dialog input').blur(function() {if($(this).val() === '') {$(this).val('/')}});
			$('#pp-dialog input').keyup(function() {if($('#pp-dialog input').val().match(/\.jpg$|\.png$/)) {$('#pp-jpg-r').hide();} else {$('#pp-jpg-r').show();}});
			$('input[name=imgExt]').click(function() {Psumbit();});
			$('#pp-dialog').submit(function(){Psumbit();return false;});
			function Psumbit() {var input = $('#pp-dialog input').val();if(input.match(/\.jpg$|\.png$/)) {imgCheck(input);} else {var Radio = $('input[name=imgExt]');var imgName = Radio.filter(':checked').val();if(input.match(/\/$/)){var Cpatch=input+imgName;}else{var Cpatch = input+'/'+imgName;}imgCheck(Cpatch);}}
		}		
	}
	function ppDialogL(l) {var msg ='Layot '+l+' not exists. pp-bg'+l+'.jpg/png';ppDialog(msg);Pltgh();}
	function imgCheck(Cpatch) {
		Pltgs();Pdtgh();
		$.ajax({url: Cpatch,type:'HEAD',cache:true,
		error: function(){$.cookie('NF',Cpatch);ppDialog(msgE);},
		success: function(){showImg(Cpatch);}});
	}
	function layotCheck(Cpatch,l) { 
		Pltgs();Pdtgh();		
		$.ajax({url: Cpatch,type:'HEAD', 
		error: function(){ ppDialogL(l);},
		success: function(){showImg(Cpatch);}});
	}
	function showImg(url) {
		if ($('.pp-bg').length > 0) { 
			$(".pp-bg").hide("slide", { direction: "left" }, 300);
			$(".pp-bg img").attr("src", url);
			$('.pp-bg img').load(function() {$('#pp-load').hide();$('.pp-bg').show("slide", { direction: "right" }, 300);});
			$.cookie('Cpatch', url);
		} else {
			$('body').before('<div class="pp-bg" style="opacity:0;height:'+dh+'px;overflow: hidden; width:100%; z-index: 9999999; position: absolute; top:0; left:0; display:'+Cdisplay+';"><div style="text-align: center;"><img style="position:relative; z-index: 99999999; top:'+Ctop+'; left:'+Cleft+';" src="'+ url +'"></div></div>');
			$.cookie('Cpatch', url);
			$('.pp-bg img').load(function() {Pltgh();Pdtgh();$('.pp-bg').animate({opacity: Copacity,},100);});				
			$('.pp-bg img').draggable({stop: function( event, ui ) {$.cookie('top', $(".pp-bg img").css("top"));$.cookie('left', $(".pp-bg img").css("left"));}});
		}		
	}	
	function toggleLayot(l){
		Cpatch = $.cookie('Cpatch');
		var reg = /(.*)\/(.*)\.jpg$/;
		var reg2 = /(.*)\/(.*)\.png$/;
		var jk; jk = Cpatch.match(reg);	
		if (Cpatch.search(reg) >= 0) {
			var jk; jk = Cpatch.match(reg);	
			Cpatch = jk[1] +'/pp-bg'+l+'.jpg';	
			layotCheck(Cpatch,l)
		} else if(Cpatch.search(reg2) >= 0) {
			var jk; jk = Cpatch.match(reg2);	
			Cpatch = jk[1] +'/pp-bg'+l+'.png';	
			layotCheck(Cpatch,l)
		} else {			
			ppDialogL(l);
		}			
	}	
	shortcut.add("Alt+1",function() {toggleLayot(1);return false;});
	shortcut.add("Alt+2",function() {toggleLayot(2);return false;});
	shortcut.add("Alt+3",function() {toggleLayot(3);return false;});
	shortcut.add("Alt+4",function() {toggleLayot(4);return false;});
	shortcut.add("Alt+5",function() {toggleLayot(5);return false;});
	shortcut.add("Alt+6",function() {toggleLayot(6);return false;});
	shortcut.add("Alt+7",function() {toggleLayot(7);return false;});
	shortcut.add("Alt+8",function() {toggleLayot(8);return false;});
	shortcut.add("Alt+9",function() {toggleLayot(9);return false;});
	shortcut.add("Alt+X",function() {toggleLayot('');return false;});
	shortcut.add("Alt+Z",function() {$('.pp-bg').toggleClass('pp-hidden'); $('.pp-bg').css('overflow','hidden');$('.pp-hidden').css('overflow','visible');return false;});
	shortcut.add("Alt+Q",function() {$('.pp-bg').toggle();if($('.pp-bg').is(":visible")) {$.cookie('display', 'block')} else {$.cookie('display', 'none')};return false;});	
	shortcut.add("Alt+W",function() {if($('.pp-bg').css('opacity') < 1) {$.cookie('PreOpacity', $('.pp-bg').css('opacity'));$('.pp-bg').fadeTo(1, 1);$.cookie('opacity', 1);} else {$('.pp-bg').fadeTo(1, $.cookie('PreOpacity'));$.cookie('opacity', $.cookie('PreOpacity'));}Copacity = $.cookie('opacity');return false;});	
	shortcut.add("Alt+E",function() {$('.pp-bg').animate({opacity: '+=0.1',},1, function() {$.cookie('opacity', $(".pp-bg").css("opacity"));Copacity = $.cookie('opacity');});return false;});
	shortcut.add("Alt+D",function() {$('.pp-bg').animate({opacity: '-=0.1',},1, function() {$.cookie('opacity', $(".pp-bg").css("opacity"));Copacity = $.cookie('opacity');});return false;});
	shortcut.add("Shift+E",function() {ppDialog(msg);return false;});
	shortcut.add("Shift+Q",function(){$('.pp-bg img').animate({top: '0',left: '0'},300);$.cookie('top', 0);$.cookie('left', 0);return false;});
	shortcut.add("Shift+A",function() {$('.pp-bg img').animate({left: '-=1',},1);$.cookie('left', $(".pp-bg img").css("left"));return false;});
	shortcut.add("Shift+D",function() {$('.pp-bg img').animate({left: '+=1',},1);$.cookie('left', $(".pp-bg img").css("left"));return false;});	
	shortcut.add("Shift+W",function() {$('.pp-bg img').animate({top: '-=1',},1);$.cookie('top', $(".pp-bg img").css("top"));return false;});
	shortcut.add("Shift+S",function() {$('.pp-bg img').animate({top: '+=1',},1);$.cookie('top', $(".pp-bg img").css("top"));return false;});
});
});
});
});
})(jQuery);
    } else {
		var script = document.createElement('script');
		script.src = '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
		script.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(script);
        window.setTimeout(waitJQ, 1000);
    }
};
jqueryIs();