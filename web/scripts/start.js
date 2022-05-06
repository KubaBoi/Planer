var debug = false;

var alertTime = 3000;

var mdUrl = getCookie("mdUrl");
if (mdUrl != "") {
    showFile(mdUrl);
}
else {
    openMenu();
}
