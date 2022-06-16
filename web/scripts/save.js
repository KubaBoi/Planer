
async function save() {
    var sourceDiv = document.getElementById("sourceInput");

    if (sourceDiv == null) {
        return;
    }

    var content = sourceDiv.value;
    var request = {
        "FILE": mdUrl,
        "CONTENT": content
    }
    var response = await callEndpoint("POST", "/notes/update", request);
    if (response.ERROR != null) {
        showWrongAlert("ERROR", response.ERROR, alertTime);
    }
    else {
        mdUrl = response.FILENAME;
        getMd(mdUrl, false);
    }
}

document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
        // Prevent the Save dialog to open
        e.preventDefault();
        // Place your code here
        save();
    }
});