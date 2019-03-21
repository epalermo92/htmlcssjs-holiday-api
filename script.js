function generateDay(date,month,year){
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var mom = moment();
  mom.date(date);
  mom.month(month);
  mom.year(year);

  var data = {
    day : mom.format("D ddd"),
    attrDay : mom.format("YYYY-MM-DD"),
  }

  var finalHTML = compiled(data);

  return finalHTML;
}

function printHolidays(holidays){
  for (var i = 0; i < holidays.length; i++) {
    var holiday = holidays[i];
    var holidayDate = holiday.date;
    var holidayName = holiday.name;

    var dayHoliday = $("div[data-date='"+holidayDate+"']");
    dayHoliday.addClass("holiday");
    dayHoliday.text(dayHoliday.text() + holidayName);
  }
}

function getHolidays(month,year){
  var outData = {
    year : year,
    month : month,
  };

  $.ajax({
    url : "https://flynn.boolean.careers/exercises/api/holidays",
    data : outData,
    method : "GET",
    success : function(inData,state){
      if (inData.success) {
        var arrHolidays = inData.response;
        printHolidays(arrHolidays);
      }
    },
    error : function(request,state,error){
      console.log(request);
      console.log(state);
      console.log(error);
    },
  });
}


function printDays(month,year){
  var daysCont = $(".days-container");
  var mom = moment();

  mom.year(year);
  mom.month(month);

  for (var i = 1; i <= mom.daysInMonth() ; i++) {
    var dateToAdd = generateDay(i,month,year);
    daysCont.append(dateToAdd);
  }
}

function printTitle(month,year){
  var h1 = $("#month-title");
  var mom = moment();
  mom.year(year);
  mom.month(month);

  h1.text(mom.format("MMMM YYYY"));
}

function changeMonth(month,year){
  var rightMonth = $("#right-month");
  var leftMonth = $("#left-month");
  var countMonth = month;


  rightMonth.click(function () {
    if (countMonth >= 11) {
      alert("Non puoi andare avanti!!!Il calendario è del 2018!");
    }else {
      $(".day").remove();
      countMonth++;
      printTitle(countMonth,year);
      printDays(countMonth,year);
      getHolidays(countMonth,year);
    }
  });

  leftMonth.click(function () {
    if (countMonth <= 0) {
      alert("Non puoi tornare indietro!!!Il calendario è del 2018!");
    }else {
      $(".day").remove();
      countMonth--;
      printTitle(countMonth,year);
      printDays(countMonth,year);
      getHolidays(countMonth,year);
    }
  });

}

function init(){
  var year = 2018;
  var month = 0;

  printTitle(month,year);
  printDays(month,year);
  getHolidays(month,year);
  changeMonth(month,year);
}

$(document).ready(init);
