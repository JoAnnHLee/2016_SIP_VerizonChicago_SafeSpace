/* global $ */
/*gloabl data*/
//On button click for sign up post info to database
//https://safespace123.cloudant.com/safe-space/_all_docs
//<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
//<script src="path/to/your/script.js"></script>





var JSONURL = 'https://spreadsheets.google.com/feeds/list/16vDNYPQ6afCPdq7ICJ8sm-1Vj0kG4Cs9gOIJMadTYwo/1/public/basic?alt=json';


//URL for USERS sheet data
var SCRIPTURL = 'https://script.google.com/macros/s/AKfycbwhUbAHHL0ULLXyQvnc8k7wHCk2j1w0mTDwbmWLIN-z-rgyfiE/exec';
console.log("running");


function callback(data){
    var rows = [];
    var cells = data.feed.entry;
    
    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.timestamp = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
    }
    
    var raw = document.createElement('p');
    raw.innerText = JSON.stringify(rows);
    document.body.appendChild(raw);
}
/*global request*/
console.log("RUNNING");
$(document).ready(function(){
    $("#signup-form").submit(function(event){
            event.preventDefault();
            var data = $(this).serialize();
            console.log(data);
            console.log("signup form read");
            
        $.ajax({
        url:'https://script.google.com/macros/s/AKfycbwhUbAHHL0ULLXyQvnc8k7wHCk2j1w0mTDwbmWLIN-z-rgyfiE/exec',
        type: "POST",
        data: data
        });
    });
    
    $.ajax({
        url:JSONURL,
        success: function(data){
            callback(data);
        }
    });

});

