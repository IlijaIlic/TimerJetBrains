
import '../css/Timer.css'

const Timer = () => {
  return (
    <div className='Timer'>
        <div className='inside-Circle'>
            <p className='title-left'>Title from Props</p>
            <p className='time'>00:00</p>
            <p className='title-left'>25:00 left</p>
        </div>
        <div className='button-group'>
            <button className='buttons' onClick={console.log('Start') }>Start</button>  
            <button className='buttons' onClick={console.log('Pause')}>Pause</button>
            <button className='buttons' onClick={console.log('Reset')}>Reset</button>
        </div>
    </div>
  )
}

export default Timer