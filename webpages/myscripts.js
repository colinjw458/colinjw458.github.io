var isOther = false;

var search = document.getElementById("search");
search.addEventListener("change", function(){
    if(search.value === "other"){
        isOther = true;
        document.getElementById("other").disabled = false;
    }
    else{
        document.getElementById("other").disabled = true;
    }
})

function changeimg(name, txt) {
        var img = document.getElementById("mainimg");
        img.src = name;
        img.alt = txt;
}

function hideimg(){
    var img = document.getElementById("mainimg");
    var button = document.getElementById("imgbutton")
    if(button.textContent == "Go Away!"){
        button.textContent = "Come Back!";
        img.style.display = "none";
    }
    else{
        button.textContent = "Go Away!";
        img.style.display = "inline";
    }
}
function displaythumb(id, name, txt){
    var img = document.getElementById(id);
    img.style.display = "inline";
    img.src = name;
    img.alt = txt;
}
function removethumb(id){
    var img = document.getElementById(id);
    img.style.display = "none";
    img.src = "";
    img.alt = "";
}

function initMap(){
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    var map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 44.9727, lng: -93.23540000000003},
    zoom: 14
    });

    var geocoder = new google.maps.Geocoder();

    const icon = {
        url: "./img/Goldy.png",
        scaledSize: new google.maps.Size(40, 40)
    }

    var rows = document.getElementsByTagName("tr");	

    for(let i = 1; i < rows.length; i++){
        let kids = rows[i].children;
        geocoder.geocode({address: kids[3].textContent, region: "MN"}, function(results, status){
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const pos = results[0].geometry.location;
                const content = "<p id='popup'>" + kids[1].textContent + "<br>" + kids[2].textContent + "<br>" + kids[3].textContent + "</p>";

                makemark(map, pos, content, icon);
            }
            else{
                console.log(status);
            }
        });
    }
    directionsRenderer.setMap(map);

    var searchbutton = document.getElementById("searchsubmit");
    searchbutton.addEventListener("click", function() {handlesearch(map)})
    var dirbutton = document.getElementById("directionbutton");
    dirbutton.addEventListener("click", function() {handleDirections(directionsService, directionsRenderer)});
}

function makemark(map, pos, content, icon){
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: icon
    });
    var infoWindow = new google.maps.InfoWindow({
        position: pos,
        content: content
    });

    marker.addListener('click', function(){infoWindow.setContent(content); infoWindow.open(map, marker)});
}

function handlesearch(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(success){ txtSearch(success, map)});
    } else {
        console.log("Fail");
    }
}

function txtSearch(success, map){
    var radius = document.getElementById("meters").value;
    var userpos = {lat: success.coords.latitude, lng: success.coords.longitude};
    var service = new google.maps.places.PlacesService(map);
    var searchpick = document.getElementById("search").value;

    if(isOther){
        console.log("here")
        let otherText = document.getElementById("other").value;

        service.textSearch({query: otherText, radius: radius, location: userpos}, function(results, status) {txtHandler(results, status, map)});

    }
    else {
        service.textSearch({type: searchpick, radius: radius, location: userpos}, function(results, status) {txtHandler(results, status, map)});
    }
}

function txtHandler(results, status, map){
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            const pos = results[i].geometry.location;
            console.log(results)
            const content = results[i].name + "<br>" + results[i].formatted_address;
            makemark(map, pos, content);
            map.setCenter(pos);
        }
    }
    else{
        console.log("failed places");
        console.log(status);
    }
}

function handleDirections(directionsService, directionsRenderer){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(success){
            giveDirections(success, directionsService, directionsRenderer)
        });
    } else {
        console.log("Fail");
    }
}

function giveDirections(success, directionsService, directionsRenderer){
    var userpos = {lat: success.coords.latitude, lng: success.coords.longitude};
    var radios = document.getElementsByName("radio1");
    var trv;
    var dest = document.getElementById("to").value;
    var panel = document.getElementById("steps");

    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            trv = radios[i].value;
        }
    }

    let directionRequest = {
        origin: userpos,
        destination: dest,
        travelMode: trv,
        region: "MN"
    }

    directionsService.route(directionRequest, function(result, status){
        if(status === "OK"){
            directionsRenderer.setDirections(result);
            panel.style.width = "20%";
            directionsRenderer.setPanel(panel)
        }
        else{
            console.log("Lame");
        }
    });
}