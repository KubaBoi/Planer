var debug = true;

var alertTime = 3000;

var mdUrl = getCookie("mdUlr");
if (mdUrl != "") {
    showFile(mdUrl);
}

openMenu();
