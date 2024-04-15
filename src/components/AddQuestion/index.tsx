import React, { useState } from 'react'
import styles from './styles.module.css'
import AddQuestionPopup from '../Common/AddQuestionPopup'

const AddQuestion = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const onTogglePoppup = () => setIsPopupOpen(prev => !prev)

    return (
        <>
            {isPopupOpen && <AddQuestionPopup onTogglePoppup={onTogglePoppup} />}
            <div onClick={onTogglePoppup} className={styles.wrapper}>
                Добавить
            </div>
        </>
    )
}

export default AddQuestion