
function toggleDisplay(X,Y){
    let ids = [...document.querySelectorAll('[id^="'+X+'-"]')].map(item => item.id);
ids.forEach(togglee)    

function togglee(value, index, array){
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
        $("#dropdown").css("display", "block");
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

function toggleEntry(z){

    d = document.getElementById("c"+z);
    
    if(window.getComputedStyle(d).display=="block") {
        document.getElementById("c"+z).style.display = "none";
       // document.getElementById("l"+z).style.marginTop = "0";
        const iid = "i"+z
        document.getElementById(iid).className = "fa-solid fa-circle-chevron-right";
    
    }else{

        document.getElementById("c"+z).style.display = "block";
        //document.getElementById("l"+z).style.marginTop = "1rem";
        const iid = "i"+z
        document.getElementById(iid).className = "fa-solid fa-circle-chevron-down";
    
    }
    }
    

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};
    
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
      } else {
        document.getElementById("myBtn").style.display = "none";
      }
    }
    
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }


    function openAndPrint(){

        let ids = [...document.querySelectorAll('[id^="c"]')].map(item => item.id);
        ids.forEach(tog);
        
        function tog(value, index){
            console.log(value);
        document.getElementById(value).style.display = "block";
        }
    print();
    }


