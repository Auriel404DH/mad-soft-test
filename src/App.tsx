import styles from './App.module.css'
import ProgressBar from './components/ProgressBar'
import Header from './components/Header'
import Question from './components/Question'
import AddQuestion from './components/AddQuestion'
import { useAppSelector } from './hooks'
import EndScreen from './components/EndScreen'


function App() {
    const { isTestOver } = useAppSelector(({ test }) => test)
    
    return (
      <div className={styles.wrapper}>
          <div className={styles.inner}>
            <AddQuestion />
            {isTestOver ? 
              <EndScreen />
            : (
              <>
                <Header />
                <ProgressBar />
                <Question />
              </>
            )}
          </div>
      </div>
    )
}

export default App
