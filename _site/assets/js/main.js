function toggleDisplay(X,Y){
    let ids = [...document.querySelectorAll('[id^="'+X+'-"]')].map(item => item.id);
ids.forEach(toggle)    

function toggle(value, index, array){
d = document.getElementById(value);
if(index>Y && window.getComputedStyle(d).display=="block") {
    document.getElementById(value).style.display = "none";
}else{
    document.getElementById(value).style.display = "block";
}
}
}
