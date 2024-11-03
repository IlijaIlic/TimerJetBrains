/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from 'react'
import '../css/Timer.css'



const Timer = ({title, endTime, elapsedTime}) => {

  const [timerStatus, setTimerStatus] = useState(false);
  const [passedTimeForAnim, setPassedTimeForAnim] = useState(elapsedTime);
  const [passedTime, setPassedTime] = useState(elapsedTime * 1000);
  const [endTimeState, setEndTimeState] = useState(endTime);
  const startTime = useRef(0)
  const animationFrameRef = useRef(null);

   // CSS ANIMATIONS
   const [rotatingPart, setRotatingPart] = useState({
    animationName: 'rotation',
    animationIterationCount: 1,
    animationTimingFunction: 'linear',
  });

  const [rotatingPart2, setRotatingPart2] = useState({
    animationName: 'rotation2',
    animationIterationCount: 1,
    animationTimingFunction: 'linear',
    animationFillMode: "forwards",
  });

  const [fixedPart, setFixedPart] = useState({
     animationName: "fixed-part",
    animationIterationCount: 1,
    animationTimingFunction: "step-end",
    animationFillMode: "forwards",
  });

  const [flashingPart, setFlashingPart] = useState({});

  const pausedAnim = timerStatus ? 'running' : 'paused';
  const endTimeFormatted = endTime + "s";
  const elapsedTimeFormatted = "-" + passedTimeForAnim + "s";

  useEffect(() => {
    try {
      if(endTimeState > 3599){
        setEndTimeState(3599);
        throw new Error('Maximum time is 59 minutes and 59 seconds');
      }
    }
    catch(error) {
      console.log(error);
      alert(`Timer ${title} is longer than 59 minutes and 59 seconds, resetting to 59 minutes and 59 seconds...`);
    }  
  
  }, [endTimeState]);

  useEffect(() => {
    if (timerStatus) {
      startTime.current = Date.now() - passedTime;
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [timerStatus]);

  
  const updateTimer = () => {
    const currentTime = Date.now();
    const passedTimeInTimer = currentTime - startTime.current;
    
    if (passedTimeInTimer / 1000 >= endTimeState) {
      setPassedTime(endTimeState * 1000);
      setTimerStatus(false);
      cancelAnimationFrame(animationFrameRef.current);

      onEnd();

      return;
    }
    setPassedTime(passedTimeInTimer);
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };


  
  
  function startTimer(){
    setTimerStatus(true);
    startTime.current = Date.now() - passedTime;
  }

  function pauseTimer(){
    setTimerStatus(false);
  }

  function resetTimer() {
    setTimerStatus(false);
    setPassedTime(0);
    setPassedTimeForAnim(0);
    cancelAnimationFrame(animationFrameRef.current);
  
    setRotatingPart({ animationName: 'none' });
    setRotatingPart2({ animationName: 'none' });
    setFixedPart({ animationName: 'none' });
  
    setTimeout(() => {
      setRotatingPart({
        animationName: 'rotation',
        animationIterationCount: 1,
        animationTimingFunction: 'linear',
      });
  
      setRotatingPart2({
        animationName: 'rotation2',
        animationIterationCount: 1,
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',
      });
  
      setFixedPart({
        animationName: 'fixed-part',
        animationIterationCount: 1,
        animationTimingFunction: 'step-end',
        animationFillMode: 'forwards',
      });
  
      setFlashingPart({}); 
    }, 25); 
  }
  
  function onEnd() {
    setFlashingPart({
      animationName: "flashing",
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
    });
  }

  // DISPLAYED TIME
  function formatTime(){
    let minutes = Math.floor(passedTime / (1000 * 60 ) % 60);
    let seconds = Math.floor(passedTime / (1000) % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  function formatTimeRemaining(){

    let rem = endTimeState - Math.floor((passedTime / 1000));
    let minutes = Math.floor(rem / 60  % 60);
    let seconds = Math.floor(rem % 60);
    if(minutes < 0 || seconds < 0){
      return '00:00'
    }else{
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  }


  // HTML ELEMENTS
  return (
    <div className='timer'>
      <div className='circles'>
        <div className='outside-circle' style={{border: '1px solid #26273d'}} />
        <div className='outside-circle' style={{backgroundColor:'transparent', border: '1px solid #26273d', zIndex: 10}} />

        <div className={'half-circle'} style={{zIndex: 4, rotate: '-90deg'}}>
          <div id='a3' className={'firstPart'}  style={{...fixedPart, backgroundColor: '#545576', animationPlayState: pausedAnim, animationDuration: endTimeFormatted, animationDelay: elapsedTimeFormatted}} />
          <div className='secondPart'/> 
        </div>

        <div id='a1' className={'half-circle'}  style={{...rotatingPart, zIndex: 3 , rotate: '-90deg', animationDuration: endTimeFormatted, animationPlayState: pausedAnim, animationDelay: elapsedTimeFormatted}}>
          <div id='a4' className='firstPart' style={ {...flashingPart, backgroundColor: '#67cb88'}} />
          <div className='secondPart'/> 
        </div>

        <div id='a2' className={'half-circle'}  style={{...rotatingPart2,  zIndex: 2 , rotate: '-90deg', animationDuration: endTimeFormatted, animationPlayState: pausedAnim, animationDelay: elapsedTimeFormatted}}>
          <div id='a5' className='firstPart' style={ {...flashingPart, backgroundColor: '#67cb88'}} />
          <div className='secondPart'/> 
        </div>

        <div className='inside-circle'>     
          <p className='title-left'>{title}</p>
          <p className='time'>{formatTime()}</p>
          <p className='title-left'>{formatTimeRemaining()} left</p>
        </div>

      </div>

        <div className='button-group'>
          <button className='buttons' onClick={startTimer}>Start</button>  
          <button className='buttons' onClick={pauseTimer}>Pause</button>
          <button className='buttons' onClick={resetTimer}>Reset</button>
        </div>
        
    </div>
  )
}

export default Timer