/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from 'react'
import '../css/Timer.css'



const Timer = ({title, endTime, elapsedTime}) => {

  //const intervalRef = useRef(0)
  const [timerStatus, setTimerStatus] = useState(false);
  const [passedTime, setPassedTime] = useState(0);
  const startTime = useRef(0)
  const animationFrameRef = useRef(null);


  const pausedAnim = timerStatus ? 'running' : 'paused';

  const endTimeFormatted = endTime + "s";


  const updateTimer = () => {
    const currentTime = Date.now();
    const passedTimeInTimer = currentTime - startTime.current;
    
    if (passedTimeInTimer / 1000 >= endTime) {
      setPassedTime(endTime * 1000);
      setTimerStatus(false);
      cancelAnimationFrame(animationFrameRef.current);
      return;
    }
    
    setPassedTime(passedTimeInTimer);
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };
  
  useEffect(() => {
    if (timerStatus) {
      startTime.current = Date.now() - passedTime;
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [timerStatus]);

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
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='Timer'>
      <div className='circles'>
        <div className='outside-Circle' style={{border: '1px solid #26273d'}} />
        <div className='outside-Circle' style={{backgroundColor:'transparent', border: '1px solid #26273d', zIndex: 10}} />

        <div className={'half-Circle'} style={{zIndex: 4, rotate: '-90deg'}}>
          <div className={'firstPart'+ ' ' + 'fixedPart' } style={ {backgroundColor: '#545576', animationPlayState: pausedAnim}} />
          <div className='secondPart'/> 
        </div>

        <div className={'half-Circle' + ' ' + 'rotating-anim'}  style={{zIndex: 3 , rotate: '-90deg', animationDuration: endTimeFormatted, animationPlayState: pausedAnim}}>
          <div className='firstPart' style={ {backgroundColor: '#67cb88'}} />
          <div className='secondPart'/> 
        </div>

        <div className={'half-Circle' + ' ' + 'rotating-anim2'}  style={{zIndex: 2 , rotate: '-90deg', animationDuration: endTimeFormatted, animationPlayState: pausedAnim}}>
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