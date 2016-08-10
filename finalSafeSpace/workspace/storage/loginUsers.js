/* global $ */
/*global data*/
/*global SpreadsheetApp*/

//This file checks if the username is valid

//Load data
//Check array if username and password are there then continue to mainpage 
//if null alert wrong username or password

function checkUsers() {
  var spreadsheet = SpreadsheetApp.openById('16vDNYPQ6afCPdq7ICJ8sm-1Vj0kG4Cs9gOIJMadTYwo');
  var sheet = spreadsheet.getSheetByName('USERS');
  var data = sheet.getDataRange().getValues(); // Fetch values for each row in the Range.
  console.log(data);
  for (var i = 0; i < data.length; ++i) {
    console.log(data[1][i]);

  }
}



function alertWrongLogin() {
    alert('Wrong username or password.');
}






$(document).ready(function(){
    $("#signup-form").submit(function(event){
        checkUsers();
        
    $.ajax({
      type: "get",
      url: "https://script.google.com/macros/s/AKfycbwhUbAHHL0ULLXyQvnc8k7wHCk2j1w0mTDwbmWLIN-z-rgyfiE/exec",
      success: checkUsers(),
    });

});
});
