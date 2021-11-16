
function toggleDisplay(X,Y){
    let ids = [...document.querySelectorAll('[id^="'+X+'-"]')].map(item => item.id);
ids.forEach(toggle)    

function toggle(value, index, array){
d = document.getElementById(value);
if(index>Y && window.getComputedStyle(d).display=="block") {
    document.getElementById(value).style.display = "none";
    var idd = "toggle-"+X;
    document.getElementById(idd).innerHTML = "Show More!";
}else{
    document.getElementById(value).style.display = "block";
    var idd = "toggle-"+X;
    document.getElementById(idd).innerHTML = "Show less!";
}
}
}

function navigate(X){
    document.getElementById(X).scrollIntoView({
        behavior: 'smooth'
    });
}

//Sticky Header
$(window).scroll(function() {

    if ($(window).scrollTop() > 300) {
        $("#dropdown").css("display", "inline-block");
    } else {
        $("#dropdown").css("display", "none");
    }
});




function printcv(X){
var prtContent = document.getElementById(X);
var WinPrint = window.open('', '', '');
WinPrint.document.write(prtContent.innerHTML);
WinPrint.document.close();
WinPrint.focus();
WinPrint.print()
WinPrint.close();

}