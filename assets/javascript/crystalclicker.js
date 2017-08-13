
$(document).ready(function() {

var target = 0;
// var buttonsLocked = false;

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

  var damagevalues = [1,2,3,5,8,13,21,34];
  updategame();
  reloadcrystals();

  //generate a random int from 0 - max
  function random(max) {
    return Math.floor(Math.random() * max + 1);
  }

  function reloadcrystals() {
    console.log("reloading crystals");
    $("button").each(function(i) {

    if (true) {
      newcrystal(this.id);
    }
    }); //each function
  }


function updategame(data) {
  console.log(arguments.length);
  if (arguments.length == 0) { //default behavior
    //set up a new game
    target = random(100);
    console.log(target);
    $(".target").text(target);

  } else {
    //update
    console.log("updating game");
    var damage = effectCalc(data.color, data.damage);
    $(".score-screen").html("You did " + damage + " " + data.color + " damage!")
    target -= damage;
    if (target <= 0) {
      $(".target").empty();
      console.log($(".target").css);
      $(".target").css("font-size: 1em");
      $(".target").text("You won.");
    } else {
    $(".target").text(target);
  }
}
}

// enemy types -- weakness:
// flesh -- red
// metal -- yellow
// magma -- blue
// magic -- purple
//
// special:
// black -- hurts user
// white -- heals user?



  function effectCalc(color, damage) {
    switch (color) {

      case "red":
        return damage;
      break;

      case "blue":
        return damage;
      break;

      case "darkcyan":
        return damage;
      break;

      case "green":
        return damage;
      break;

      case "purple":
        return damage;
      break;

      case "orange":
        return damage;
      break;

      case "white":
        return damage;
      break;

      case "black":
        return damage;
      break;


      default:

    }


}

function newcrystal(id) {

  $(this).empty();
  $(this).removeAttr( 'style' );
  $(this).data().isNotClicked = false;

  var crystal = {
    "color": colors[random(colors.length - 1)],
    "damage": damagevalues[random(colors.length - 1)],
    "isNotClicked" : true
  }

    var item = $("#"+id);

    // item.data(crystal);
    // console.log("I'm doing something.");
    item.css("background-color", crystal.color);
    item.text(crystal.damage);
    item.data(crystal);

    if (crystal.color == "white") {
      console.log("I changed the color");
      item.css("color","black");
    } else {
      console.log("I changed the color");
      item.css("color","white")
    }
}

$("button").on("click", function(event) {
  // console.log(event.currentTarget.id);
  console.log(this.id);
  // console.log(this.isNotClicked);

// console.log($(this).data().isNotClicked);

  if ($(this).data().isNotClicked) {
    updategame($(this).data());
    // console.log($(this).id);

    newcrystal(this.id);

  }


}); //onclick event
$(".target-screen").on("click", function(event) {
  reloadcrystals();
}); //onclick event

});
