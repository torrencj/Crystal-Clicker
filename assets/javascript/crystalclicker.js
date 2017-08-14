
$(document).ready(function() {

  var target = 0;
  var clicks;
  var overshoot;
  var health = 10;
  var round = 1;
  var gameover = false;

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
  }

  function reloadcrystals() {
    $("button").each(function(i) {
      newcrystal(this.id);
    });
  }

  function updategame(data) {

    if (arguments.length == 0) { //default behavior clear everything
      //set up a new game
      target = random(100);
      clicks = 0;
      overshoot = 0;

      $(".score-screen p").empty();
      $(".target").text(target);
      $(".health").text(health);
      $(".round").text(round);
      $("#win-msg").empty();

    } else if (health <=0) {
          gameover = true
          $(".health").text(health);

      } else {
        overshoot = target - data.value;
        target -= data.value;
        var damage = clicks + Math.abs(overshoot);

        if (overshoot < 0) {
          health -= (Math.abs(overshoot)+clicks);
          $(".score-screen").append("<p> You took " + damage+ " damage</p>")
          $("#win-msg").append("<h3>Round "+round+"</h3>");

        } else if (overshoot == 0) {
          $(".score-screen").append("<p> You took no damage!</p>")
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
      item.css("color","black");
    } else {
      item.css("color","white")
    }
}

function reset() {
  round = 1;
  health = 100;
  gameover = false;
  updategame();
  reloadcrystals();
}

$("button").on("click", function(event) {
  clicks++;
  if ($(this).data().isNotClicked && target >0) {
    updategame($(this).data());
    newcrystal(this.id);
  }


}); //onclick event
$(".target-screen").on("click", function(event) {
  console.log(health);
  if (gameover) {
    reset();
  }
  if (health <= 0){
    $(".target p").empty();
    $(".health").text(health);
    $(".target").text('');
    $(".target").append('<p style="font-size: 24px">Game over.</p>')
    gameover = true;

  } else if (target <= 0) {
    round++;
    updategame();
    reloadcrystals();
  }

}); //onclick event



}); //document ready function
