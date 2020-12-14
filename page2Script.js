$(document).ready(function() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  if (page == "finalCalculation.html") {
    displayDValues(); // Prevents error where this would be called before the second page is loaded
  }


    // ***** FUNCTIONS *****

    /// Function that is used to find which of the sValue buttons the user clicked
    function findWValue(wID) {
      if (wID == 'w1') {
        return ['w1Val', 0]; // Return the id where the html will be appeneded to and where to get the information from the w-value rules
      }

      else if (wID == 'w2') {
        return ['w2Val', 1]; // Return the id where the html will be appeneded to and where to get the information from the w-value rules
      }

      else if (wID == 'w3') {
        return ['w3Val', 2]; // Return the id where the html will be appeneded to and where to get the information from the w-value rules
      }

      else if (wID == 'w4') {
        return ['w4Val', 3]; // Return the id where the html will be appeneded to and where to get the information from the w-value rules
      }

      else if (wID == 'w5') {
        return ['w5Val', 4]; // Return the id where the html will be appeneded to and where to get the information from the w-value rules
      }

      else if (wID == 'w6') {
        return ['w6Val', 5]; // Return the id where the html will be appeneded to and where to get the information from the w-value rules
      }

    }

    // Function that is used to collect all the user inputted s values

    function collectWValues() {
        var w1Value = $("#w1Val").val();
        var w2Value = $("#w2Val").val();
        var w3Value = $("#w3Val").val();
        var w4Value = $("#w4Val").val();
        var w5Value = $("#w5Val").val();
        var w6Value = $("#w6Val").val();
        return [w1Value, w2Value, w3Value, w4Value, w5Value, w6Value];
    }


    // Function that is used to collect all the user inputted s values
    function collectSValues() {
        var s1Value = $("#s1Val").val();
        var s2Value = $("#s2Val").val();
        var s3Value = $("#s3Val").val();
        var s4Value = $("#s4Val").val();
        var s5Value = $("#s5Val").val();
        var s6Value = $("#s6Val").val();
        var s7Value = $("#s7Val").val();
        return [s1Value, s2Value, s3Value, s4Value, s5Value, s6Value, s7Value];
    }

    // Function that makes sure no empty user values are passed

    function emptyChecker(currVal) {
      if (!currVal) {
        return true; // If the value that is passed in is invalid or empty, return false right away
      }

      else {
        return false;
      }

    }

    // Change color of box if it isn't valid

    function boxColorChanger(wID, isValid) {
      if (!isValid) {
        $('#' + wID).css('border-color', 'red');
      }

      else {
        $('#' + wID).css('border-color', ""); // If the value is valid, then keep the box its regular color
      }
    }

    // Overall value checker

    function overallChecker(wValues) {
      var currInvalid = true; // Temporary variable used to track if current w values have errors
      var isValid = true; // Bool to track if any errors were encountered
      var total = 0; // Store weight sum
      if (wValues.length != 6) {
          alert("Something went wrong. Please go back to the main page and try again.");
          isValid = false;
      }

      var index = 0;
      var currWVal = 0; // store the current w value
      var intWVal = 0; // Store the integer version of the w value
      for (index; index < wValues.length; index++) {
        currInvalid = true;
        currWVal = wValues[index];
        numWVal = Number(currWVal);
        wID = 'w' + String(index + 1) + 'Val';
        if (currWVal == '') {
            currInvalid = false; // If the value is empty, alert the user
            swal("Error!", "W" + String(index + 1) + " cannot be empty and must only numbers between 0 and 100!", "error");
        }

        else if (numWVal < 0) {
          swal("Error!", "W" + String(index + 1) + " cannot be negative!", "error");
          currInvalid = false; // If the value isn't a positive number, then alert the use
        }

        else if (numWVal.toString() != currWVal) {
          swal("Error!", "W" + String(index + 1) + " can only contain digits between 0-9!", "error");
          currInvalid = false; // If the value contains any special characters, then when it is converted to an integer it will get picked up
        }

        if (!currInvalid) {
          boxColorChanger(wID, false); // Make that box red
          isValid = false;
        }

        else {
          total += numWVal;
          boxColorChanger(wID, true); // Make that box red
        }


      }


      if (isValid && total != 100) {
          swal("Error!", "The sum of the weights must be 100%!", "error");
          isValid = false;
      }

      return isValid;

    }

function displayDValues() {
	var dValues = collectDValues();
	document.getElementById("d1data").placeholder = dValues[0].toFixed(3);
	document.getElementById("d2data").placeholder = dValues[1].toFixed(3);
	document.getElementById("d3data").placeholder = dValues[2].toFixed(3);
	document.getElementById("d4data").placeholder = dValues[3].toFixed(3);
	document.getElementById("d5data").placeholder = dValues[4].toFixed(3);
	document.getElementById("d6data").placeholder = dValues[5].toFixed(3);
}

function collectDValues() {
  var d1Val;
  if (sessionStorage.isDistinct === 'true') {
	  d1Val = 1;
	}

	else {
	  d1Val = 0;
	}

  var sValueArr = stringToNum(); // Get the s-values as numbers
	document.getElementById("d1data").placeholder = d1Val;

  var d2Val = 1 - (sValueArr[1] / sValueArr[0]);
  var d3Val = 1 - (sValueArr[2] / sValueArr[0]);
  var d4Val = 1 - (sValueArr[4] / sValueArr[3]);
  var d5Val = 1 - (sValueArr[5] / sValueArr[3]);
  var d6Val = 1 - (sValueArr[6] / sValueArr[0]);

	return [d1Val, d2Val, d3Val, d4Val, d5Val, d6Val];
}


function stringToNum() {
    var tempArr = sessionStorage.sValues.split(","); // Get the s-values
    var finalArr = [];
    var index = 0;
    for (index; index < tempArr.length; index++) {
        finalArr.push(parseInt(tempArr[index]));
    }

    return finalArr;

}


    // Arrows for help

    tippy('#d1', {
        content: 'D1 is set to 1 if you chose the distinct method. Otherwise, it is 0',
        placement: 'bottom',
        animation: 'scale',
        inertia: true,
      });

    tippy('#d2', {
        content: 'D2 = 1 - (S2 / S1)',
        placement: 'bottom',
        animation: 'scale',
        inertia: true,
      });

      tippy('#d3', {
          content: 'D3 = 1 - (S3 / S1)',
          placement: 'bottom',
          animation: 'scale',
          inertia: true,
        });

      tippy('#d4', {
          content: 'D4 = 1 - (S5 / S4)',
          placement: 'bottom',
          animation: 'scale',
          inertia: true,
        });

        tippy('#d5', {
            content: 'D5 = 1 - (S6 / S4)',
            placement: 'bottom',
            animation: 'scale',
            inertia: true,
        });

      tippy('#d6', {
          content: 'D6 = 1 - (S7 / S1)',
          placement: 'bottom',
          animation: 'scale',
          inertia: true,
      });




// **** EVENT FUNCTIONS ****

$("#nextPageButton").click(function() {
    // sValues = collectSValues(); // Get all the s1values from the user
    var sValues = [];
    sessionStorage.isDistinct = $("#d1Val").is(':checked');
    sessionStorage.sValues = collectSValues(sValues);

});

$("#calcButton").click(function() {
	var dValues = collectDValues();
	var wValues = collectWValues(); //grabs the array of weights
	var noError = overallChecker(wValues);
	if (!noError || wValues.length != dValues.length) {
    		return;
  	}

  var index = 0;
  var result = 0; // Store final DSQI value
  for (index; index < dValues.length; index++) {
      result += dValues[index] * wValues[index];
  }

  result = (result / 100).toFixed(3); // Convert the dsqi value to a decimal with up to 3 decimal values

  if (result > 0.25) {
    swal("Congratuations!", "Your DSQI is " + result + "! That is higher than average!", "success");
  }

  else if(result < 0.15) {
    swal("Bummer!", "Your DSQI is " + result + ". That is lower than average.", "error");
  }

  else {
    swal("Spot on!", "Your DSQI is " + result + ". That is pretty average!", "info");
  }

});

// ERROR HANDLING FOR WEIGHT VALUES



    $(".wVal").on("input", function() {
        var currID = String(($(this).attr('id')));; // Get the current id of the element
        var currIDNumber = currID.substr(1, 1); // Get the specific number next to the W in wVal
        var currVal = $("#" + currID).val();; // Save the current weight value
        currVal = Number(currVal);
        if (currVal < 0) {
          swal("Error!","W" + currIDNumber + " cannot be negative!", "error");
          boxColorChanger(currID, false);
        }

        else {
           boxColorChanger(currID, true);
        }

    });

});
