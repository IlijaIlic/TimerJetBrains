/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from 'react'
import '../css/Timer.css'



const Timer = ({title, endTime, elapsedTime}) => {

  const [timerStatus, setTimerStatus] = useState(false);
  const [passedTime, setPassedTime] = useState(0);
  const intervalRef = useRef(0)
  const startTime = useRef(0)


  const pausedAnim = timerStatus ? 'running' : 'paused';

  useEffect(() => {
    if(timerStatus){
      intervalRef.current = setInterval(() => {
        setPassedTime(Date.now() - startTime.current)
      }, 1000);
    }
    
    return () => clearInterval(intervalRef.current) 
  },[timerStatus])


  function startTimer(){
    setTimerStatus(true);
    startTime.current = Date.now() - passedTime;
  }

  function pauseTimer(){
    setTimerStatus(false);
  }

  function formatTime(){
    let minutes = Math.floor(passedTime / (1000 * 60 ) % 60);
    let seconds = Math.floor(passedTime / (1000) % 60);
    if (passedTime >= 10000){ 
      
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='Timer'>
      <div className='circles'>
        <div className='outside-Circle' />

        <div className={'half-Circle'} style={{zIndex: 4, rotate: '-90deg'}}>
          <div className={'firstPart'+ ' ' + 'fixedPart'} style={ {backgroundColor: '#545576', animationPlayState: pausedAnim}} />
          <div className='secondPart'/> 
        </div>

        <div className={'half-Circle' + ' ' + 'rotating-anim'}  style={{zIndex: 3 , rotate: '-90deg', animationDuration: endTime, animationPlayState: pausedAnim}}>
          <div className='firstPart' style={ {backgroundColor: '#67cb88'}} />
          <div className='secondPart'/> 
        </div>

        <div className={'half-Circle' + ' ' + 'rotating-anim2'}  style={{zIndex: 2 , rotate: '-90deg', animationDuration: endTime, animationPlayState: pausedAnim}}>
          <div className='firstPart' style={ {backgroundColor: '#67cb88'}} />
          <div className='secondPart'/> 
        </div>

        <div className='inside-Circle'>     
          <p className='title-left'>{title}</p>
          <p className='time'>{formatTime()}</p>
          <p className='title-left'>{endTime} left</p>
        </div>

      </div>

        <div className='button-group'>
          <button className='buttons' onClick={startTimer}>Start</button>  
          <button className='buttons' onClick={pauseTimer}>Pause</button>
           <button className='buttons'>Reset</button>
        </div>
        
    </div>
  )
}

export default Timer