var bou_sheet = (function() {
	var style = content.document.createElement("style");
	// style.setAttribute("media", "screen")
	// style.setAttribute("media", "only screen and (max-width : 1024px)")
	style.appendChild(content.document.createTextNode("")); // WebKit hack :(
	content.document.head.appendChild(style);
	return style.sheet;
})();

var bou_ps;
function boustro()
{
    bou_sheet.insertRule(".unboustro, .boustro { font-family: Courier; text-align: left; line-height: 1rem; display: block; }", 0);
    bou_sheet.insertRule(".boustro { text-align: right; -moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); -ms-transform: scale(-1, 1); transform: scale(-1, 1); }", 0);
    bou_ps = content.document.getElementsByTagName("p");
    bou_i = 0;
    bou_len = bou_ps.length;
    bou();
}

var bou_i = 0;
var bou_len = 0;
function bou()
{
    var p = bou_ps[bou_i];
    var actualpwidth = p.offsetWidth - (parseFloat(getComputedStyle(p).paddingLeft) + parseFloat(getComputedStyle(p).paddingRight));
    var testChar = p.cloneNode(false);
    testChar.innerHTML = "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM";
    testChar.style.fontFamily = "Courier"
    testChar.style.fontSize = getComputedStyle(p).fontSize;
    testChar.style.visibility = "hidden";
    testChar.style.position = "absolute";
    testChar.style.left = "-20000px";
    testChar.style.padding = "0px";
    testChar.id = "testChar" + bou_i;
    content.document.body.innerHTML += testChar.outerHTML;
    var cwidth = content.document.getElementById("testChar" + bou_i).offsetWidth / 128;
    var pwidth = (actualpwidth / cwidth); //Now width in amount of chars
    var splitp = p.textContent.match(new RegExp(".{1," + Math.floor(pwidth) + "}","g"));
    var joinedp = '';
    for (var s = 0, len = splitp.length; s < len; s++)
    {
        joinedp += '<span class="' + (s % 2 === 0 ? 'unboustro' : 'boustro') + '" style="' + (s < len ? 'width: ' + actualpwidth + 'px': '' ) + '">' + splitp[s] + '</span>';
    }
    bou_ps[bou_i].innerHTML = joinedp;
    if (bou_i < bou_len) { setTimeout(bou, 100); }
    bou_i++;
}


var boustrophedonise = function () {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	return {
		init : function () {
			gBrowser.addEventListener("load", function () {
				var autoRun = prefManager.getBoolPref("extensions.boustrophedonise.autorun");
				if (autoRun) {
					boustrophedonise.run();
				}
			}, false);
		},
			
		run : function () {
			boustro();
		}
	};
}();
window.addEventListener("load", boustrophedonise.init, false);
