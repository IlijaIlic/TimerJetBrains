import Timer from './components/Timer'
import './TimerApp.css'

const TimerApp = () => {
  return (
    <div className='TimerApp'><Timer title = 'Moj Tajmer' endTime = {'10s'} elapsedTime = {0}/></div>
  )
}

export default TimerApp