
function showFile(file) {
    getMd(file);
    var menuDir = document.getElementById("menuDir");
    menuDir.style.visibility = "hidden";
    menuOpened = false;
}

async function createFile() {
    var response = await callEndpoint("POST", "/notes/create");
}