
function showFile(file) {
    setCookie("mdUrl", file, 360);
    getMd(file);
    var menuDir = document.getElementById("menuDir");
    menuDir.style.visibility = "hidden";
    menuOpened = false;
}

var mdUrl = "";
async function getMd(url, reloadEdit=true) {
    mdUrl = url;
    var response = await callEndpoint("GET", url);
    convert(response);

    var sourceDiv = document.getElementById("source");
    if (sourceDiv != null && reloadEdit) {
        sourceDiv.remove();
        sourceEdit();
    }
}

async function sourceEdit() {
    var contentsDiv = document.getElementById("contents");
    var sourceDiv = document.getElementById("source");
    if (sourceDiv == null) {
        contentsDiv.style.visibility = "hidden";
        var d = document.getElementById("d");
        var sourceDiv = createElement("div", d, "", [
            {"name": "id", "value": "source"},
            {"name": "class", "value": "main"}
        ]);

        var response = await callEndpoint("GET", mdUrl);
        if (response.ERROR == null) {
            createElement("textarea", sourceDiv, response, [
                {"name": "id", "value": "sourceInput"},
                {"name": "class", "value": "sourceInput"},
                {"name": "columns", "value": "500"},
                {"name": "rows", "value": "500"}
            ]);
        }
    }
    else {
        sourceDiv.remove();
        contentsDiv.style.visibility = "visible";
    }
}

async function create(directory) {
    var request = {
        "DIRECTORY": directory
    }

    var response = await callEndpoint("POST", "/notes/create", request);
    if (response.ERROR != null) {
        showWrongAlert("ERROR", response.ERROR, alertTime);
    }
    else {
        menuOpened = false;
        openMenu();
    }
}

async function createDirectory(directory) {
    var request = {
        "DIRECTORY": directory
    }

    var response = await callEndpoint("POST", "/notes/create", request);
    if (response.ERROR != null) {
        showWrongAlert("ERROR", response.ERROR, alertTime);
    }
    else {
        menuOpened = false;
        openMenu();
    }
}

function remove(directory) {
    showConfirm("Remove?", directory, function() {sendRemove(directory)});
}

async function sendRemove(directory) {
    var request = {
        "DIRECTORY": directory
    }

    var response = await callEndpoint("POST", "/notes/remove", request);
    if (response.ERROR != null) {
        showWrongAlert("ERROR", response.ERROR, alertTime);
    }
    else {
        menuOpened = false;
        openMenu();
    }
}