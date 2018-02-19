var lastToDoList = $("ul.list");
var lastToDo = $(".todo");
lastToDo.focus();

$.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    };

$.fn.setCursorPosition = function(start, end) {
    if(!end) end = start;
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

function toDoListLength() {
	return $("li").length;
}

function toDoLength() {
	return $('.todo').val().length;
}

function updateToDoCount() {
	var myToDoListCount = 0;
		$(".todo").each(function (index, el) {
			if ($(el).val().length > 0) {
				myToDoListCount = myToDoListCount + 1;
			}
		})
		$("#total").text(myToDoListCount);
}

function updateCheckboxStatus() {
	$('ul').on('change', function(event) {
	    if($(event.target).is(":checked")) {
	        $(event.target).parent().children().first().addClass('checked');
          var completedID = $(event.target).parent().children().first().attr('id');
          completeTask(completedID);
	    }
	    else {
	        $(event.target).parent().children().first().removeClass('checked');
          var uncompletedID = $(event.target).parent().children().first().attr('id');
          uncompleteTask(uncompletedID);
	    }
	});
}

$("#delete-task-button").click(function (event) {
  console.log("Delete button pressed");
  var deletedID = $('#claire').children().children().first().attr('id');
  console.log('Will attempt to delete task ' + deletedID);
  $('#claire').children().children().first().remove(); //removes task
  $('#claire').children().children().first().remove(); //removes checkbox
  deleteTask(deletedID);
  console.log('Delete button function completed');
});

$("#new-task-button").click(function (event) {
  insertTask();
});

function toggleToDoCheckboxes() {
	$(".todo").each(function (index, el) {
	    if ($(el).val().length > 0) {
				$(this).parent().addClass('unhide');
		}
	    else {
				$(this).parent().removeClass('unhide');
		}
	});
}

function saveToDoList() {
	$("#save").click(function (event) {
		var myToDoList = [];
		$(".todo").each(function (index, el) {
			myToDoList.push($(el).val())
		})
		console.log(myToDoList);
		$.post("/save", {list: myToDoList});
	});
}

function keydown(event) {

	var li = $("<li></li>");
	var input = $('<input type="text" class="todo"/><input type="checkbox"/>');
	var eventCode = event.which || event.keyCode;

	var currentToDo = $(event.currentTarget);
	var currentToDoText = currentToDo.val();
	var currentToDoListItem = currentToDo.parent();

	var currentToDoListPosition = ($("li").index(currentToDo.parent()) + 1);
	var currentToDoCursorPosition = currentToDo.getCursorPosition();
	var currentToDoTextEnd = currentToDoText.length;

	var nextToDo = currentToDo.parent().next().children().first();
	var nextToDoText = nextToDo.val();
	var nextToDoListItem = nextToDo.parent();

	var previousToDo = currentToDo.parent().prev().children().first();
	var previousToDoText = previousToDo.val();

	switch (eventCode) {

		case 13: //enter
			if (toDoListLength() < 100) {
				event.preventDefault();
				currentToDoListItem.after(li.append(input));
				var nextToDo = currentToDo.parent().next().children().first(); //Why does this variable need to be repeated?
				var currentToDoTextRemaining = currentToDoText.substring(0, currentToDoCursorPosition);
				var currentToDoTextMoving = currentToDoText.substring(currentToDoCursorPosition, currentToDoTextEnd);
				currentToDo.val(currentToDoTextRemaining);
				nextToDo.val(currentToDoTextMoving);
				nextToDo.setCursorPosition(0);
			}
		break;

		case 8: //backspace
			if (toDoListLength() > 1 && currentToDoCursorPosition == 0) {
				event.preventDefault();
        // console.log(currentToDo.attr('id'));
        var deletedID = currentToDo.attr('id');
        deleteTask(deletedID);
				currentToDoListItem.remove();
				if (currentToDoListPosition == 1) {
					nextToDo.setCursorPosition(0);
				}
				else {
					previousToDo.val(previousToDoText + currentToDoText);
					previousToDo.setCursorPosition(previousToDoText.length);
				}
			}
		break;

		case 46: //delete
			if (currentToDoListPosition !== toDoListLength() && currentToDoCursorPosition == currentToDoTextEnd) {
				event.preventDefault();
				nextToDoListItem.remove();
				currentToDo.val(currentToDoText + nextToDoText);
				currentToDo.setCursorPosition(currentToDoTextEnd);
			}
		break;

		case 40: //down arrow
			if (toDoListLength() > 1) {
				event.preventDefault();
				nextToDo.setCursorPosition(currentToDoCursorPosition);

			}
		break;

		case 38: //up arrow
			if (toDoListLength() > 1) {
				event.preventDefault();
				previousToDo.setCursorPosition(currentToDoCursorPosition);
			}
		break;
	}
	updateToDoCount();
	toggleToDoCheckboxes();
}

$(document).ready(function() {

	lastToDoList.on('keydown', ".todo", keydown);
	lastToDoList.on('input', ".todo", updateToDoCount);
	lastToDoList.on('input', ".todo", toggleToDoCheckboxes);

	updateToDoCount();

	updateCheckboxStatus();

	saveToDoList();

});
