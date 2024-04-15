import React, { useMemo } from 'react'
import { useAppSelector } from '../../../hooks';
import cn from 'classnames'
import styles from './styles.module.css'

type IProps = {
    selectedIds: number[]
    onPrev: () => void;
    onSubmit: () => void;
}

const NavigateButtons: React.FC<IProps> = ({ onSubmit, selectedIds, onPrev }) => {

    const { 
        questionsData, 
        currentQuestionId, 
    } = useAppSelector(({ test }) => test)


    const lastQuestion = useMemo(() => {
        return questionsData[questionsData.length - 1]
    }, [questionsData])

    const firstQuestion = useMemo(() => {
        return questionsData[0]
    }, [questionsData])

    return (
        <div className={styles.buttonsWrapper}>
            {firstQuestion.questionId !== currentQuestionId && (
                <button 
                    onClick={onPrev} 
                    className={styles.submitButton}
                >
                    Назад
                </button>
            )}
            <button onClick={onSubmit} className={cn(styles.submitButton, {
                [styles.disabledButton]: selectedIds.length === 0 
            })}>
                {lastQuestion.questionId === currentQuestionId ? 'Завершить' : 'Ответить'}
            </button>
        </div>
    )
}

export default NavigateButtons