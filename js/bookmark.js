function getSelText() {
	var s = 'defaulttext';
	if (window.getSelection) {
		s = window.getSelection();
	} else if (document.getSelection) {
		s = document.getSelection();
	} else if (document.selection) {
		s = document.selection.createRange().text;
	}

	return s;
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
 function CheckDomainAndKeyword(keyword, domain){
			getGoogleSuggest(keyword);
			getBaiduSuggest(keyword);
			// getGoogleImages(keyword);
			// getWhoisInfo(domain);
			// getOVT(keyword, "Keyword", "http://cloudwidgets.googlecode.com/svn/trunk/OVTWords.dat");
 }

function getGoogleSuggest( genre) {
  
	  $.ajax({
		url: 'https://suggestqueries.google.com/complete/search?output=youtube&q='+genre,
		dataType:'JSONP',
		jsonp:'callback',
		success: function(data) {
			
			var gSuggestions = data[1];

			$("#GSList").empty();

			for (var i = gSuggestions.length - 1; i >= 0; --i) {
				$("<li><a TARGET='_blank' href='https://www.google.com/search?q=" + gSuggestions[i][0] + "'>" + gSuggestions[i][0] + "</a></li>").appendTo("#GSList");

			}

		}
	});
  
}

function getBaiduSuggest( genre) {
  $.ajax({
	dataType: "jsonp",
	url: "https://www.baidu.com/sugrec?prod=pc&wd=" + genre ,
	jsonp: "cb",
	success: function( data ) {
	  
	   var bSuggestions = data.g;
	   $( "#BSList" ).empty();
		
	   for ( var i=bSuggestions.length-1; i>=0; --i ){
		 $("<li><a TARGET='_blank' href='http://www.baidu.com/s?wd=" + bSuggestions[i].q +"'>" + bSuggestions[i].q  + "</a></li>").appendTo( "#BSList" );
		
	   }
	}
  });
}

function getGoogleImages(genre) {
    ajaxUrl = "https://api.ababeen.com/api/images.php?q=" + genre + "&count=10&preview=true"
    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "json",
        success: function(data) {
            $('#image-container').empty();
            for (var i = 0; i < data.length; i++) {
                $('#image-container').append('<a TARGET="_blank" href="' + data[i]['originalContextUrl'] + '"><img src="' + data[i]['tbUrl'] + '"></a>' + '<br/>' + data[i]['title'] + '<br/>');
            }
        }
    });
}
function getOVT(keyword, monthYear, csvURL){
	  $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
				"q=select%20*%20from%20csv%20where%20url%3D%22"+
				encodeURIComponent(csvURL)+
				"%22%20%20and%20columns%3D%22Number%2CKeyword%22%20and%20Keyword%3D%22"+ keyword + "%22&format=json" +
				"&callback=?",  
				
		function(data){
		  if(data.query.results){
			var output = data.query.results;
			$('#ovttarget').append('<br/><p>'+monthYear+',' + output.row.Keyword+ ','+output.row.Number+'</p>');
		  } else {
			var errormsg ='<br/><p>'+monthYear+':No match</p>';
			$('#otvtarget').append(errormsg);
		  }
		}
	  );
return false;
}


function getWhoisInfo(domainName){
url="http://www.dynadot.com/domain/whois.html?domain="+domainName;
doAjax(url);
return false;
}

  function doAjax(url){
	if(url.match('^http')){
	  $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
				"q=select%20*%20from%20html%20where%20url%3D%22"+
				encodeURIComponent(url)+
				"%22&format=xml'&callback=?",
		function(data){
		  if(data.results[0]){
			var data = filterData(data.results[0]);
			$('#whoistarget').html(data);
		  } else {
			var errormsg = '<p>Error: could not load the page.</p>';
			$('#whoistarget').html(errormsg);
		  }
		}
	  );
	} else {
	  $('#whoistarget').load(url);
	}
  }
  
  function filterData(data){
	data = data.replace(/<?\/body[^>]*>/g,'');
	data = data.replace(/[\r|\n]+/g,'');
	data = data.replace(/<--[\S\s]*?-->/g,'');
	data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
	data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
	data = data.replace(/<script.*\/>/,'');
	//dynadot specific logic
	data = data.replace(/<form[^>]*>[\S\s]*?<\/form>/g,'');
	return data;
  }

 
   function trimAll(sString){
		while (sString.substring(0,1) == ' '){
			sString = sString.substring(1, sString.length);
		}
		while (sString.substring(sString.length-1, sString.length) == ' '){
			sString = sString.substring(0,sString.length-1);
		}
		return sString;
	}
 
window.bookmarklet = function(opts){fullFunc(opts)};
 
// These are the styles, scripts and callbacks we include in our bookmarklet:
window.bookmarklet({
 
	css : ['https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.css'],
	js  : ['https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js'], 
	jqpath : 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/external/jquery/jquery.min.js',
	ready : function(){
	var subdomain = location.hostname.substring(0,location.hostname.indexOf("."));
	//alert(location.hostname);
	//alert(subdomain);
	var aRandomID="jqbmlgh";
	var dialogID=aRandomID+"dialog";
	var tabsID=aRandomID+"tabs";
	var selTextID=aRandomID + "selTextID";
	var reverseIPID=aRandomID + "resverseIPID";
	var whoisID=aRandomID + "whoisID";
	var domainID=aRandomID + "domainID";
	var keywordID=aRandomID + "keywordID";
	var buttonClass=aRandomID + "buttonClass";
	var checkAgainID=aRandomID + "checkAgainID";
	var inURLGoogleID=aRandomID + "inURLGoogleID";
	var inURLBaiduID=aRandomID + "inURLBaiduID";
	var adplannerID=aRandomID + "adplannerID";
	var archiveOrgID=aRandomID + "archiveOrgID";
	
	var openAllID=aRandomID + "openAll";

		var s = "";
		s = getSelText();
		s=new String(s);
		s=trimAll(s);
		
		var domain="";
		var keyword="";
		
		
		
		if (s=="") {
			domain=location.hostname;
			//alert(" if " +s);
		} else if (s.indexOf(".")>0) {
			domain=s;
			//alert(" else if " +s);
		} else  {
			domain=s+".com";
		}
		
		domain=trimAll(domain);

		wwwString ='www.';
  if (domain.substring(0, wwwString.length) === wwwString) {
	  domain=domain.substring(wwwString.length);
  }
		
		var sArr = domain.split('.');
		keyword = sArr[0];
		if (keyword==='www') {
			keyword=sArr[1];
		}
		

		
			$("body").append("\
		<div id='" +dialogID+ "' title='Guta Tools'>\
        <img src='https://www.guta.com/assets/img/GUTA-logo-60-2.jpg' style='float:left'/>\
        <img src='https://www.guta.com/assets/img/wechat.jpg' style='float:right;width:120px;height:auto'/>\
        <div style='padding-left:250px'>Guta.com a professional domain brokerage firm which is widely considered as the trusted bridge between the Western and Chinese domain communities.</div>\
        <div style='padding-left:250px'>E-Mail:  sales@Guta.com </div>\
        <div style='padding-left:250px'>WeChat Official Account: ---------------------------------------------------------------------------> </div>\
        <div style='padding-left:250px'>PS: Google Suits need Proxy</div>\
        <br />\
        <span style='margin:10px'>Google:</span>\
        <button class='" +buttonClass+ "' url='http://www.google.com/trends/explore#q=' >GTrend site</button>\
        <button class='" +buttonClass+ "' url='http://www.google.com/trends/?q=' valtype='k'>GTrend Search</button>\
        <button class='" +buttonClass+ "' url='http://www.google.com/insights/search/#q=' valtype='k'>Google Inside</button>\
        <button class='" +buttonClass+ "' url='https://www.google.com/calendar/render?action=TEMPLATE&text='>Calendar</button>\
        <button class='" +buttonClass+ "' valtype='r' url='http://www.google.com/search?q=%20site:dnjournal.com/%20{keyword}'>site:dnjournal</button>\
        <br />\
        <span style='margin:10px'>Ohters:</span>\
		<button id='" +reverseIPID+ "' class='" +buttonClass+ "' url='http://www.yougetsignal.com/tools/web-sites-on-web-server/?remoteAddress='>Reverse Domain IP</button>&nbsp;\
		<button id='" +whoisID+ "' class='" +buttonClass+ "' url='http://www.dynadot.com/domain/whois.html?domain='>Whois</button>\
		<button class='" +buttonClass+ "' url='http://www.quantcast.com/'>Quancast</button>\
		<button class='" +buttonClass+ "' url='http://www.alexa.com/siteinfo/'>Alexa</button>\
		<button class='" +buttonClass+ "' url='http://web.archive.org/web/*/'>Archive</button>\
		<button class='" +buttonClass+ "' url='http://www.dynadot.com/domain/search-advanced.html?domain='>Similar Domain</button>\
		<button class='" +buttonClass+ "' url='http://domainindex.com/domains/'>Domain Index</button>\
		<button class='" +buttonClass+ "' valtype='r' url='http://www.zfbot.com/#/search1={keyword};ext=0;dash=f;num=f;idn=f;min=3;max=63;dropping=f;cvcv=0;park=0;go=t'>ZF bot</button>\
		<button class='" +buttonClass+ "' valtype='r' url='http://www.acronymfinder.com/{keyword}.html'>Acronym</button>\
		<button class='" +buttonClass+ "' url='https://www.namejet.com/Pages/Auctions/BackorderDetails.aspx?domainname='>Namejet</button>\
		<button class='" +buttonClass+ "' url='https://www.snapnames.com/domain/' urlsuffix='.action'>SnapName</button>\
		<button class='" +buttonClass+ "' valtype='r' url='https://www.benmi.com/AuctionP.html?pp=30&q={keyword}' >benmi</button>\
		<button class='" +buttonClass+ "' valtype='r' url='https://www.benmi.com/rwhois?q={domain}&t=dn' >benmi reverse</button>\
		<button class='" +buttonClass+ "' valtype='r' url='https://www.benmi.com/whoishistory/{domain}.html' >benmi history</button>\
		<button class='" +buttonClass+ "' valtype='r' url='http://www.yumi.com/searchlist?domain_name={keyword}' >yumi</button>\
		<button class='" +buttonClass+ "' valtype='r' url='https://www.domainiq.com/domain?{domain}' >DomainIQ</button>\
		<button class='" +buttonClass+ "' valtype='r' url='http://sg.godaddy.com/zh/domains/search.aspx?cvosrc=assets.parked_pages.parked_pages&isc=GPPT03C500&isc=GPPT03C501&ci=85782&checkAvail=1&domainToCheck={keyword}'>GoDaddy</button>\
		<button class='" +buttonClass+ "' valtype='r' url='https://archive.org/search.php?query={domain}'>Website History</button>\
		<button class='" +buttonClass+ "' valtype='r' url='http://www.00738.com/'>GFW Check</button>\
		<button class='" +buttonClass+ "' valtype='r' url='http://auction.ename.com/index/search/3?srchtxt={keyword}'>Ename</button>\
		<button class='" +buttonClass+ "' valtype='r' url='https://www.hexonet.net/whois?query={domain}'>Hexonet</button>\
        <button class='" +buttonClass+ "' valtype='r' url='http://del.chinaz.com/?kw={keyword}'>Del Domain</button>\
        <button class='" +buttonClass+ "' valtype='r' url='http://www.chaomi.cc/'>Chaomi</button>\
        <button class='" +buttonClass+ "' valtype='r' url='http://www.1755.com/ls/?ym={keyword}'>Wanmi</button>\
        <button class='" +buttonClass+ "' valtype='r' url='http://www.qichacha.com/search?key={keyword}'>qichacha</button>\
        <button class='" +buttonClass+ "' valtype='r' url='https://search.weixin.qq.com/cgi-bin/h5/wxindex/detail.html?q={keyword}'>Wechat Trend</button>\
        <button class='" +buttonClass+ "' valtype='r' url='https://index.baidu.com/?tpl=trend&word={keyword}'>Baidu Trend</button>\
        <br />\
        <br />\
		<span class='demoHeaders'>selected/Domain/Keyword:</span>\
		<input type='text' name='" + selTextID + "'" +  "id='" + selTextID + "' />\
		<input type='text' name='" + domainID + "'" +  "id='" + domainID + "' />\
		<input type='text' name='" + keywordID + "'" +  "id='" + keywordID + "' />\
		<button id='" +checkAgainID+ "'>Check</button><br />\
		<div id='"+ tabsID +"'>\
			<ul>\
				<li><a href='#tabs-1'>Suggest & Images</a></li>\
				<li><a href='#whoistarget'>Whois</a></li>\
				<li><a href='#ovttarget'>Overture</a></li>\
				<li><a href='#otherLinks'>Userful links</a></li>\
			</ul>\
			<div id='tabs-1'><table border='1' style='background:white'><tr>\
			<th>Google <button class='" +buttonClass+ "' url='https://www.google.com/search?q='>Url</button> <button class='" +buttonClass+ "' url='https://www.google.com/search?q=' valtype='k'>Keyword</button> <button class='" +buttonClass+ "' url='http://www.google.com/search?q=inurl:' valtype='k'>InURL</button> </th>\
			<th>Baidu <button class='" +buttonClass+ "' url='http://www.baidu.com/s?wd='>Url</button>  <button class='" +buttonClass+ "' url='http://www.baidu.com/s?wd=' valtype='k'>Keyword</button> <button class='" +buttonClass+ "' url='http://www.baidu.com/s?wd=inurl:' valtype='k'>InUrl</button> </th>\
			<th><button class='" +buttonClass+ "' url='http://images.google.com/search?tbm=isch&q=' valtype='k'>More Google Images</button></th></tr>\
			<tr><td valign='top'><ul id=\"GSList\"></ul></td><td valign='top'><ul id=\"BSList\"></ul></td><td valign='top'><div id=\"image-container\"></div></td> </tr>\
			</table>\
			</div>\
			<div id='whoistarget'>whois</div>\
			<div id='ovttarget'>Overture Data<br/></div>\
			<div id='otherLinks'>Other Links<br/><br/>\
			<button class='" +buttonClass+ "' valtype='n' url='http://www.ultimatedomains.com/extract-domains.php'>Extract Domains</button>\
			<button class='" +buttonClass+ "' valtype='n' url='https://www.google.com/trends/hottrends?'>hot trends</button>\
			<button class='" +buttonClass+ "' valtype='n' url='http://namebio.com/'>namebio</button>\
			<button class='" +buttonClass+ "' valtype='n' url='http://www.popuri.us/'>url popularity</button>\
			<button class='" +buttonClass+ "' valtype='n' url='http://s3.amazonaws.com/alexa-static/top-1m.csv.zip'>http://s3.amazonaws.com/alexa-static/top-1m.csv.zip</button>\
			</div>\
		</div>\
		</div>");
		
			$('#'+keywordID).change(function() {
			  var domain=$('#'+keywordID).val()+".com";
			  $('#'+domainID).val(domain);
			  $('#'+checkAgainID).click();
			});
			
			
			 $('#'+domainID).change(function() {
			  var domain=$('#'+domainID).val();
				  var sArr = domain.split('.');
			  keyword = sArr[0];
			  $('#'+keywordID).val(keyword);
			  $('#'+checkAgainID).click();
			});
			
			
			$('.'+buttonClass).button().click(function() {
		var attrUrl=$(this).attr('url');
		var domain=$('#'+domainID).val();
		var keyword=$('#'+keywordID).val();
		var valType=$(this).attr('valtype');
		 var requestUrl;
		if (valType==='r') {
		  attrUrl = attrUrl.replace(/\{domain\}/g, domain);
		  attrUrl = attrUrl.replace(/\{keyword\}/g, keyword);
		  requestUrl = attrUrl;
		}
		
		else {
				  
			  var value=domain;
			  //alert($(this).attr('valtype'));
			  if (valType=='k'){ value=keyword;}
			  if (valType=='n'){ value='';}
			  var suffix='';
			  if ($(this).attr('urlsuffix') !== undefined) {
				// attribute exist
				 suffix=$(this).attr('urlsuffix');
			  }
			  
			  requestUrl = attrUrl + value + suffix ;
		}
		
			  
				window.open(requestUrl);
				}
			
			);
			
			
			
			
			$('#'+checkAgainID).button({ icons: {primary:'ui-icon-plus'} }).click(function() {
			 
			 CheckDomainAndKeyword($('#'+keywordID).val(),$('#'+domainID).val());
			 }
			);
			
			
		
				$('#'+selTextID).val(s);
				$('#'+domainID).val(domain);
				$('#'+keywordID).val(keyword);
				// $('#'+reverseIPID).click();
				//tabs;
				$('#'+tabsID).tabs();
				
				 CheckDomainAndKeyword($('#'+keywordID).val(),$('#'+domainID).val());
				 

				
				// Dialog           
				$('#'+dialogID).dialog({
					autoOpen: false,
					width: 1280,
					height: 768,
					 close: function(event, ui) {$('#'+dialogID).remove();},
					buttons: {
						"Ok": function() { 
							$(this).dialog("close"); 
							$('#'+dialogID).remove();
						}, 
						"Cancel": function() { 
							$(this).dialog("close"); 
							$('#'+dialogID).remove();
						} 
					}
				});
				
		   $('#'+dialogID).dialog('open');  
		 
 
		}
 
})
 
function fullFunc(opts){
 
	// User doesn't have to set jquery, we have a default.
	opts.jqpath = opts.jqpath || "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/external/jquery/jquery.min.js";
 
	function getJS(jsfiles){
 
		// Check if we've processed all of the JS files (or if there are none)
		if (jsfiles.length === 0) {
		  opts.ready();
		  return false;
		}
 
		// Load the first js file in the array
		window.jQuery.getScript(jsfiles[0],  function(){ 
 
			// When it's done loading, remove it from the queue and call the function again    
			getJS(jsfiles.slice(1));
 
		})
 
	}
 
	// Synchronous loop for css files
	function getCSS(csfiles){
		$.each(csfiles, function(i, val){
			$('<link>').attr({
					href: val,
					rel: 'stylesheet'
				}).appendTo('head');
		});
	}
 
	function getjQuery(filename) {
 
		// Create jQuery script element
		var fileref = document.createElement('script')
		fileref.async = 1;
		fileref.src =  filename;
		document.body.appendChild(fileref);
		// Once loaded, trigger other scripts and styles
		fileref.onload = function(){
 
			getCSS(opts.css); // load CSS files
			getJS(opts.js); // load JS files
 
		};
	}

 
	getjQuery(opts.jqpath); // kick it off
 
}; 