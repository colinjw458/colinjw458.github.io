function displaymenu(){
    var navlinks = document.getElementById("navcontent");

    if(navlinks.style.display == "block"){
        navlinks.style.display = "none";
    }
    else{
        navlinks.style.display = "block";
    }
}
function displaymenu(id){
    var navlinks = document.getElementById(id);
    var kids = navlinks.children;

    for(let i=1; i < kids.length; i++) {
        if (kids[i].style.display == "block") {
            kids[i].style.display = "none";
        } else {
            kids[i].style.display = "block";
        }
    }
}