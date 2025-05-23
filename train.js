// timer unit display variable
var hour=document.getElementById("hour")
var min=document.getElementById("min")
var sec=document.getElementById("sec")
// timer control variable
var ins=document.getElementById('in');
var de=document.getElementById('de');

var start=document.getElementById('start');
var pause=document.getElementById('pause')
// timer control function

// clocking running------------------------------------------------------------
//the id variable for the clear interval to stop the clock
let timerInterval;
//the clock using the Date.time() when you log a minutes and click the star button
//it will translate the minute to ms unit similar with Date.time() for calculating
//the idea is calculate the duration then the duration +datetime we will have end time and remaining time= endtime- date time
// so the remaining time is the main variable for the timer when the remaining time got to 0 the clock will stop and alert the user
// a important idea is to pause the timer
let endtime;
//the remainning
var remainning;
//  minute update it can use to end the clock or expand the timer!!!!
ins.addEventListener('click',()=>{
    min.innerHTML=parseInt(min.innerText)+1;
    if(remainning)
    {
        endtime=endtime+60*1000
    }
})
de.addEventListener('click',()=>{
    if(min.innerText>0&&!remainning)
    {
        min.innerHTML=parseInt(min.innerText)-1;
    }
    if(remainning)
    {
        endtime=endtime-60*1000
    }
})



//main function calculate the remainning and display the min,sec and stop it when hit 0
const CountDownClock=()=>{
    remainning=endtime-Date.now();
    min.innerHTML=Math.floor(remainning/60000);
    sec.innerHTML=Math.floor((remainning%60000)/1000);
    if(remainning<=0){
        clearInterval(timerInterval)
        alert("Het gio nghi!");
        min.innerHTML='00';
        sec.innerHTML='00';
        // for remainning to be nan so the pause funtion would work
        //go to the start timer we will have endtime =(remainning||duration)+Date.now();
        //that be cause when we pause the timer we will use the remainning for counting not the duration 
        //and if we start again we will need to use the duration so put the remain in nan for the use of duration
        remainning=NaN
    }
}
const StartTimer=()=>{
    let duration=parseInt(min.innerText)*60*1000
    //important factore
    endtime =(remainning||duration)+Date.now();   
    // need to clear the inter val before run to clear all the running clock 
    clearInterval(timerInterval)
    timerInterval=setInterval(CountDownClock,1000);
}

// use for start button
start.addEventListener('click',StartTimer);
//use for pause button
pause.addEventListener('click',()=>{
    clearInterval(timerInterval);
})