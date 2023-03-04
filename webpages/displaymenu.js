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