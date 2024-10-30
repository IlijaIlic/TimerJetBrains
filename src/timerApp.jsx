import Timer from './components/Timer'
import './TimerApp.css'

const TimerApp = () => {
  return (
    <div className='TimerApp'>
      <div ><Timer title = 'Moj Tajmer' endTime = {'10s'} elapsedTime = {0}/></div>     
    </div>
  )
}

export default TimerApp