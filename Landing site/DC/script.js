function ClockTime ()
{
  let date = new Date();
  var Hour = date.getHours();
  var Minute =date.getMinutes();
  var Seconds =date.getSeconds();
  var session = "AM";

  if(Hour==0){
    Hour=12;
  }
  if(Hour>12){
    Hour=Hour-12;
    session = "PM";
  }
//
  Hour=(Hour<10)? "0"+Hour :Hour;
  Minute = (Minute<10)? "0"+Minute :Minute;
  Seconds = (Seconds<10)? "0"+Seconds : Seconds;
//
  var time = Hour +":"+ Minute+":"+ Seconds + " " + session;
  document.getElementById("Clock2").innerHTML= time;
  // document.getElementById("Clock").textContent= time;
  setTimeout(ClockTime,1000);
}


function ShadeDays()
{
  let date = new Date();
  var day = date.getDay();

  if(day==0){
    document.getElementById("Sunday").setAttribute("class","chosen");
  }
  else if(day==1){
    document.getElementById("Monday").setAttribute("class","chosen");
  }
  else if(day==2){
    document.getElementById("Tuesday").setAttribute("class","chosen");
  }
  else if(day==3){
    document.getElementById("Wednesday").setAttribute("class","chosen");
  }
  else if(day==4){
    document.getElementById("Thursday").setAttribute("class","chosen");
  }
  else if(day==5){
    document.getElementById("Friday").setAttribute("class","chosen");
  }
  else if(day==6){
    document.getElementById("Saturday").setAttribute("class","chosen");
  }

}
ShadeDays();
ClockTime();
