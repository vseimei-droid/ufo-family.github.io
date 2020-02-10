 
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
      el.html("<span class=\"t142__text\">" + btntext + "</span>");
    }
  }
} 
function t190_scrollToTop(){
    $('html, body').animate({scrollTop: 0}, 700);								
}	  
 
function t229_highlight(recid){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t229__list_item a[href='"+url+"']").addClass("t-active");
  $(".t229__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t229__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t229__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t229__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t229__list_item a[href='/"+pathname+"/']").addClass("t-active");
}


function t229_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t229_navLinks = $("#rec" + recid + " .t229__list_item a:not(.tooltipstered)[href*='#']");
        if (t229_navLinks.length > 0) {
            t229_catchScroll(t229_navLinks);
        }
    }
}

function t229_catchScroll(t229_navLinks) {
    var t229_clickedSectionId = null,
        t229_sections = new Array(),
        t229_sectionIdTonavigationLink = [],
        t229_interval = 100,
        t229_lastCall, t229_timeoutId;
    t229_navLinks = $(t229_navLinks.get().reverse());
    t229_navLinks.each(function() {
        var t229_cursection = t229_getSectionByHref($(this));
        if (typeof t229_cursection.attr("id") != "undefined") {
            t229_sections.push(t229_cursection);
        }
        t229_sectionIdTonavigationLink[t229_cursection.attr("id")] = $(this);
    });
		t229_updateSectionsOffsets(t229_sections);
    t229_sections.sort(function(a, b) {
      return b.attr("data-offset-top") - a.attr("data-offset-top");
    });
		$(window).bind('resize', t_throttle(function(){t229_updateSectionsOffsets(t229_sections);}, 200));
		$('.t229').bind('displayChanged',function(){t229_updateSectionsOffsets(t229_sections);});
		setInterval(function(){t229_updateSectionsOffsets(t229_sections);},5000);
    t229_highlightNavLinks(t229_navLinks, t229_sections, t229_sectionIdTonavigationLink, t229_clickedSectionId);

    t229_navLinks.click(function() {
        var t229_clickedSection = t229_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof t229_clickedSection.attr("id") != "undefined") {
            t229_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t229_clickedSectionId = t229_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function() {
        var t229_now = new Date().getTime();
        if (t229_lastCall && t229_now < (t229_lastCall + t229_interval)) {
            clearTimeout(t229_timeoutId);
            t229_timeoutId = setTimeout(function() {
                t229_lastCall = t229_now;
                t229_clickedSectionId = t229_highlightNavLinks(t229_navLinks, t229_sections, t229_sectionIdTonavigationLink, t229_clickedSectionId);
            }, t229_interval - (t229_now - t229_lastCall));
        } else {
            t229_lastCall = t229_now;
            t229_clickedSectionId = t229_highlightNavLinks(t229_navLinks, t229_sections, t229_sectionIdTonavigationLink, t229_clickedSectionId);
        }
    });
}


function t229_updateSectionsOffsets(sections){
	$(sections).each(function(){
		var t229_curSection = $(this);
		t229_curSection.attr("data-offset-top",t229_curSection.offset().top);
	});
}


function t229_getSectionByHref(curlink) {
    var t229_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (t229_curLinkValue[0]=='/') { t229_curLinkValue = t229_curLinkValue.substring(1); }
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t229_curLinkValue.substring(1) + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t229_curLinkValue.substring(1) + "']");
    }
}

function t229_highlightNavLinks(t229_navLinks, t229_sections, t229_sectionIdTonavigationLink, t229_clickedSectionId) {
    var t229_scrollPosition = $(window).scrollTop(),
        t229_valueToReturn = t229_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t229_sections.length != 0 && t229_clickedSectionId == null && t229_sections[t229_sections.length-1].attr("data-offset-top") > (t229_scrollPosition + 300)){
      t229_navLinks.removeClass('t-active');
      return null;
    }

    $(t229_sections).each(function(e) {
        var t229_curSection = $(this),
            t229_sectionTop = t229_curSection.attr("data-offset-top"),
            t229_id = t229_curSection.attr('id'),
            t229_navLink = t229_sectionIdTonavigationLink[t229_id];
        if (((t229_scrollPosition + 300) >= t229_sectionTop) || (t229_sections[0].attr("id") == t229_id && t229_scrollPosition >= $(document).height() - $(window).height())) {
            if (t229_clickedSectionId == null && !t229_navLink.hasClass('t-active')) {
                t229_navLinks.removeClass('t-active');
                t229_navLink.addClass('t-active');
                t229_valueToReturn = null;
            } else {
                if (t229_clickedSectionId != null && t229_id == t229_clickedSectionId) {
                    t229_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t229_valueToReturn;
}

function t229_setPath(pageid){
}

function t229_setBg(recid){
      var window_width=$(window).width();
      if(window_width>980){
          $(".t229").each(function() {
          	 var el=$(this);
             if(el.attr('data-bgcolor-setbyscript')=="yes"){
	             var bgcolor=el.attr("data-bgcolor-rgba");
	             el.css("background-color",bgcolor);             
             }
          });
      }else{
          $(".t229").each(function() {
             var el=$(this);
             var bgcolor=el.attr("data-bgcolor-hex");
             el.css("background-color",bgcolor);
             el.attr("data-bgcolor-setbyscript","yes");
		  });
      }
  }

function t229_appearMenu(recid) {
        var window_width=$(window).width();
        if(window_width>980){
	         $("#rec"+recid+" .t229").each(function() {
					var el=$(this);
					var appearoffset=el.attr("data-appearoffset");
					if(appearoffset!=""){
			                if(appearoffset.indexOf('vh') > -1){
				                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
			                }
					
							appearoffset=parseInt(appearoffset, 10);
		
							if ($(window).scrollTop() >= appearoffset) {
							  if(el.css('visibility') == 'hidden'){
								  el.finish();
								  el.css("top","-50px");	
								  el.css("visibility","visible");
								  el.animate({"opacity": "1","top": "0px"}, 200,function() {
								  });	  	  
							  }
							}else{
							  el.stop();
							  el.css("visibility","hidden");
							}
					}
	         });
        }
    
    }


function t229_changeBgOpacityMenu(recid) {
        var window_width=$(window).width();
        if(window_width>980){
	         $(".t229").each(function() {
					var el=$(this);
					var bgcolor=el.attr("data-bgcolor-rgba");
					var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
					if ($(window).scrollTop() > 20) {
						el.css("background-color",bgcolor_afterscroll);
					}else{
						el.css("background-color",bgcolor);
					}
	         });
        }
    
    } 
function t282_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t282__burger, .t282__menu__item:not(".tooltipstered"):not(".t282__menu__item_submenu"), .t282__overlay').click(function(){
    if ($(this).is(".t282__menu__item.tooltipstered, .t794__tm-link")) { return; }  
    $('body').toggleClass('t282_opened');
    el.find('.t282__menu__container, .t282__overlay').toggleClass('t282__closed');
    el.find(".t282__menu__container").css({'top':(el.find(".t282__container").height()+'px')});
  });
  $('.t282').bind('clickedAnchorInTooltipMenu',function(){
    $('body').removeClass('t282_opened');
    $('#rec'+recid+' .t282__menu__container, #rec'+recid+' .t282__overlay').addClass('t282__closed');
  });  
}

function t282_changeSize(recid){
  var el=$("#rec"+recid);
  var bottomheight = el.find(".t282__menu__container");
  var headerheight = el.find(".t282__container");
  var menu = bottomheight.height() + headerheight.height();
  var win = $(window).height();
  if (menu > win ) {
    $("#nav"+recid).addClass('t282__menu_static');
  }
  else {
    $("#nav"+recid).removeClass('t282__menu_static');
  }
}

function t282_changeBgOpacityMenu(recid) {
 var window_width=$(window).width();
 var record = $("#rec"+recid);
 record.find(".t282__container__bg").each(function() {
    var el=$(this);
    var bgcolor=el.attr("data-bgcolor-rgba");
    var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
    var bgopacity=el.attr("data-bgopacity");
    var bgopacity_afterscroll=el.attr("data-bgopacity2");
    var menu_shadow=el.attr("data-menu-shadow");
    if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
          el.css('box-shadow',menu_shadow);
        } else {
          el.css('box-shadow','none');
        }
    }else{
        el.css("background-color",bgcolor);
        if (bgopacity != "0" && bgopacity != "0.0") {
          el.css('box-shadow',menu_shadow);
        } else {
          el.css('box-shadow','none');
        }
    }
 });
}

function t282_highlight(recid){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t282__menu a[href='"+url+"']").addClass("t-active");
  $(".t282__menu a[href='"+url+"/']").addClass("t-active");
  $(".t282__menu a[href='"+pathname+"']").addClass("t-active");
  $(".t282__menu a[href='/"+pathname+"']").addClass("t-active");
  $(".t282__menu a[href='"+pathname+"/']").addClass("t-active");
  $(".t282__menu a[href='/"+pathname+"/']").addClass("t-active");
}

function t282_appearMenu(recid) {
      var window_width=$(window).width();
           $(".t282").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");  
                                el.css("visibility","visible");
                                el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                });       
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });

}

 
function t347_setHeight(recid){
  var el=$('#rec'+recid);
  var div = el.find(".t347__table");
  var height=div.width() * 0.5625;
  div.height(height);
}

window.t347showvideo = function(recid){
    $(document).ready(function(){
        var el = $('#rec'+recid);
        var videourl = '';

        var youtubeid=$("#rec"+recid+" .t347__video-container").attr('data-content-popup-video-url-youtube');
        if(youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid;
        }

        $("#rec"+recid+" .t347__video-container").removeClass( "t347__hidden");
        $("#rec"+recid+" .t347__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t347__iframe\" width=\"100%\" height=\"100%\" src=\"" + videourl + "?autoplay=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe>");
    });
}

window.t347hidevideo = function(recid){
    $(document).ready(function(){
        $("#rec"+recid+" .t347__video-container").addClass( "t347__hidden");
        $("#rec"+recid+" .t347__video-carier").html("");
    });
} 

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).load(function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww=$(window).width();window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww=$(window).width();var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */window.tn.window_height = parseInt($(window).height());if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).load();}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided — hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;if (winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');} 
 
t431_createTable = function(recid,tablehead,tabledata,tablecolsize,hastargetblank,btnstyles,t431__tdstyles,t431__thstyles,t431__oddrowstyles,t431__evenrowstyles){
	var t431__arrayColSize = t431_parseData(tablecolsize);
	var t431__arrayHead = t431_parseData(tablehead);
    var t431__arrayData = t431_parseData(tabledata);

	var t431__maxcolnumber = t431__findMaxRowLengthInTable(t431__arrayHead,t431__arrayData);
	var t431__colWidth = t431__setColumnsWidth(t431__arrayColSize,t431__maxcolnumber,recid);
	if (t431__colWidth[0].myText && t431__colWidth[0].myText[t431__colWidth[0].myText.length - 1] == "%") {
		for (var i=0; i<t431__colWidth.length; i++) {
			t431__colWidth[i].myText = t431__colWidth[i].myText.slice(0,-1);
			t431__colWidth[i].myText += "vw";
		}
	}

	var t431__container = $('#rec'+recid+' .t431 .t-container .t431__table');
	var t431__htmlTable = "";
	if (t431__arrayHead) { t431__htmlTable += t431__generateHtml(recid,t431__arrayHead,"th",hastargetblank,t431__colWidth,btnstyles,t431__thstyles,null,null,t431__maxcolnumber);}
	t431__container.append(t431__htmlTable);
	t431__htmlTable = "";
	if (t431__arrayData) { t431__htmlTable += t431__generateHtml(recid,t431__arrayData,"td",hastargetblank,t431__colWidth,btnstyles,t431__tdstyles,t431__oddrowstyles,t431__evenrowstyles,t431__maxcolnumber);}
    t431__container.append(t431__htmlTable);
};


/*add display:block to thead and tbody for vertical scroll, set th width to fix unequal col width*/
t431_setHeadWidth = function(recid) {
	if ($(window).width()>960){
        var t431__tbody = $('#rec'+recid+' .t431 .t431__tbody');
        var t431__thead = $('#rec'+recid+' .t431 .t431__thead');
		t431__tbody.css("display","block");
		t431__thead.css("display","block");

		var t431__colWidth = $('#rec'+recid+' .t431 .t431__tbody tr:first').children().map(function() {
            return $(this).width();
        });

		if($('#rec'+recid+' .t431 .t431__tbody tr td:first').css('border-left-width').length>=3) {
			var t431__verticalborder = $('#rec'+recid+' .t431 .t431__tbody tr td:first').css('border-left-width').slice(0,-2);
		}

        $('#rec'+recid+' .t431 .t431__thead tr').children().each(function(i, v) {
            if ($(v).is(":last-child")) {
                $(v).width(t431__colWidth[i] + (t431__tbody.width() - $('#rec'+recid+' .t431 .t431__tbody tr:first').width()));
            } else {
                $(v).width(t431__colWidth[i] + (+t431__verticalborder));
            }
        });
	}
};


t431__findMaxRowLengthInTable = function(arrayhead, arraydata) {
	var t431__headmaxlength = 0;
	var t431__datamaxlength = 0;
	if (arrayhead) {
		t431__headmaxlength = t431__findMaxRowLengInArray(arrayhead);
	}
	if (arraydata) {
		t431__datamaxlength = t431__findMaxRowLengInArray(arraydata);
	}
	if (t431__datamaxlength>t431__headmaxlength) {
		return t431__datamaxlength;
	} else {
		return t431__headmaxlength;
	}
};


t431__findMaxRowLengInArray = function(curarray) {
	var t431__maxlength = 0;
	for (var i=0; i<curarray.length; i++) {
		if (curarray[i].length>t431__maxlength) {
			t431__maxlength = curarray[i].length;
		}
	}
	return t431__maxlength;
};


t431__setColumnsWidth = function(t431__colwidth,t431__colsnumber,recid) {
		if (t431__colwidth) {
			return t431__colwidth[0];
		}	else {
			var t431__tablewidth = $('#rec'+recid+' .t431 .t-container .t-col').width();
			return (t431__tablewidth/t431__colsnumber + "px");
		}
};


t431__generateHtml = function(recid,arrayValues,coltag,hastargetblank,colWidth,btnstyles,colstyles,oddrowstyles,evenrowstyles,maxcolnumber) {
	var t431__htmlpart = "";


	if (coltag == "td") {
		var t431__theadorbodytag = "tbody";
	} else {
		var t431__theadorbodytag = "thead";
	}
	t431__htmlpart += "<" + t431__theadorbodytag + " class=\"t431__" + t431__theadorbodytag + "\">";

	//remove forst body row top border, if table head has bottom border
	if($('#rec'+recid+' .t431 .t-container .t431__thead th').length>0 && $('#rec'+recid+' .t431 .t-container .t431__thead th').css("border-bottom-width")[0]!="0") {
		var t431__firstbodyrowstyle = "border-top: 0 !important;";
	}

	for (var i=0; i<arrayValues.length; i++) {

		//add classes for striped table
		if (coltag == "td") {
			if ((i + 1) % 2 > 0) {
				t431__htmlpart += "<tr class=\"t431__oddrow\"" + "style=\"" + oddrowstyles + "\">";
			} else { t431__htmlpart += "<tr class=\"t431__evenrow\"" + "style=\"" + evenrowstyles + "\">";}
		} else {
			t431__htmlpart += "<tr>";
		}

		var t431__addingcols = 0;
		if (arrayValues[i].length<maxcolnumber) {
			t431__addingcols = maxcolnumber - arrayValues[i].length;
        }
		for (var j=0; j<(arrayValues[i].length + t431__addingcols); j++) {
			if (arrayValues[i][j]) {
				//define col width
                if(Array.isArray(colWidth) && colWidth[j]) {
                    var t431__curWidth = colWidth[j].myText;
                } else { var t431__curWidth = colWidth;}

				 if (i==0 && coltag=="td") {
					var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + t431__firstbodyrowstyle + "\">";
				} else {
					var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">";
				}

                if (arrayValues[i][j].myHref) {
                    var t431__tblank = "";
                    if (hastargetblank) {var t431__tblank = "target=\"_blank\"";}
                    //define link type
                    if (arrayValues[i][j].myHrefType == "link") {
                        var t431__linkwithattr = "<a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + ">";
                        var t431__linkclosetag = "</a>";
                    } else {
                        var t431__linkwithattr = "<div class=\"t431__btnwrapper\"><a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + " class=\"t-btn t-btn_sm\" style=\"" + btnstyles + "\"><table style=\"width:100%; height:100%;\"><tr><td>";
                        var t431__linkclosetag = "</td></tr></table></a></div>";
                    }
                    t431__htmlpart += t431__colwithattr + t431__linkwithattr + arrayValues[i][j].myText + t431__linkclosetag + "</" + coltag + ">";
                } else {
                    t431__htmlpart += t431__colwithattr + arrayValues[i][j].myText + "</" + coltag + ">";
                }
			} else {
					t431__htmlpart += "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">" + "</" + coltag + ">";
			}
		}
		t431__htmlpart += "</tr>";
	}
	t431__htmlpart += "</" + t431__theadorbodytag + ">";
	return t431__htmlpart;
};


t431_parseData = function(t431__data) {
  if (t431__data!="" && typeof t431__data!='undefined')
  {
	t431__data = t431__addBrTag(t431__data);
    var t431__arrayTable = new Array();
    var t431__arrayRow = new Array();
    var t431__curItem = {myText:"", myHref:"", myHrefType:""};
	var t431__HasLink = "";
	var t431__HasLinkWithSpace = "";
    var t431__HasBtn = "";
	var t431__HasBtnWithSpace = "";
	var t431__EndOfLine = "";
    for (var i=0; i<t431__data.length; i++)
    {
	  //col end and check of special symbols: «>», «<» and «&»
      if (t431__data[i] == ";" && !((t431__data[i-1]&&(t431__data[i-1]=="t")) && (t431__data[i-2]&&(t431__data[i-2]=="g" || t431__data[i-2]=="l")) && (t431__data[i-3]&&(t431__data[i-3]=="&"))) && !((t431__data[i-1]&&(t431__data[i-1]=="p")) && (t431__data[i-2]&&(t431__data[i-2]=="m")) && (t431__data[i-3]&&(t431__data[i-3]=="a")) && (t431__data[i-4]&&(t431__data[i-4]=="&")))) {
          t431__arrayRow.push(t431__curItem);
          var t431__curItem = {myText:"", myHref:""};
          t431__HasLink = "";
          t431__HasLinkWithSpace = "";
          t431__HasBtn = "";
          t431__HasBtnWithSpace = "";
      } else {
        if(t431__HasLink == "link=" || t431__HasLinkWithSpace == " link=" || t431__HasBtn == "button=" || t431__HasBtnWithSpace == " button=") {
		  if (t431__curItem.myHref=="" && t431__HasLink == "link=") {
			t431__curItem.myText = t431__curItem.myText.slice(0,-5);
			t431__curItem.myHrefType = "link";
		  } else { if (t431__curItem.myHref=="" && t431__HasLinkWithSpace == " link=") {
			t431__curItem.myText = t431__curItem.myText.slice(0,-6);
            t431__curItem.myHrefType = "link";
		  } else {if (t431__curItem.myHref=="" && t431__HasBtn == "button=") {
			t431__curItem.myText = t431__curItem.myText.slice(0,-7);
			t431__curItem.myHrefType = "btn";
		  } else { if (t431__curItem.myHref=="" && t431__HasBtnWithSpace == " button=") {
			t431__curItem.myText = t431__curItem.myText.slice(0,-8);
			t431__curItem.myHrefType = "btn";
		  }}}}
		  t431__curItem.myHref += (t431__data[i]);
		} else {
		  t431__curItem.myText += (t431__data[i]);
		  t431__HasLink = t431__checkSubstr("link=",t431__HasLink,t431__data[i]);
		  t431__HasLinkWithSpace = t431__checkSubstr(" link=",t431__HasLinkWithSpace,t431__data[i]);
		  t431__HasBtn = t431__checkSubstr("button=",t431__HasBtn,t431__data[i]);
		  t431__HasBtnWithSpace = t431__checkSubstr(" button=",t431__HasBtnWithSpace,t431__data[i]);
		}
		t431__EndOfLine = t431__checkSubstr("<br />",t431__EndOfLine,t431__data[i]);
        if (t431__EndOfLine == "<br />") {
          if (t431__curItem.myHref) {
			t431__curItem.myHref = t431__curItem.myHref.slice(0,-6);
		  } else {
			t431__curItem.myText = t431__curItem.myText.slice(0,-6);
		  }
          t431__arrayRow.push(t431__curItem);
          t431__arrayTable.push(t431__arrayRow);
          var t431__curItem = {myText:"", myHref:""};
		  t431__HasLink = "";
		  t431__HasLinkWithSpace = "";
		  t431__HasBtn = "";
		  t431__HasBtnWithSpace = "";
          t431__arrayRow = new Array();
        }
      }
    }
	if (t431__arrayRow.length > 0 || t431__curItem.myText!="") {
		if (t431__curItem!="") {
			t431__arrayRow.push(t431__curItem);
		}
		t431__arrayTable.push(t431__arrayRow);
	}
  }
  return t431__arrayTable;
};


// checking a step by step combining of t431__targetSubstr
t431__checkSubstr = function(t431__targetSubstr,t431__curSubstr,t431__curSymbol){
	if (!t431__curSubstr && t431__curSymbol == t431__targetSubstr[0]) {
    return t431__curSymbol;
  } else {
    if (t431__curSubstr) {
		for (var i=0; i<(t431__targetSubstr.length-1); i++) {
			if (t431__curSubstr[t431__curSubstr.length - 1] == t431__targetSubstr[i] && t431__curSymbol == t431__targetSubstr[i+1]) {
				return (t431__curSubstr += t431__curSymbol);
            }
        }
    }
  }
};


t431__addBrTag = function(t431__oldStringItem){
	if(typeof t431__oldStringItem=='undefined')return;
	var t431__newStringItem = "";
	for (var i=0; i < t431__oldStringItem.length; i++) {
		if (t431__oldStringItem[i] == "\n" || t431__oldStringItem[i] == "\r") {
			t431__newStringItem += "<br />";
		} else {
			t431__newStringItem += t431__oldStringItem[i];
		}
	}
	return t431__newStringItem;
};
 
function t452_scrollToTop(){
  $('html, body').animate({scrollTop: 0}, 700);								
}	  
function t599_init(recid){
  var el = $('#rec'+recid);

  if (el.find('.t599__title').length) {
    t599_equalHeight(el.find('.t599__title'));
  }
  if (el.find('.t599__descr').length) {
    t599_equalHeight(el.find('.t599__descr'));
  }
  if (el.find('.t599__price').length) {
    t599_equalHeight(el.find('.t599__price'));
  }
  if (el.find('.t599__subtitle').length) {
    t599_equalHeight(el.find('.t599__subtitle'));
  }
};

function t599_equalHeight(element) {
  var highestBox = 0;

  element.css('height','');

  element.each(function(){
    if($(this).height() > highestBox)highestBox = $(this).height(); 
  });

  if($(window).width()>=960){
      element.css('height', highestBox); 
  }else{
     element.css('height', '');    
  }
} 
function t607_init(recid) {
	t607_checkAnchorLinks(recid);
}


function t607_checkAnchorLinks(recid) {
	if($(window).width()>=960) {
	  var t607_navLinks = $("#rec"+recid+" .t607__list_item a:not(.tooltipstered)[href*='#']");
      if (t607_navLinks.length>0){
      	t607_catchScroll(t607_navLinks);
      };
	}
}


function t607_catchScroll(t607_navLinks) {
    var t607_clickedSectionId = null,
      t607_sections = new Array(),
      t607_sectionIdTonavigationLink = {},
      t607_interval = 100,
      t607_lastCall,
      t607_timeoutId;
	t607_navLinks = $(t607_navLinks.get().reverse());
	t607_navLinks.each(function(){
		var t607_cursection = t607_getSectionByHref($(this));
		if (typeof t607_cursection.attr("id") != "undefined") { t607_sections.push(t607_cursection); }
		t607_sectionIdTonavigationLink[t607_cursection.attr("id")] = $(this);
	});
	t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
	setTimeout(function() { t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId); }, 1000);

	$(document).keydown(function(e) {
		var t607_direction = "";
		switch(e.which) {
				case 38: t607_direction = "top"; break;
				case 40: t607_direction = "bottom"; break;
				case 33: t607_direction = "top"; break;
				case 34: t607_direction = "bottom"; break;
				default: return;
		}
		if (t607_direction!="") {
			var t607_curActiveSectionId = t607_getSectionByHref(t607_navLinks.filter(".t-active")).attr("id"),
			 		t607_newActiveSectionIndex = $.map(t607_sections, function(obj, index) {
			    if(obj.attr("id") == t607_curActiveSectionId && t607_direction == "top") { return index + 1; }
					if(obj.attr("id") == t607_curActiveSectionId && t607_direction == "bottom") { return index - 1; }
			});
			var t607_newActiveSection = t607_sections[t607_newActiveSectionIndex[0]];
			if (typeof t607_newActiveSection == "undefined") { return; }

			t607_navLinks.removeClass('t-active');
			var	$root = $('html, body'),
					t607_offsetTop = $(".t607").attr("data-offset-top");
			t607_sectionIdTonavigationLink[t607_newActiveSection.attr("id")].addClass('t-active');
			t607_clickedSectionId = t607_newActiveSection.attr("id");
			if (typeof t607_offsetTop!="undefined") { $root.animate({ scrollTop: t607_newActiveSection.offset().top - t607_offsetTop}, 500); }
			else { $root.animate({ scrollTop: t607_newActiveSection.offset().top}, 500); }
		}
	});

	t607_navLinks.click(function() {
		if (!$(this).hasClass("tooltipstered")) {
		  t607_navLinks.removeClass('t-active');
			var t607_clickedSection = t607_getSectionByHref($(this)),
					$root = $('html, body'),
					t607_offsetTop = $(".t607").attr("data-offset-top");
		  if (!$(this).hasClass("t-active")) { t607_clickedSectionId = t607_clickedSection.attr("id"); }
          t607_sectionIdTonavigationLink[t607_clickedSection.attr("id")].addClass('t-active');          
          if (typeof t607_offsetTop!="undefined") { $root.animate({ scrollTop: t607_clickedSection.offset().top - t607_offsetTop}, 500); }
          else { $root.animate({ scrollTop: t607_clickedSection.offset().top}, 500); }
          return false;
		}
  	});

	$(window).scroll( function() {
		var t607_now = new Date().getTime();
		if (t607_lastCall && t607_now < (t607_lastCall + t607_interval) ) {
				clearTimeout(t607_timeoutId);
				t607_timeoutId = setTimeout(function () {
						t607_lastCall = t607_now;
						t607_clickedSectionId = t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
				}, t607_interval - (t607_now - t607_lastCall) );
		} else {
				t607_lastCall = t607_now;
				t607_clickedSectionId = t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
		}
	});
}


function t607_getSectionByHref (curlink) {
  var t651_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
  if (curlink.is('[href*="#rec"]')) {
      return $(".r[id='" + t651_curLinkValue.substring(1) + "']");
  } else {
      return $(".r[data-record-type='215']").has("a[name='" + t651_curLinkValue.substring(1) + "']");
  }
}


function t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId) {
	var t607_scrollPosition = $(window).scrollTop(),
		t607_valueToReturn = t607_clickedSectionId;

	/*if the first section is too small*/
	if (typeof t607_sections[t607_sections.length-2]!="undefined" && t607_sections[t607_sections.length-2].offset().top <= $(window).height()/2 && t607_scrollPosition == 0) {
		t607_navLinks.removeClass('t-active');
		t607_navLink = t607_sectionIdTonavigationLink[t607_sections[t607_sections.length-1].attr("id")];
		t607_navLink.addClass('t-active');
		return null;
	}

	$(t607_sections).each(function(e) {
			var t607_curSection = $(this),
					t607_sectionTop = t607_curSection.offset().top,
					t607_id = t607_curSection.attr('id'),
					t607_navLink = t607_sectionIdTonavigationLink[t607_id];
			if ((t607_scrollPosition + $(window).height()/2) >= t607_sectionTop || (t607_sections[0].attr("id") == t607_id && $(window).scrollTop() >= $(document).height() - $(window).height())) {
				if (t607_clickedSectionId == null && !t607_navLink.hasClass('t-active')) {					
					t607_navLinks.removeClass('t-active');
					t607_navLink.addClass('t-active');
					t607_valueToReturn = null;
				} else {
					if (t607_clickedSectionId != null && t607_id == t607_clickedSectionId) {
						t607_valueToReturn = null;
					}
				}
				return false;
			}
	});
	return t607_valueToReturn;
}
 
function t674_init(recid){
  $("#rec"+recid+" .t674__img-holder").on('load', function() {
    $("body").addClass("t674__body_with-bg");
  }).each(function() {
    if(this.complete) $(this).load();
  });
}
 
function t706_onSuccessCallback(t706_form){
 /*if (typeof localStorage === 'object') {
	try {
	  localStorage.removeItem("tcart");
	} catch (e) {
	  console.log('Your web browser does not support localStorage.');
	}
 }		
 delete window.tcart;
 tcart__loadLocalObj();*/
 $( ".t706__cartwin-products" ).slideUp( 10, function() {	
 });
 $( ".t706__cartwin-bottom" ).slideUp( 10, function() {	
 });
 $( ".t706 .t-form__inputsbox" ).slideUp( 700, function() {	
 });
 /*window.tcart_success='yes';*/
 try {
	/*fix IOS11 cursor bug + general IOS background scroll*/
	tcart__unlockScroll();
 } catch (e) {}
} 
function t764_updateSlider(recid){
  var el=$('#rec'+recid);
  t_slds_SliderWidth(recid);
  sliderWrapper = el.find('.t-slds__items-wrapper');
  sliderWidth = el.find('.t-slds__container').width();
  pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
  sliderWrapper.css({
      transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
  });
  t_slds_UpdateSliderHeight(recid);
  t_slds_UpdateSliderArrowsHeight(recid);
} 
function t778__init(recid){
  t778_unifyHeights(recid);
  $(window).load(function(){
    t778_unifyHeights(recid);
  });  

  $(window).bind('resize', t_throttle(function(){t778_unifyHeights(recid)}, 200));

  $(".t778").bind("displayChanged",function(){
      t778_unifyHeights(recid);
  });

  setTimeout(function(){
    t_prod__init(recid);
    t778_initPopup(recid);
    t778__updateLazyLoad(recid);
  }, 500);
}

function t778__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t778__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}

function t778_unifyHeights(recid){
    var t778_el = $('#rec'+recid),
        t778_blocksPerRow = t778_el.find(".t778__container").attr("data-blocks-per-row"),
        t778_cols = t778_el.find(".t778__content"),
		t778_mobScroll = t778_el.find(".t778__scroll-icon-wrapper").length;

	if($(window).width()<=480 && t778_mobScroll==0){
		t778_cols.css("height","auto");
		return;
	}

   	var t778_perRow = +t778_blocksPerRow;	
	if ($(window).width()<=960 && t778_mobScroll>0) {var t778_perRow = t778_cols.length;}
	else { if ($(window).width()<=960) {var t778_perRow = 2;} }

	for( var i = 0; i < t778_cols.length; i +=t778_perRow ){
		var t778_maxHeight = 0,
			t778_row = t778_cols.slice(i, i + t778_perRow);		
		t778_row.each(function(){
          var t778_curText = $(this).find(".t778__textwrapper"),
              t778_curBtns = $(this).find(".t778__btn-wrapper_absolute"),
              t778_itemHeight = t778_curText.outerHeight() + t778_curBtns.outerHeight();		  
          if ( t778_itemHeight > t778_maxHeight ) { t778_maxHeight = t778_itemHeight; }
		});
		t778_row.css( "height", t778_maxHeight );
	}
}


function t778_initPopup(recid){
  var rec=$('#rec'+recid); 
  rec.find('[href^="#prodpopup"]').one( "click", function(e) {
      e.preventDefault();	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  t_sldsInit(recid+' #t778__product-' + lid_prod + '');
  });
  rec.find('[href^="#prodpopup"]').click(function(e){	
      e.preventDefault();
      t778_showPopup(recid);	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  el_popup.find('.js-product').css('display','none');
	  var el_fullprod=el_popup.find('.js-product[data-product-lid="'+lid_prod+'"]')
	  el_fullprod.css('display','block');
	  
    var analitics=el_popup.attr('data-track-popup');
    if (analitics > '') {
        var virtTitle = el_fullprod.find('.js-product-name').text();
        if (! virtTitle) {
            virtTitle = 'prod'+lid_prod;
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
    }

	  var curUrl = window.location.href;
      if (curUrl.indexOf('#!/tproduct/')<0 && curUrl.indexOf('%23!/tproduct/')<0) {
        if (typeof history.replaceState!='undefined'){
          window.history.replaceState('','',window.location.href+'#!/tproduct/'+recid+'-'+lid_prod);
        }
      }	
      t778_updateSlider(recid+' #t778__product-' + lid_prod + '');
      if(window.lazy=='y'){t_lazyload_update();}
  });
  if ($('#record'+recid).length==0){ t778_checkUrl(recid); }
  t778_copyTypography(recid);
}

function t778_checkUrl(recid){
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex<0){ tprodIndex = curUrl.indexOf('%23!/tproduct/'); }
  if (tprodIndex>=0){
    var curUrl = curUrl.substring(tprodIndex,curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf('-')+1,curUrl.length);
    var rec=$('#rec'+recid);
    if (curUrl.indexOf(recid)>=0 && rec.find('[data-product-lid='+curProdLid+']').length) {
  	  rec.find('[data-product-lid='+curProdLid+'] [href^="#prodpopup"]').triggerHandler('click');
    }
  }
}

function t778_updateSlider(recid) {
    var el=$('#rec'+recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid);
}

function t778_showPopup(recid){
  var el=$('#rec'+recid);
  var popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    if(window.lazy=='y'){t_lazyload_update();}
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) {
      t778_closePopup();
    }
  });

  el.find('.t-popup__close, .t778__close-text').click(function(e){
    t778_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t778_closePopup();
    }
  });
}

function t778_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  var curUrl=window.location.href;
  var indexToRemove=curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove<0){ indexToRemove=curUrl.indexOf('%23!/tproduct/'); }
  curUrl=curUrl.substring(0,indexToRemove);	
  setTimeout(function() {
    $(".t-popup").scrollTop(0);  
    $('.t-popup').not('.t-popup_show').css('display', 'none');
	if (typeof history.replaceState!='undefined'){
      window.history.replaceState('','',curUrl);
    }                                                                        	
  }, 300);
}

function t778_removeSizeStyles(styleStr){
	if(typeof styleStr!="undefined" && (styleStr.indexOf('font-size')>=0 || styleStr.indexOf('padding-top')>=0 || styleStr.indexOf('padding-bottom')>=0)){
		var styleStrSplitted = styleStr.split(';');
		styleStr = "";
		for (var i=0;i<styleStrSplitted.length;i++){
			if(styleStrSplitted[i].indexOf('font-size')>=0 || styleStrSplitted[i].indexOf('padding-top')>=0 || styleStrSplitted[i].indexOf('padding-bottom')>=0){
				styleStrSplitted.splice(i,1); i--; continue;
			}			
			if(styleStrSplitted[i]==""){continue;}
			styleStr+=styleStrSplitted[i]+";";
		}
	}
	return styleStr;
}

function t778_copyTypography(recid){
  var rec=$('#rec'+recid);
  var titleStyle=rec.find('.t778__title').attr('style');
	var descrStyle=rec.find('.t778__descr').attr('style');
	rec.find('.t-popup .t778__title').attr("style",t778_removeSizeStyles(titleStyle));
	rec.find('.t-popup .t778__descr, .t-popup .t778__text').attr("style",t778_removeSizeStyles(descrStyle));
} 
$btnpaysubmit = false;

/* new block */
$(document).ready(function(){

    window.tildaGetPaymentForm = function (price, product, paysystem, blockid) {
        var $allrecords = $('#allrecords');
        var formnexturl = 'htt'+'ps://forms.tildacdn'+'.com/payment/next/';
        var virtPage = '/tilda/'+blockid+'/payment/';
        var virtTitle = 'Go to payment from '+blockid;

        if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
            Tilda.sendEventToStatistics(virtPage, virtTitle, product, price);
        }

        $.ajax ({
            type: "POST",
            url: formnexturl /*$(this).attr('action')*/,
            data: {
                projectid: $allrecords.data('tilda-project-id'),
                formskey: $allrecords.data('tilda-formskey'),
                price: price,
                product: product,
                system: paysystem
            },
            dataType : "json",
            success: function(json){
                $btnpaysubmit.removeClass('t-btn_sending');
                tildaBtnPaySubmit = '0';
                
                /* если нужно переслать данные дальше, в платежную систему */
                if (json && json.next && json.next.type > '') {
                    var res = window.tildaForm.payment($('#'+blockid), json.next);
                    successurl = '';
                    return false;
                }
                
            },
            fail: function(error){
                var txt;
                $btnpaysubmit.removeClass('t-btn_sending');
                tildaBtnPaySubmit = '0';

                if (error && error.responseText>'') {
                    txt = error.responseText+'. Please, try again later.';
                } else {
                    if (error && error.statusText) {
                        txt = 'Error ['+error.statusText+']. Please, try again later.';
                    }else {
                        txt = 'Unknown error. Please, try again later.';
                    }
                }
                alert(txt);
            },
            timeout: 10*1000
        });
        
    };
    
    if (typeof tcart__cleanPrice == 'undefined') {
        function tcart__cleanPrice (price) {
            if (typeof price=='undefined' || price=='' || price==0) {
                price=0;
            } else {
                price = price.replace(',','.');
                price = price.replace(/[^0-9\.]/g,'');
                price = parseFloat(price).toFixed(2);
                if(isNaN(price)) { price=0; }
                price = parseFloat(price);
                price = price*1;
                if (price<0) { price=0; }
            }
            return price;
        }
    }
                             
    if (typeof tcart__escapeHtml == 'undefined') {
        function tcart__escapeHtml(text) {
            var map = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[<>"']/g, function(m) { return map[m]; });
        }
    }

    if ($('.js-payment-systembox').length > 0) {
        var tildaBtnPaySubmit = '0';
        $('a[href^="#order"]').off('dblclick');
        $('a[href^="#order"]').off('click');
        $('a[href^="#order"]').click(function(e){
            e.preventDefault();

            // защита от поаторной отправки
            if (tildaBtnPaySubmit == '1') {
                return false;
            }

            if ($('.t706').length > 0) {
                console.log('Conflict error: there are two incompatible blocks on the page: ST100 and ST105. Please go to Tilda Editor and delete one of these blocks.');
                return false;
            }
            
            $btnpaysubmit = $(this);
            $btnpaysubmit.addClass('t-btn_sending');
            tildaBtnPaySubmit = '1'

            var tmp = $(this).attr('href');
            var arParam, price=0, product='';
            if (tmp.substring(0,7) == '#order:') {
                // format:  #order:Product name=Cost
                tmp = tmp.split(':');
                arParam = tmp[1].split('=');
                price = tcart__cleanPrice(arParam[1]);
                product = tcart__escapeHtml(arParam[0]);
            } else {
                var pel=$(this).closest('.js-product');
                if(typeof pel!='undefined') {
                    if(product==''){
                            product=pel.find('.js-product-name').text();
                            if (typeof product=='undefined') { product='' };
                    }
                    if(price=='' || price==0){
                        price = pel.find('.js-product-price').text();
                        price = tcart__cleanPrice(price);
                    }
                    var optprice = 0;
                    var options=[];
                    pel.find('.js-product-option').each(function() {
                        var el_opt=$(this);
                        var op_option=el_opt.find('.js-product-option-name').text();
                        var op_variant=el_opt.find('option:selected').val();
                        var op_price=el_opt.find('option:selected').attr('data-product-variant-price');
                        op_price = tcart__cleanPrice(op_price);
                        
                        if(typeof op_option!='undefined' && typeof op_variant!='undefined'){
                            var obj={};
                            if(op_option!=''){
                                op_option = tcart__escapeHtml(op_option);
                            }
                            if(op_variant!=''){
                                op_variant = tcart__escapeHtml(op_variant);
                                op_variant = op_variant.replace(/(?:\r\n|\r|\n)/g, '');
                            }
                            if(op_option.length>1 && op_option.charAt(op_option.length-1)==':'){
                                op_option=op_option.substring(0,op_option.length-1);
                            }
                            
                            optprice = optprice + parseFloat(op_price);
                            options.push(op_option + '=' + op_variant);
                        }
                    });			

                    if (options.length > 0) {
                        product = product + ': '+options.join(', ');
                        /* price = parseFloat(optprice); */
                    }
                }
            }
            var $parent = $(this).parent();
            var blockid = $(this).closest('.r').attr('id');
            var $paysystems= $('.js-dropdown-paysystem .js-payment-system');
            
            if (! product) {
                var tmp=$(this).closest('.r').find('.title');
                if (tmp.length > 0) {
                    product = tmp.text();
                } else {
                    product = $(this).text();
                }
            }

            if ($paysystems.length == 0) {
                alert('Error: payment system is not assigned. Add payment system in the Site Settings.');
                $btnpaysubmit.removeClass('t-btn_sending');
                tildaBtnPaySubmit = '0';
                return false;
            }
            if ($paysystems.length == 1) {
                tildaGetPaymentForm(price, product, $paysystems.data('payment-system'), blockid);
            } else {
                var $jspaybox = $('.js-payment-systembox');
                if ( $jspaybox.length > 0) {
                    var $linkelem = $(this);
                    var offset = $linkelem.offset();
                    $jspaybox.css('top',offset.top+'px');
                    $jspaybox.css('left',offset.left+'px');
                    $jspaybox.css('margin-top','-45px');
                    $jspaybox.css('margin-left','-25px');
                    $jspaybox.css('position','absolute');
                    $jspaybox.css('z-index','9999999');
                    $jspaybox.appendTo($('body'));
                    $(window).resize(function(){
                        if ($jspaybox.css('display')=='block' && $linkelem) {
                            offset = $linkelem.offset();
                            $jspaybox.css('top',offset.top+'px');
                            $jspaybox.css('left',offset.left+'px');
                        }
                    });
                    /*
                    $jspaybox.css('margin-top','-45px');
                    $($parent).css('position','relative');
                    $jspaybox.appendTo($parent);
                    */
                    $jspaybox.show();
                    /*
                    var parentoffset = $(this).offset();
                    var payboxoffset = $jspaybox.offset();
                    if (parentoffset.top > parseInt(payboxoffset.top) + parseInt($jspaybox.height())) {
                        var margintop = parseInt(parentoffset.top)+parseInt($(this).height())-parseInt(payboxoffset.top)-parseInt( $jspaybox.height());
                        $jspaybox.css('margin-top', margintop+'px');
                    }
                    */
                    $('.r').click(function(){ 
                        $btnpaysubmit.removeClass('t-btn_sending');
                        tildaBtnPaySubmit = '0';

                        $jspaybox.hide(); 
                        $('.r').off('click'); 
                        return false; 
                    });

                    $('.js-payment-systembox a').off('dblclick');
                    $('.js-payment-systembox a').off('click');
                    $('.js-payment-systembox a').click(function(e){
                        e.preventDefault();
                        $jspaybox.hide();
                        $linkelem = false;
                        tildaGetPaymentForm(price, product, $(this).data('payment-system'), blockid);
                        return false;
                    });
                }
            }

            return false;
        });
    }

});
 
function t796_init(recid) {
    var el = $("#rec" + recid);
    var shapeEl = el.find(".t796__shape-border");
    var recs = el.find(".t796").attr("data-shape-rec-ids");

    if (typeof recs != "undefined") {
        recs = recs.split(",");
        /* append to certain blocks */
        recs.forEach(function(rec_id, i, arr) {
            var curRec = $("#rec" + rec_id);
            var curShapeEl = shapeEl.clone();
            t796_setColor(el,curShapeEl);
            t796_addDivider(curRec, curShapeEl);
        });
    } else {
        if (shapeEl.hasClass('t796__shape-border_top') || shapeEl.hasClass('t796__shape-border_top-flip')) {
            var curRec = el.next(".r");
            if (curRec.attr("data-record-type") == "215" || curRec.attr("data-record-type") == "706") {
                curRec = curRec.next(".r");
            }
        }

        if (shapeEl.hasClass('t796__shape-border_bottom') || shapeEl.hasClass('t796__shape-border_bottom-flip')) {
            var curRec = el.prev(".r");
            if (curRec.attr("data-record-type") == "215" || curRec.attr("data-record-type") == "706") {
                curRec = curRec.prev(".r");
            }
        }

        if (curRec.length != 0) {
            var curShapeEl = shapeEl.clone();
            t796_setColor(el, curShapeEl);
            t796_addDivider(curRec, curShapeEl);
        }
    }
}


function t796_addDivider(curRec, curShapeEl) {
    curRec.attr("data-animationappear","off").removeClass('r_hidden');
    var coverWrapper = curRec.find(".t-cover");
    var zeroWrapper = curRec.find(".t396");
    if (coverWrapper.length > 0 || zeroWrapper.length > 0) {
        /* if cover or zero */
        if (coverWrapper.length > 0) {
            coverWrapper.find(".t-cover__filter").after(curShapeEl);
        }
        if (zeroWrapper.length > 0) {
           zeroWrapper.after(curShapeEl);
           curRec.css("position", "relative");
        }
        curShapeEl.css("display", "block");
    } else {
        /*if any block*/
        var wrapper = curRec;
        var curRecType = curRec.attr("data-record-type");
        if (wrapper.length == 0) {
            return true;
        }
        wrapper.append(curShapeEl);
        wrapper.css("position", "relative");
        if (curRecType != "554" && curRecType != "125") {
            wrapper.children("div").first().css({
                "position": "relative",
                "z-index": "1"
            }).addClass("t796_cont-near-shape-divider");;
        }
        if (curRecType == "734" || curRecType == "675" || curRecType == "279" || curRecType == "694") {
            curShapeEl.css("z-index", "1");
        }
        curShapeEl.css("display", "block");
    }
}


function t796_setColor(el,curShapeEl) {
    /* get color from nearest block, if it is not set for curShape */
    if (typeof curShapeEl.attr("data-fill-color") != "undefined") {
        return;
    }

    if (curShapeEl.hasClass("t796__shape-border_bottom") || curShapeEl.hasClass("t796__shape-border_bottom-flip")) {
        var nearestBlock = el.next(".r");
    } else {
        var nearestBlock = el.prev(".r");
    }

    if (nearestBlock.length == 0) {
        return;
    }

    var fillColor = nearestBlock.attr("data-bg-color");
    if (typeof fillColor == "undefined") {
        return;
    }

    curShapeEl.find(".t796__svg").css("fill",fillColor);
}
 
function t822_init(recid) {

  t822_setHeight(recid);

  $(window).load(function() {
    t822_setHeight(recid);
  });

  $(window).bind('resize', t_throttle(function() {
    if (typeof window.noAdaptive!="undefined" && window.noAdaptive==true && $isMobile){return;}
    t822_setHeight(recid);
  }, 200));

  $('.t822').bind('displayChanged',function(){
    t822_setHeight(recid);
  });

}

function t822_setHeight(recid) {
    $('#rec'+recid+' .t822 .t-container').each(function() {
        var t822__highestBox = 0;
        $('.t822__col', this).each(function(){
			var t822__curcol=$(this);
			var t822__curcolchild=t822__curcol.find('.t822__col-wrapper');
			if(t822__curcol.height() < t822__curcolchild.height())t822__curcol.height(t822__curcolchild.height());
            if(t822__curcol.height() > t822__highestBox)t822__highestBox = t822__curcol.height();
        });
        if($(window).width()>=960){
        	$('.t822__col',this).css('height', t822__highestBox);
        }else{
	        $('.t822__col',this).css('height', "auto");
        }
    });
};
 
function t851_init(recid) {
  var rec = $('#rec' + recid + ' .t851');
  var doResize;

  setTimeout(function() {
    t851_setHeight(rec);
  }, 500);

  $(window).resize(function() {
    clearTimeout(doResize);
    doResize = setTimeout(function() {
      t851_setHeight(rec);
    }, 200);
  });

  $('.t851').bind('displayChanged', function() {
    t851_setHeight(rec);
  });

  if (rec.hasClass('t851__previewmode')) {
    setInterval(function() {
      t851_setHeight(rec);
    }, 5000);
  }
}

function t851_setHeight(rec) {
  var ratio = rec.attr('data-tile-ratio');
  var ratioHeight = rec.find('.t851__col').width() * ratio;

  rec.find('.t851__row').each(function() {
    var largestHeight = 0;
    var currow = $(this);

    $('.t851__table', this).each(function() {
    var curCol = $(this);
    var curColHeight = curCol.find('.t851__textwrapper').outerHeight();
    if ($(this).find('.t851__cell').hasClass('t851__button-bottom')) {curColHeight += curCol.find('.t851__button-container').outerHeight();}
    if (curColHeight > largestHeight) {largestHeight = curColHeight;}
    });

    if($(window).width() >= 960) {
      if (largestHeight > ratioHeight) {$('.t851__table',this).css('height', largestHeight);}
      else {$('.t851__table', this).css('height', ratioHeight);}
      $('.t851__table', this).css('min-height', 'auto');
    } else {
      $('.t851__table',this).css('min-height', ratioHeight);
      $('.t851__table',this).css('height','');
    }

    if (t851_GetIEVersion() > 0) {
      var curRowHeight = $('.t851__table',this).css('height');
      $('.t851__bg',this).css('height', curRowHeight);
      $('.t851__overlay',this).css('height', curRowHeight);
    }
  });
}

function t851_GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");
  if (Idx > 0) {
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
  } else {
    if (!!navigator.userAgent.match(/Trident\/7\./)){
      return 11;
    } else {
      return 0;
    }
  }
}
