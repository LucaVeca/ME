$(function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  });

var txt = $( ".btn-split" ).text();
$( ".btn-split" ).attr("name", txt);

var txt = $( ".btn-loop" ).text();
$( ".btn-loop" ).attr("name", txt);

