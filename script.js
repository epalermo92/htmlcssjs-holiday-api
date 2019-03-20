function generateDay(date,month){
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var mom = moment();
  mom.date(date);
  mom.month(month);

  var data = {
    day : mom.format("DD MMMM"),
  }

  var finalHTML = compiled(data);

  return finalHTML;
}


function printDays(month,year){
  var daysList = $("#days-list");
  var mom = moment();

  mom.year(year);
  mom.month(month);

  for (var i = 1; i <= mom.daysInMonth() ; i++) {
    var dateToAdd = generateDay(i,month);
    daysList.append(dateToAdd);
  }
}

function printTitle(month,year){
  var h1 = $("#month-title");
  var mom = moment();
  mom.year(year);
  mom.month(month);

  h1.text(mom.format("MMMM YYYY"));
}

function init(){
  var year = 2018;
  var month = 0;

  printTitle(month,year);
  printDays(month,year);
}

$(document).ready(init);
