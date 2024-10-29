/* eslint-disable react/prop-types */

import { useEffect } from 'react'
import '../css/Timer.css'



const Timer = ({title, endTime, elapsedTime}) => {

  
  useEffect(() => {
    console.log(title, endTime, elapsedTime)
  },[])

  return (
    <div className='Timer'>
      <div className='circles'>
        <div className='outside-Circle' />

        <div className={'half-Circle'} style={{zIndex: 4, rotate: '-90deg'}}>
          <div className={'firstPart'+ ' ' + 'fixedPart'} style={ {backgroundColor: '#545576'}} />
          <div className='secondPart'/> 
        </div>

        <div className={'half-Circle' + ' ' + 'rotating-anim'}  style={{zIndex: 3 , rotate: '-90deg', animationDuration: endTime}}>
          <div className='firstPart' style={ {backgroundColor: '#67cb88'}} />
          <div className='secondPart'/> 
        </div>

        <div className={'half-Circle' + ' ' + 'rotating-anim2'}  style={{zIndex: 2 , rotate: '-90deg', animationDuration: endTime}}>
          <div className='firstPart' style={ {backgroundColor: '#67cb88'}} />
          <div className='secondPart'/> 
        </div>

        <div className='inside-Circle'>     
          <p className='title-left'>{title}</p>
          <p className='time'>00:00</p>
          <p className='title-left'>{endTime} left</p>
        </div>

      </div>

        <div className='button-group'>
          <button className='buttons'>Start</button>  
          <button className='buttons'>Pause</button>
           <button className='buttons'>Reset</button>
        </div>
        
    </div>
  )
}

export default Timer