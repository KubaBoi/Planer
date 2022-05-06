
var menuOpened = false;

async function openMenu() {
    var menuDir = document.getElementById("menuDir");

    if (!menuOpened) {

        var response = await callEndpoint("GET", "/notes/getAll");
        if (response.ERROR == null) {
            var ul = document.getElementById("treeUl");
            clearTable(ul);

            menuDir.style.visibility = "visible";
            menuOpened = true;

            for (let i = 0; i < response.TREE.length; i++) {
                var directory = response.TREE[i];
                var dirName = directory.DIRECTORY.replaceAll("\\", "/");
                
                var li = createElement("li", ul, directory.DIRECTORY);
                
                if (dirName != "/notes") {
                    createElement("img", li, "", [
                        {"name": "src", "value": "/images/close.png"},
                        {"name": "width", "value": "15px"},
                        {"name": "height", "value": "15px"},
                        {"name": "onclick", "value": `remove("${dirName}")`}
                    ]);
                }
                createElement("img", li, "", [
                    {"name": "src", "value": "/images/add.png"},
                    {"name": "width", "value": "15px"},
                    {"name": "height", "value": "15px"},
                    {"name": "onclick", "value": `create("${dirName}")`}
                ]);
                subUl = createElement("ul", li);

                for (let o = 0; o < directory.FILES.length; o++) {
                    var file = directory.FILES[o];
                    
                    if (file == ".gitkeep") continue;

                    var subLi = createElement("li", subUl, file, [
                        {"name": "ondblclick", "value": `showFile("${dirName + '/' + file}")`}
                    ]);

                    createElement("img", subLi, "", [
                        {"name": "src", "value": "/images/close.png"},
                        {"name": "width", "value": "15px"},
                        {"name": "height", "value": "15px"},
                        {"name": "onclick", "value": `remove("${dirName + '/' + file}")`}
                    ]);
                } 
            }

            menuOpened = true;
        }
        else {
            showWrongAlert("ERROR", response.ERROR, alertTime);
        }
    }
    else {
        menuDir.style.visibility = "hidden";
        menuOpened = false;
    }
}