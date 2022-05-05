
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
                
                var subUl = ul;
                
                if (directory.DIRECTORY != "\\notes") {
                    var li = createElement("li", ul, directory.DIRECTORY);
                    subUl = createElement("ul", li);
                } 

                for (let o = 0; o < directory.FILES.length; o++) {
                    var file = directory.FILES[o];
                    
                    if (file == ".gitkeep") continue;

                    createElement("li", subUl, file, [
                        {"name": "ondblclick", "value": `showFile("${directory.DIRECTORY.replaceAll("\\", "/") + '/' + file}")`}
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