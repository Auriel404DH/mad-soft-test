import styles from './styles.module.css'
import { useAppDispatch } from '../../../hooks'
import { resetData, toggleIsTimeOver } from '../../../redux/slices/testSlice'

const TimeIsOut = () => {
    const dispatch = useAppDispatch()

    const onReset = () => {
        dispatch(toggleIsTimeOver())
        dispatch(resetData())
    }

    return (
        <div className={styles.wrapper}>
            <div>Время вышло!</div>
            <button onClick={onReset} className={styles.submitButton}>
                Еще раз
            </button>
        </div>
    )
}

export default TimeIsOut