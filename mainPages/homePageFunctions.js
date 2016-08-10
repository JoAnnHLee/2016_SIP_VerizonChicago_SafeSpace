  
  //Google Map Code
  var geocoder; 
  var map;  
  var pos;
  function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 20,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map'),myOptions);
    var infoWindow = new google.maps.InfoWindow({map: map});
          
    // Try HTML5 geolocation.
    if (navigator.geolocation) {    
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
    
      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Current Location');
      map.setCenter(pos);
    }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  function codeAddress() {
    var address = document.getElementById("address").value;
    console.log(address);
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
      map: map,
      draggable: true,
      position: results[0].geometry.location
        
    }); 
        
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
    });
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
                              
  }
      
 function printLatLong() {
  var webpageForLatLong = 'http://www.latlong.net/c/?lat=' + pos.lat + '&long=' + pos.lng ;
  console.log(pos);
  console.log(webpageForLatLong);
 }
      



/* Function to display a Countdown timer with starting time from a form */
/*global $*/
/*global okayButton*/
/*global alertBox*/
$(document).ready(function(){
    $("button").click(function(){
        var h1 = $("h1");
        h1.animate({left: '100px'}, "slow");
        h1.animate({fontSize: '3em'}, "slow");
        alert("This button does not really have a purpose...");
        
    });
    

});





/* Function to display a Countdown timer with starting time from a form */
// sets variables for minutes and seconds
var ctmnts = 0;
var ctsecs = 0;
var startchr = 0;       // used to control when to read data from form

function countdownTimer() {
  // http://coursesweb.net/javascript/
  // if $startchr is 0, and form fields exists, gets data for minutes and seconds, and sets $startchr to 1
  if(startchr == 0 && document.getElementById('mns') && document.getElementById('scs')) {
    // makes sure the script uses integer numbers
    ctmnts = parseInt(document.getElementById('mns').value) + 0;
    ctsecs = parseInt(document.getElementById('scs').value) * 1;

    // if data not a number, sets the value to 0
    if(isNaN(ctmnts)) ctmnts = 0;
    if(isNaN(ctsecs)) ctsecs = 0;

    // rewrite data in form fields to be sure that the fields for minutes and seconds contain integer number
    document.getElementById('mns').value = ctmnts;
    document.getElementById('scs').value = ctsecs;
    startchr = 1;
    document.getElementById('btnct').setAttribute('disabled', 'disabled');     // disable the button
  }

  // if minutes and seconds are 0, sets $startchr to 0, and return false
  if(ctmnts==0 && ctsecs==0) {
    startchr = 0;
    document.getElementById('btnct').removeAttribute('disabled');     // remove "disabled" to enable the button

    /* HERE YOU CAN ADD TO EXECUTE A JavaScript FUNCTION WHEN COUNTDOWN TIMER REACH TO 0 */
    callTimerDoneAlert();
    return false;
  }
  else {
    // decrease seconds, and decrease minutes if seconds reach to 0
    ctsecs--;
    if(ctsecs < 0) {
      if(ctmnts > 0) {
        ctsecs = 59;
        ctmnts--;
      }
      else {
        ctsecs = 0;
        ctmnts = 0;
      }
    }
  }

  // display the time in page, and auto-calls this function after 1 seccond
  document.getElementById('showmns').innerHTML = ctmnts;
  document.getElementById('showscs').innerHTML = ctsecs;
  setTimeout('countdownTimer()', 1000);
}
//End of countdown timer code
var stoppedTimer;
function stopTimer() {
  stoppedTimer = true;
  ctmnts = 0;
  ctsecs = 0;
  startchr = 0;
  clearTimeout(timeOutForCustomAlert);
}
//Press stop timer triggers stop alert 

//Currently stop timer does not stop the alert


function startTimer() {
  stoppedTimer = false;
}





var alertBox;
var timeOutForCustomAlert;
function customAlert(msg,duration) {
  alertBox = document.createElement("h2");
  alertBox.setAttribute("style","border: solid 5px red;width:auto;height:auto;top:50%;left:40%;background-color:#bda0cb;color:#7f00ff");
  alertBox.innerHTML = "<h1>"+msg+"</h1>";
  
  timeOutForCustomAlert = setTimeout(function() { //Clear timeout function to  eofjwejfbjiwef
    //Removes the alert box and then runs the not okay alert and informs user that info has been sent
    alertBox.parentNode.removeChild(alertBox);
    okayButton.parentNode.removeChild(okayButton);
    notOkay();
  },duration);
  
  $( ".container" ).append(alertBox); //Adds the alert box to the div that has the container class
}

var secondsLeft;
var okayButton;
function callTimerDoneAlert() {
    okayButton = document.createElement("button");
    okayButton.innerHTML = "Confirm Okay";
    $(".container").append(okayButton);
    secondsLeft = 15;
    
    for (var i = 1; i<secondsLeft; ++i){
      setInterval(function(){
        secondsLeft= secondsLeft-1;
      }, 1000);
      
    }
    
    customAlert("You have " + secondsLeft +" seconds to confirm you are okay until a message is sent to your emergency contact","15000");

    
    okayButton.addEventListener ("click", function() {
      alert("You have confirmed you are okay. :)");
      alertBox.parentNode.removeChild(alertBox);
      okayButton.parentNode.removeChild(okayButton);
    
    });
    
}


//Alert function if message is sent
function notOkay() {
  alert("*YOU HAVE NOT CONFIRMED THAT YOU ARE OKAY! MESSAGE SENT TO EMERGENCY CONTACT*");

  sendEmail();
  console.log(pos);
  
}






//Actual emergency contact message sent
//JoAnn's Code will go here
/*global SpreadsheetApp*/
/*global MailApp*/
var EMAIL_SENT = "EMAIL_SENT";

function sendEmails() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 10;   // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 10)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[6];
    var locationInit = row[7];
    var locationFin = row[8];
    var message = "Help! " + row[3] + ",\has gone missing moving from " +row[7] + "\ to " + row[8] + "\ Please try to contact them. If they continue to not respond, please contact your local authorities" ; // Assemble the body text
    var emailSent = row[9];
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
      var subjectSent =  "Help!\ " +row[3] + " \is in trouble!";
      MailApp.sendEmail(emailAddress, subjectSent, message);
      sheet.getRange(startRow + i, 10).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}