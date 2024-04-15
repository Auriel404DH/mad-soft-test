import Timer from '../Common/Timer'
import styles from './styles.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
        <div className={styles.title}>Тестирование</div>
        <Timer />
    </div>
  )
}

export default Header