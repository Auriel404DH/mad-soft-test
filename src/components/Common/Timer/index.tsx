import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleIsTimeOver } from '../../../redux/slices/testSlice';


const Timer = () => {
    const dispatch = useAppDispatch()

    const { isTimeOver } = useAppSelector(({ test }) => test)

    const [seconds, setSeconds] = useState(10);
    const [isActive, setIsActive] = useState(true);
  
    useEffect(() => {
        if (!isActive) return

        const intervalId = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1);
            } else {
                dispatch(toggleIsTimeOver())
                setIsActive(false);
            }
        }, 1000);
  
      return () => clearInterval(intervalId);
    }, [isActive, seconds]);

    useEffect(() => {
        if (isTimeOver) {
            setSeconds(0)
            setIsActive(false)
        } else {
            setSeconds(10)
            setIsActive(true)
        }
    }, [isTimeOver])
  
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return (
        <div className={styles.timer}>{formatTime(seconds)}</div>
    )
}

export default Timer