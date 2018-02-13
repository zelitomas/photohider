let tiles = 10;
let pictures = [];

$().ready(() => {
    let tileSize = 100 / tiles;
    let tileSizeCSS = "calc(" + tileSize + "% + 1px)";
    console.log(tileSizeCSS);
    for(let j = 0; j < tiles; j++){
        for(let i = 0; i < tiles; i++){
            $("#start").append($("<div>")
                .addClass("cover")
                .css("top", i * tileSize + "%")
                .css("left", j * tileSize + "%")
                .css("width", tileSizeCSS)
                .css("height", tileSizeCSS)
                .append(
                    $("<div>")
                    .addClass("content")
                    .html(String.fromCharCode(65 + i) + (j + 1))
                ));
        }
    }
    
    $(".cover").click((e) => {
        console.log(e.target);
        let $target = $(e.target).closest(".cover");
        hide($target);
    });
    
    $(document).on("keypress", (event) => {
        console.log(event.key);
        if(event.key == " "){
            uncover();
        } else if(event.key == "n"){
            next();
        }
    
    });
    
    $("#ready").click(() => {
        console.log($("#start")[0]);
        let elem = $("#start")[0];
        let requestMethod = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullScreen;
        requestMethod.call(elem);
        $(".inactive").removeClass("inactive");
        $("#dropzone").addClass("hidden");
    });
    
});

function dropHandler(event){
    event.preventDefault();
    let items = event.dataTransfer.items;
    for(let i of items){
        if(i.kind == "file"){
            let file = i.getAsFile();
            let url = URL.createObjectURL(file);
            pictures.push(url);
            $("#num").html(pictures.length);
            $("#imagesLoaded").css("display", "block");
            $("#start").css("background-image", "url(" + pictures[0] + ")");
        }
    }
}

function canc(ev) {
  ev.preventDefault();
}

function restart(){
    $(".cover").removeClass("invisible");
    setTimeout(() => {
        $(".cover").removeClass("hidden");
    }, 500);
}

function hide($target){
    $target.addClass("hidden");
    setTimeout(() => {
        if($target.hasClass("hidden")){
            $target.addClass("invisible");
        }
    }, 2000);
}

function uncover(){
    hide($(".cover"));
}

function next(){
    pictures.splice(0, 1);
    restart();
    setTimeout(() => {
        $("#start").css("background-image", "url(" + pictures[0] + ")");
    }, 2000);
}
