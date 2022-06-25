content = document.querySelector('.current-time')

let alarmAt
let timeNow
let alarm =false;
ringtone = new Audio("ringtone.mp3")

// to update the clock
setInterval(()=>{
    let date = new Date()
    const time=document.querySelector('#time')
    let hour=date.getHours();
    let minute=date.getMinutes();
    let second=date.getSeconds();
    let day='AM'
    if(hour>12){
        hour-=12
        day='PM'
    }
    hour=hour <10 ? '0'+hour :hour 
    minute = minute<10 ? '0'+minute : minute;
    second = second<10 ? '0'+second : second;
    time.textContent=hour+':'+minute+':'+second+'  '+day
    timeNow=`${hour}:${minute}  ${day}`
    if(alarmAt==timeNow){
        console.log('Alarm Ringing ................')
        ringtone.play()
        content.classList.remove('disable')
        alarm=true
        ringtone.loop=true

    }
},1000)

//to populate options in dropdown
const selectMenue=document.querySelectorAll('select')
for (let i=12;i>0;i--){
    i=i<10 ? '0'+i : i;
    let option = `<option value="${i}">${i}</option>`
    selectMenue[0].firstElementChild.insertAdjacentHTML('afterend',option)
}

for (let i=59;i>=0;i--){
    i=i<10 ? '0'+i : i;
    let option = `<option value="${i}">${i}</option>`
    selectMenue[1].firstElementChild.insertAdjacentHTML('afterend',option)
}

for (let i=2;i>0;i--){
    let ampm = i==1?'AM':'PM';
    let option = `<option value="${ampm}">${ampm}</option>`
    console.log(option)
    selectMenue[2].firstElementChild.insertAdjacentHTML('afterend',option)
}


//to set and pause alarm 
function setAlarm(){
    if(!alarm){
        let alarmTime=`${selectMenue[0].value}:${selectMenue[1].value}  ${selectMenue[2].value}`
        alarmAt=alarmTime
        if(alarmTime.includes('Hour')||alarmTime.includes('Minute')||alarmTime.includes("AM/PM")){
            return alert('Please enter a valid time')
            
        }
        content.classList.add('disable')
        console.log(alarmTime)
        setAlarmBtn.innerText='clear alarm'
        return
    }
    if(alarm){
        alarm =false
        alarmAt=''
        setAlarmBtn.innerText='Set Alarm'
        ringtone.pause()
        selectMenue[0].value='hour'
        selectMenue[1].value='minute'
        selectMenue[2].value='AM/PM'
        return
    }
    
}
setAlarmBtn=document.querySelector('.alarm-btn')
setAlarmBtn.addEventListener('click',setAlarm)

console.log(selectMenue[0].value)