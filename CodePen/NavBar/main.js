
let names = ["Jason","Gera","Miguel","Edwin"];

function display_time(){
    let date= new Date();
    let hour = date.getHours();
    let minute =date.getMinutes();
    let day = date.getDay();
    let dayname="";
    let type="";
    if(day===0){
        dayname="Sun";
    }
    else if(day===1){
        dayname="Mon";
    }
    else if(day===2){
        dayname="Tue";
    }
    else if(day===3){
        dayname="Wed";
    }
    else if(day===4){
        dayname="Thu";
    }
    else if(day===5){
        dayname="Fri";
    }
    else if(day===6){
        dayname="Sat";
    }
    
    if(hour>12){
        hour-=12;
        type+=" Pm"
    }
    else{
        type+=" Am"
    }

    if(minute<10){
        document.getElementById("time").innerHTML=dayname+" "+hour+":0"+minute+type;
    }
    else{ 
        document.getElementById("time").innerHTML=dayname+" "+hour+":"+minute+type;
    }
  
}
setInterval(function(){display_time()},1);




