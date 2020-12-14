$(document).ready(function() {
    // ALL CODE GOES IN HERE

    var sValueRules = [
      [
        'S1 represents the total number of modules',
        'S1 cannot be a negative number or 0',
        'S1 must be greater than S2, S3, and S7'
      ],

      [
        'S2 represents the number of modules that rely on correct data input from the source or for produce data to be used elsewhere',
        'S2 cannot be a negative number',
        'S2 must be smaller than S1'
      ],

      [
        'S3 represents the number of modules that rely on prior processing',
        'S3 cannot be a negative number',
        'S3 must be smaller than S1'
      ],

      [
        'S4 represents the number of database items',
        'S4 cannot be a negative number and must be greater than 0',
        'S4 needs to be greater than S5 and S6'
      ],

      [
        'S5 represents the total number of unique database items',
        'S5 cannot be a negative number and must have a value smaller than S4'
      ],

      [
        'S6 represents the total number of segments in the database',
        'S6 cannot be a negative number and must have a value smaller than S4'
      ],

      [
        'S7 represents the number of modules with a single entry and exit point',
        'S7 cannot be a negative number and must have a value smaller than S1'
      ],

      [
        'If your program uses a data-oriented or object oriented architectural design approach, then it uses the distinct method.',
        'The distinct method box will set the D1 value (on the next page) either to 1 or 0 on the next page',
        'Checking this box means that the distinct method will be used and the D1 value will be set to 1',
        'If this box is left unchecked, then the distinct method will not be used and the D1 value will be 0'
      ]

    ]; // Store rules that each s value must abide by

    // ***** FUNCTIONS *****

    /// Function that is used to find which of the sValue buttons the user clicked

    function findSValue(sID) {
      if (sID == 's1') {
        return ['s1Val', 0]; // Return the id where the html will be appeneded to and where to get the information from the s-value rules
      }

      else if (sID == 's2') {
        return ['s2Val', 1]; // Return the id where the html will be appeneded to and where to get the information from the s-value rules
      }

      else if (sID == 's3') {
        return ['s3Val', 2]; // Return the id where the html will be appeneded to and where to get the information from the s-value rules
      }

      else if (sID == 's4') {
        return ['s4Val', 3]; // Return the id where the html will be appeneded to and where to get the information from the s-value rules
      }

      else if (sID == 's5') {
        return ['s5Val', 4]; // Return the id where the html will be appeneded to and where to get the information from the s-value rules
      }

      else if (sID == 's6') {
        return ['s6Val', 5]; // Return the id where the html will be appeneded to and where to get the information from the s-value rules
      }

      else if (sID == 's7') {
        return ['s7Val', 6]; // Return the id where the html will be appeneded to and where to get the information from the s-value rules
      }

      else {
        return ['d1Val', 7];
      }

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

    function boxColorChanger(sID, isValid) {
      if (!isValid) {
        $("#" + sID).css('border-color', 'red');
      }

      else {
        $("#" + sID).css('border-color', ""); // If the value is valid, then keep the box its regular color
      }
    }

    // Overall value checker

    function overallChecker(sValues, errorList) {
        if (sValues.length != 7) {
          alert("Something went wrong. Refresh the page and try again");
        }

        var index = 1;
        var s1Val = parseInt(sValues[0]);
        var s4Val = parseInt(sValues[3]);
        for (index; index < sValues.length; index++) {
            if ((index < 3 || index == 6) && parseInt(sValues[index]) > s1Val) {
              boxColorChanger("s1Val", false);
              boxColorChanger("s" + (index + 1) + "Val", false); // If s2, s3, or s7 are less than s1, make their box red
              errorList.push("S1 cannot be less than S" + (index + 1));
            }

            else if (index >= 4 && index < 6 && parseInt(sValues[index]) > s4Val) {
              boxColorChanger("s4Val", false);
              boxColorChanger("s" + (index + 1) + "Val", false); // If s2, s3, or s7 are less than s1, make their box red
              errorList.push("S4 cannot be less than S" + (index + 1));
            }

        }

        return errorList;

    }

    // Function that is used to show the user all their errors

    function errorModal(errorList) {
      $(".overallErrors").remove();
      $("#nextButton").after("<div class = 'overallErrors'></div>");
      $(".overallErrors").append("<div id = 'close'>+</div><br><br>");
      $(".overallErrors").append("<ul id = 'userErrors'></ul>");

      var index = 0;
      for (index; index < errorList.length; index++) {
          $("#userErrors").append("<li>" + errorList[index] + "</li>"); // Output all the rules for that s value
      }

      $("#close").click(function() {
        $(".overallErrors").remove();
      });
    }


    function sValueChecker() {
      if (!sessionStorage.sValues) {
          return false; // If the session storage is empty, return false
      }

      var index = 0;
      var sValueArr = sessionStorage.sValues.split(",");
      for (index; index < sValueArr.length; index++) {
          if (isNaN(sValueArr[index])) {
            return false;
          }
      }

      return true;
    }

    // Put in arrows

    tippy('.sHelp', {
        content: 'Click for help!',
        placement: 'top',
        animation: 'scale',
        inertia: true,
      });


    // Event Functions

    $(".sHelp").click(function() {
        $('.sInformation').remove();
        var backgroundID = String(($(this).attr('id'))); // Get the specific id for the s-value
        var sInfo = findSValue(backgroundID); // Find what the id of the new modal should be called

        var sID = sInfo[0]; // Get new value HTML should be appended to
        var messageNumber = sInfo[1]; // Get the index value to access the appripriate message in the sValueRules arrary

        $("#" + sID).after("<div class = 'sInformation' id = '" + sID + "Information'></div>");
        $("#" + sID + "Information").append("<div id = 'close'>+</div><br><br>");
        $("#" + sID + "Information").append("<ul id = '" + sID + "UL'></ul>");

        var index = 0;
        for (index; index < sValueRules[messageNumber].length; index++) {
            $("#" + sID + "UL").append("<li>" + sValueRules[messageNumber][index] + "</li>"); // Output all the rules for that s value
        }

        $("#close").click(function() {
          $('.sInformation').remove();
        });

    });

    $("input").on("input", function(event) {
      var currID = String(($(this).attr('id'))); // Get the current id value
      var currIDNumber = currID.substr(1, 1);
      var userValue = $("#" + currID).val(); // Get the current user value
      var isValid = (!emptyChecker(userValue) && !isNaN(userValue) && parseInt(userValue) > 0) || userValue === "0"; // Call the value checker functions to see if s-value is valid
      if (Number(userValue) < 0) {
          swal("Error!", "S" + currIDNumber + " cannot be negative!", "error");
      }

      boxColorChanger(currID, isValid);
    });


    $("#nextPageButton").click(function(event) {
        var sValues = collectSValues(); // Get all the s1values from the user
        var index = 0;
        var isValid = true; // Will be used to check if the user values are ALL valid or invalid
        var currInvalid = false; // Will be used as a temporary variable to check if the user value is invalid
        var errorList = [];
        var sID = ""; // Current HTML ID for each s Value
        var currSVal = 0; // store the current s value
        var intSVal = 0; // Store the integer version of the s value
        for (index; index < sValues.length; index++) {
          currInvalid = true;
          currSVal = sValues[index];
          intSVal = parseInt(currSVal);
          sID = 's' + String(index + 1) + 'Val';
          if (emptyChecker(currSVal)) {
              currInvalid = false; // If the value is empty, alert the user
              errorList.push("Invalid " + sID + ". You cannot leave values empty or put special characters");
          }

          else if (intSVal < 0) {
            currInvalid = false; // If the value isn't a positive number, then alert the use
            errorList.push("Invalid " + sID + ". S-Values cannot be negative!");
          }

          else if ((intSVal.toString().length != currSVal.length) || Number(currSVal) != intSVal) {
            currInvalid = false; // If the value contains any special characters, then when it is converted to an integer it will get picked up. Compare the lengths of the two
            errorList.push("Invalid " + sID + ". You cannot put any character other than a digit between 0-9");
          }

          else if ((index == 0 || index == 3) && parseInt(sValues[index]) == 0) {
            currInvalid = false;
            errorList.push("Invalid " + sID + ". " + sID + " values need to be greater than 0!");
          }


          if (!currInvalid) {
            boxColorChanger(sID, false); // Make that box red
            isValid = false;
          }

        }

        if (!isValid) {
          event.preventDefault();
          errorModal(errorList);
          return; // If something went wrong, let the user fix that first better other errors
        }

        var originalLength = errorList.length;
        errorList = overallChecker(sValues, errorList); // Send the error list to find new errors

        if (errorList.length != originalLength) {
          errorModal(errorList);
          event.preventDefault(); // If new errors are added to the error list, prevent submission
          return;
        }
    });

    var ls = sessionStorage.getItem('namespace.visited');
    if (ls == null) {
      sessionStorage.setItem('namespace.visited', 1)
    }

    else if (sValueChecker()) {
      var sValueArr = sessionStorage.sValues.split(",");
      $("#s1Val").attr("value", sValueArr[0]);
      $("#s2Val").attr("value", sValueArr[1]);
      $("#s3Val").attr("value", sValueArr[2]);
      $("#s4Val").attr("value", sValueArr[3]);
      $("#s5Val").attr("value", sValueArr[4]);
      $("#s6Val").attr("value", sValueArr[5]);
      $("#s7Val").attr("value", sValueArr[6]);
      if (sessionStorage.isDistinct === 'true') {
          $("#d1Val").prop("checked", true);
      }

      else {
          $("#d1Val").prop("checked", false);
      }
    }


});
