// Man you gotta change this shit so that it's so you try to get to the target in the fewest
// clicks without going over. Maybe ditch the colors for now. Fun idea, but sheesh.

$(document).ready(function() {

  var target = 0;
  var clicks;
  var overshoot;
  var health = 100;
  var round = 1;
  var colors = [
  "red",
  "blue",
  "darkcyan",
  "green",
  "purple",
  "orange",
  "white",
  "black"
];


  var values = [1,2,3,5,8,13,21,34];

  updategame();
  reloadcrystals();

  //generate a random int from 0 - max
  function random(max) {
    return Math.floor(Math.random() * (max + 1));
    // return 0;
  }

  function reloadcrystals() {
    // console.log("reloading crystals");
    $("button").each(function(i) {
      newcrystal(this.id);
    });
  }

  function updategame(data) {

    if (arguments.length == 0) { //default behavior
      //set up a new game
      target = random(100);
      clicks = 0;
      overshoot = 0;

      $(".score-screen p").empty();
      $(".target").text(target);
      $(".health").text(health);
      $(".round").text(round);
      $("#win-msg").empty();

    } else {
      overshoot = target - data.value;
      target -= data.value;
      $(".health").text(health);

      if (overshoot < 0) {
        overshoot = Math.abs(overshoot)
        health -= (overshoot+clicks);
        $(".score-screen").append("<p> You clicked " + clicks + " times and overshot by "+overshoot+"</p>")
        $("#win-msg").append("<h3>Reset</h3>");
      } else if (overshoot == 0) {
        overshoot = Math.abs(overshoot)
        health -= (overshoot+clicks);
        $(".score-screen").append("<p> You clicked " + clicks + " times and overshot by "+overshoot+"</p>")
        $("#win-msg").append("<h3>Perfect</h3>");
      }

      if (target <= 0) {
        $(".target").empty();

      } else {
      $(".target").text(target);

    }
}

  $(".clicks").text(clicks)

}


// function progress(percent, $element) {
//     var progressBarWidth = percent * $element.width() / 100;
//
//     $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
// }


function newcrystal(id) {

  $(this).empty();
  $(this).removeAttr( 'style' );
  $(this).data().isNotClicked = false;

  var crystal = {
    "color": colors[random(colors.length - 1)],
    "value": values[random(colors.length - 1)],
    "isNotClicked" : true
  }

    var item = $("#"+id);

    item.css("background-color", crystal.color);
    item.text(crystal.value);
    item.data(crystal);

    if (crystal.color == "white") {
      // console.log("I changed the color");
      item.css("color","black");
    } else {
      // console.log("I changed the color");
      item.css("color","white")
    }
}

$("button").on("click", function(event) {
  // console.log(this.id);
  clicks++;
  if ($(this).data().isNotClicked && target >0) {
    updategame($(this).data());
    newcrystal(this.id);
  }


}); //onclick event
$(".target-screen").on("click", function(event) {
  if (target <= 0){
    round++;
    updategame();
    reloadcrystals();
    if (health <=0){
      $("#win-msg").append("<h3>Game over.</h3>");
      gameover = 1; //TODO! game over state
    }

}
}); //onclick event



}); //document ready function
