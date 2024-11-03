import Timer from './Timer'
import '../css/TimerApp.css'

const TimerApp = () => {
  return (
    <div className='TimerApp'>
      <div ><Timer title = 'My Timer 1' endTime = {12} elapsedTime = {2}/></div>     
      <div ><Timer title = 'My Timer 2' endTime = {13} elapsedTime = {3}/></div>     
      <div ><Timer title = 'My Timer 3' endTime = {3599} elapsedTime = {3500}/></div>     
      <div ><Timer title = 'My Timer 4' endTime = {4600} elapsedTime = {0}/></div>     
    </div>
  )
}

export default TimerApp