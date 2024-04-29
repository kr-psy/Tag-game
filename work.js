$(document).ready(function() {
  const element1 = $('#box'); // Replace 'box' with the actual ID of your first element
  const rect1 = element1.get(0).getBoundingClientRect();
  const x1 = rect1.left;
  const y1 = rect1.top;
  var touching = 0;
  var winner = null;
  var align = window.innerWidth/4
  var alignTop = window.innerHeight/4
  $("#box").css("right", align) 
  $("#box2").css("left", align) 
  $("#box").css("top", align) 
  $("#box2").css("top", align) 
  console.log('Box 1 - x:', x1, 'y:', y1);
  var count = 30
  $("h2").text(count);
  let intervalId66 = setInterval(function() {
    count--;
    $("h2").text(count);
    if (count === 0) {
      clearInterval(intervalId66);
      $("h2").text(0);
      timeOver();
    }
  }, 1000);
  const element2 = $('#box2'); // Replace 'box2' with the actual ID of your second element
  const rect2 = element2.get(0).getBoundingClientRect();
  const x2 = rect2.left;
  const y2 = rect2.top;
  console.log('Box 2 - x:', x2, 'y:', y2);

  let intervalW = null;
  let intervalA = null;
  let intervalS = null;
  let intervalD = null;
  let intervalUp = null;
  let intervalDown = null;
  let intervalLeft = null;
  let intervalRight = null;

  $(document).on('keydown', function(event) {
    handleKeyDown(event.key);
  });

  $(document).on('keyup', function(event) {
    handleKeyUp(event.key);
  });

  function handleKeyDown(key) {
    switch (key) {
      case "w":
        if (!intervalW) {
          if (box2.offsetTop >= 0) {
            console.log(box2.offsetTop)
          intervalW = setInterval(function() {
            moveBox('w');
          }, 0.001);
        } else {
          box2.offsetTop = 0;
        }
        }
        break;
      case "a":
        if (!intervalA) {
          intervalA = setInterval(function() {
            moveBox('a');
          }, 0.001); // Adjust interval timing as needed
        }
        break;
      case "s":
        if (!intervalS) {
          intervalS = setInterval(function() {
            moveBox('s');
          }, 0.001); // Adjust interval timing as needed
        }
        break;
      case "d":
        if (!intervalD) {
          intervalD = setInterval(function() {
            moveBox('d');
          }, 0.001); // Adjust interval timing as needed
        }
        break;
      case "ArrowUp":
        if (!intervalUp) {
          intervalUp = setInterval(function() {
            moveBox('ArrowUp');
          }, 0.001); // Adjust interval timing as needed
        }
        break;
      case "ArrowDown":
        if (!intervalDown) {
          intervalDown = setInterval(function() {
            moveBox('ArrowDown');
          }, 0.001); // Adjust interval timing as needed
        }
        break;
      case "ArrowLeft":
        if (!intervalLeft) {
          intervalLeft = setInterval(function() {
            moveBox('ArrowLeft');
          }, 0.001); // Adjust interval timing as needed
        }
        break;
      case "ArrowRight":
        if (!intervalRight) {
          intervalRight = setInterval(function() {
            moveBox('ArrowRight');
          }, 0.001); // Adjust interval timing as needed
        }
        break;
    }
  }

  function handleKeyUp(key) {
    switch (key) {
      case "w":
        clearInterval(intervalW);
        intervalW = null;
        break;
      case "a":
        clearInterval(intervalA);
        intervalA = null;
        break;
      case "s":
        clearInterval(intervalS);
        intervalS = null;
        break;
      case "d":
        clearInterval(intervalD);
        intervalD = null;
        break;
      case "ArrowUp":
        clearInterval(intervalUp);
        intervalUp = null;
        break;
      case "ArrowDown":
        clearInterval(intervalDown);
        intervalDown = null;
        break;
      case "ArrowLeft":
        clearInterval(intervalLeft);
        intervalLeft = null;
        break;
      case "ArrowRight":
        clearInterval(intervalRight);
        intervalRight = null;
        break;
    }
  }

  function moveBox(direction) {
    let topValue = parseFloat($('#box2').css("top"));
    let LeftValue = parseFloat($('#box2').css("left"));
    let leftValue2 = parseFloat($('#box').css("left"));
    let topValue2 = parseFloat($('#box').css("top"));
    const box = $('#box');
    const box2 = $('#box2');
    const step = 2; // Adjust the step value as needed for smoother movement

    if (areTouching(element1, element2) && touching === 0) {
      touching = 1
      console.log(touching)
      console.log('Elements are touching!');
      box.toggleClass('tagged');
      box2.toggleClass('tagged');
    } else if (!areTouching(element1, element2)) {
      touching = 0
    }
      switch (direction) {
        case "w":
          if (topValue >= 0){
          box2.css({ top: `-=${step}px` });  
          }
           break;
        case "a":
          if (LeftValue >= 0) {
          box2.css({ left: `-=${step}px` });
        } break;
        case "s":
          if (topValue + box2.width()<= window.innerHeight) {
          box2.css({ top: `+=${step}px` });
          }
          break;
        case "d":
          if (LeftValue + box2.width()<= window.innerWidth) {
          box2.css({ left: `+=${step}px` });
          }
          break;
        case "ArrowUp":
          if (topValue2 >= 0) {
          box.css({ top: `-=${step}px` });
          }
          break;
        case "ArrowDown":
          if (topValue2 + box.width() <= window.innerHeight) {
          box.css({ top: `+=${step}px` });
          }
          break;
        case "ArrowLeft":
          if (leftValue2 >= 0) { 
          box.css({ left: `-=${step}px` });
          }
          break;
        case "ArrowRight":
          if (leftValue2 + box.width() <= window.innerWidth) {
          box.css({ left: `+=${step}px` }); 
          }
          break;
      }
  }

  function areTouching(elem1, elem2) {
    const rect1 = elem1.get(0).getBoundingClientRect();
    const rect2 = elem2.get(0).getBoundingClientRect();

    return !(
      rect1.top + elem1.height() < rect2.top ||
      rect1.left + elem1.width() < rect2.left ||
      rect1.top > rect2.top + elem2.height() ||
      rect1.left > rect2.left + elem2.width()
    );
  }

  function timeOver() {
    if ($(".tagged").hasClass("blue")) {
      winner = "Red";
      $("body").css("background-color", "red");
    } else {
      winner = "Blue";
      $("body").css("background-color", "blue");
    }
    alert(winner + " won the game!!")
  }
});
