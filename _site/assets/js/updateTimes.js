function addTime(timeString, added) {
    let [hours, minutes] = timeString.split(":");


    let dateObj = new Date();
    dateObj.setHours(hours);
    dateObj.setMinutes(minutes);


    dateObj.setMinutes(dateObj.getMinutes() + added);


    let updatedTimeString = `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`;

    return (updatedTimeString);
}

function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("current-hour").innerHTML = hours;
    document.getElementById("current-minute").innerHTML = minutes;
    document.getElementById("current-second").innerHTML = seconds;

    const weekday = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
    let day = weekday[currentTime.getDay()];
    var formattedDate = day + ", " + moment().format("YYYY-MM-DD");
    document.getElementById("current-date").innerHTML = formattedDate;
    var hijri = new Intl.DateTimeFormat('ar-FR-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now());
    document.getElementById("current-hijri-date").innerHTML = hijri;

    const todaysPrayers = prayers.find(
        (prayer) =>
            prayer.month == moment().month() + 1 &&
            prayer.date == moment().format("MM/DD")
    ).times;

    const currentPrayerIndex = Object.values(todaysPrayers).findIndex(
        (prayerTime) => addTime(prayerTime, 30) > moment().format("HH:mm")
    );

    $("#salah-table").empty();

    Object.entries(todaysPrayers).forEach(([prayerName, prayerTime], index) =>
        $("#salah-table").append(
            `<tr class="${currentPrayerIndex === index ? "nextPrayer" : "prayer"}">
          <td>${prayerName}</td>
          <td>
          <div class="timeTop">${prayerTime}</div>
          <div class="${currentPrayerIndex === index ? "timeBottom" : "iqamaHidden"}">Iqama: ${iqama[prayerName]}</div>
          </td>
          <td>${prayerNames[prayerName]}</td>
        </tr>`
        )
    );


}


setInterval(updateTime, 1000);

window.onload = function () {
    // Get all the images
    const images = document.querySelectorAll("#imageContainer img");

    // Set the index of the currently displayed image
    let currentImageIndex = 0;

    // Function to change the displayed image
    function changeImage() {
        // Hide the current image
        images[currentImageIndex].style.display = "none";

        // Increment the index of the currently displayed image, wrapping around to 0 if necessary
        currentImageIndex = (currentImageIndex + 1) % images.length;

        // Show the next image
        images[currentImageIndex].style.display = "block";
    }

    // Hide all images except the first one
    for (let i = 1; i < images.length; i++) {
        images[i].style.display = "none";
    }

    // Call the changeImage function every minute
    setInterval(changeImage, 30 * 1000); // 60 seconds * 1000 milliseconds = 1 minute
};