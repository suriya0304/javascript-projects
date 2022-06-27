function app(){
    //selector
    const song=document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline=document.querySelector('.moving-outline circle ')
    const video = document.querySelector('video')
    const timeSelect = document.querySelectorAll('.timer-btn')


    const sound = document.querySelectorAll('.select-ambiance button')

    //display time
    const timeDisplay = document.querySelector('.time-display')

    //duration
    let duration = 300
    
    //select time
    timeSelect.forEach(time=>{
        time.addEventListener('click',()=>{
            duration=time.getAttribute('data-time');
            timeDisplay.innerText=`${Math.floor(duration / 60)}:${Math.floor(duration% 60)}`
            song.pause();
            song.currentTime=0
            play.src='svg/play.svg'
        })
        
    })

    //outline length
    const outlineLength = outline.getTotalLength()
    console.log(outlineLength)

    


    outline.style.strokeDasharray=outlineLength
    outline.style.strokeDashoffset=outlineLength



    play.addEventListener('click',(e)=>{
        checkPlaying()
    })

    function checkPlaying(){
        if(song.paused){
            song.play()
            play.src='svg/pause.svg'
        }
        else{
            song.pause()
            play.src='svg/play.svg'
        }
    }

    //find elapsed time
    song.ontimeupdate=()=>{
        let time = song.currentTime;
        let elapsed = duration - time
        let second=Math.floor(elapsed%60)
        let minute=Math.floor(elapsed/60)

        //animate
        let progress = outlineLength - (time / duration)*outlineLength
        console.log(progress)
        outline.style.strokeDashoffset=progress
        console.log(minute,second)
        timeDisplay.innerText=`${minute}:${second}`
        if(duration<=time){
            song.pause();
            song.currentTime=0
        }
    }
    
    sound.forEach(btn=>{
        btn.addEventListener('click',()=>{
            console.log(song,video)
            video.src=btn.getAttribute('data-video')
            song.src=btn.getAttribute('data-sound')
            play.src='svg/play.svg'
        })
    })

    
}

app()