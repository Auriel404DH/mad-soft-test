import styles from './styles.module.css'
import { useAppDispatch } from '../../hooks'
import { resetData } from '../../redux/slices/testSlice'

const EndScreen = () => {
    const dispatch = useAppDispatch()

    const restartText = () => {
        dispatch(resetData())
    }

    return (
        <div className={styles.wrapper}>
            <div>Тест завершен!</div>
            <button onClick={restartText} className={styles.againButton}>Заново</button>
        </div>
    )
}

export default EndScreen