
function toggleDisplay(X, Y) {
    let ids = [...document.querySelectorAll('[id^="' + X + '-"]')].map(item => item.id);
    ids.forEach(togglee)

    function togglee(value, index, array) {
        d = document.getElementById(value);
        if (index > Y && window.getComputedStyle(d).display == "block") {
            document.getElementById(value).style.display = "none";
            var idd = "toggle-" + X;
            document.getElementById(idd).innerHTML = "Show More!";
        } else {
            document.getElementById(value).style.display = "block";
            var idd = "toggle-" + X;
            document.getElementById(idd).innerHTML = "Show less!";
        }
    }
}

function navigate(X) {
    document.getElementById(X).scrollIntoView({
        behavior: 'smooth'
    });
}

//Sticky Header
$(window).scroll(function () {

    if ($(window).scrollTop() > 300) {
        $("#dropdown").css("display", "block");
    } else {
        $("#dropdown").css("display", "none");
    }
});




function printcv(X) {
    var prtContent = document.getElementById(X);
    var WinPrint = window.open('', '', '');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print()
    WinPrint.close();

}

function toggleEntry(z) {

    d = document.getElementById("c" + z);

    if (window.getComputedStyle(d).display == "block") {
        document.getElementById("c" + z).style.display = "none";
        // document.getElementById("l"+z).style.marginTop = "0";
        const iid = "i" + z
        document.getElementById(iid).className = "fa-solid fa-circle-chevron-right";

    } else {

        document.getElementById("c" + z).style.display = "block";
        //document.getElementById("l"+z).style.marginTop = "1rem";
        const iid = "i" + z
        document.getElementById(iid).className = "fa-solid fa-circle-chevron-down";

    }
}


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

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


function changePrintStatus(cb, itemID) {
    element = document.getElementById(itemID)
    if (cb.checked) {
        element.className = "print";
    } else {
        element.className = "hideit";
    }

}

$(document).ready(function () {
    checkboxes = document.getElementsByClassName("printCheck");
    for (var i = 0; i < checkboxes.length; i++) {
        cbid = checkboxes[i].getAttribute("id");
        itemID = cbid.substring(2, cbid.length);
        elem = document.getElementById(cbid);
        itemClass = document.getElementById(itemID).getAttribute("class");
        if (itemClass == "print") {
            checkboxes[i].checked = true;
        } else {
            checkboxes[i].checked = false;
        }
    }
});


function setPrinting(btn) {
    document.getElementById("printButton").style.display = "block";
    document.getElementById("resetbtn").style.display = "block";
    btn.style.display = "none";

    checkboxes = document.getElementsByClassName("printCheck");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].style.display = "inline-block";
    }
    buttons = document.getElementsByClassName("selectbtn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "inline-block";
    }

}

function reset() {
    window.location.reload();
}


function changePrintStatusGroup(section) {
    checkboxes = document.getElementsByClassName("printCheck");
    const arr = []
    for (var i = 0; i < checkboxes.length; i++) {
        cbID = checkboxes[i].getAttribute("id");
        const firstPart = cbID.split('-')[0]

        if (firstPart + "-" == "cb" + section) {
            arr.push(i)
        }
    };

    if (checkboxes[arr[0]].checked == true) {
        for (var i = 0; i < arr.length; i++) {
            cbID = checkboxes[arr[i]].getAttribute("id");
            itemID = cbID.substring(2, cbID.length);
            checkboxes[arr[i]].checked = false;
            changePrintStatus(checkboxes[i], itemID);
        }

    } else {
        for (var i = 0; i < arr.length; i++) {
            cbID = checkboxes[arr[i]].getAttribute("id");
            itemID = cbID.substring(2, cbID.length);
            checkboxes[arr[i]].checked = true;
            changePrintStatus(checkboxes[i], itemID);
        }
    }



}

function sectionsTest() {
    sections = document.querySelectorAll('[id*="#g"]');

    for (var i = 0; i < sections.length; i++) {

        sectionid = sections[i].getAttribute("id");
        if (sectionid != "#g6") {
            sect = sectionid.substring(2);

            sec = sect + "-"
            elems = document.querySelectorAll('[id*="cb' + sec + '"]');
            var count = 0;
            for (var a = 0; a < elems.length; a++) {
                if (elems[a].checked == true) {
                    count++;
                }
            }
            if (count == 0) {
                sections[i].style.display = "none";
            }
        }
    }
}

function openAndPrint() {
    var listItemss = document.getElementsByClassName("print");
    for (var i = 0; i < listItemss.length; i++) {
        elem = document.getElementById(listItemss[i].getAttribute("id"));
        elem.style.display = "block";
    }

    var listItems = document.getElementsByClassName("hideit");
    for (var i = 0; i < listItems.length; i++) {
        elem = document.getElementById(listItems[i].getAttribute("id"));
        elem.style.display = "none";
    }

    var page = document.getElementsByClassName("page-content")[0];
    page.style.boxShadow = "none";

    document.getElementById("topmenu1").style.display = "none";


    sectionsTest();

    print();

}

