var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");
var timeDisplayEl = $('#time-display');


var toDoItems = [];

function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H:m:s a");

function initializeSchedule(){
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
    
      hour: thisBlockHr,
    
      text: "",
    }
   
    toDoItems.push(todoObj);
  });

 
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  
}

function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function setColor(){
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        if(thisBlockHr === currentHour) {
            setClass("present");
        } else if (thisBlockHr < currentHour) {
            setClass("past");
        } else if (thisBlockHr > currentHour) {
            setClass("future");
        }
    });
}

function setColor(element, color) {
    element.style.backgroundColor = color;
  }

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

$(document).ready(function(){

  setUpTimeBlocks();
  if(!localStorage.getItem("todos")){
    initializeSchedule();
  } 


  renderSchedule();
  $scheduleArea.on("click", "button", saveHandler);
  
});

setInterval(displayTime, 1000);