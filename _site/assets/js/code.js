
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function updateMeter(){
$(".meter > span").each(function () {
  var x = document.getElementById("goal").value;
  var y = document.getElementById("current").value;
  var z = 100 * y / x;
  $('#htext').text('With your help we have reached ' + Math.round(z) + '% of our goal: ' + numberWithCommas($('#goal').val()) + ' SEK' );
  $(this)
      .data("origWidth", $(this).width())
      .width(0)
      .animate(
        {
          width: z+"%"
        },
        1200
      );
  });
};

updateMeter();



  function makeImage(){
    html2canvas(document.querySelector("#capture")).then(canvas => {
      document.body.appendChild(canvas)
  });
  }
