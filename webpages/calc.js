function checktime(){
    var nowDate = new Date();
    var entryFormatted;
    var nowFormatted;

    var para = document.getElementById("dateresult");

    var entry = document.getElementById("dateentry");
    var entryDate = Date.parse(entry.value);

    entryFormatted = Math.floor(entryDate / 24 / 60 / 60 / 1000);
    nowFormatted = Math.floor(nowDate / 24 / 60 / 60 / 1000);

    var difference = entryFormatted - nowFormatted;

    if(difference > 0){
        para.innerHTML = difference + " days remaining";
        para.style.color = "black";
    }
    else if(difference <= 0){
        para.innerHTML = "Already passed!";
        para.style.color = "red";
    }
}