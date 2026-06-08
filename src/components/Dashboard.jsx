import Clock from './Clock'
import CalendarWidget from './CalendarWidget'
import WeatherWidget from './WeatherWidget'
import DevPanel from './DevPanel'
import '../styles/dashboard.css'
import '../styles/makeup-mode.css'
import '../styles/dev.css'

export default function Dashboard({ mirror }) {
  return (
    <>
      <div
        className={`dashboard${mirror.isMakeupMode ? ' dashboard--makeup' : ''}`}
      >
        <div className="dashboard__clock">
          <Clock hidden={mirror.isMakeupMode} />
        </div>

        {!mirror.isMakeupMode && (
          <>
            <div className="dashboard__weather">
              <WeatherWidget />
            </div>

            <div className="dashboard__calendar">
              <CalendarWidget events={mirror.calendarEvents} />
            </div>
          </>
        )}
      </div>

      {import.meta.env.DEV && <DevPanel mirror={mirror} />}
    </>
  )
}
