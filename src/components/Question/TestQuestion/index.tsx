import React from 'react'
import styles from './styles.module.css'
import cn from 'classnames'
import { Answer } from '../../../types'

type IProps = {
    answers: Answer[]
    selectedIds: number[]
    onSelectAnswer: (value: number) => void;
}

const TestQuestion: React.FC<IProps> = ({ answers, onSelectAnswer, selectedIds }) => {
  return (
    <>
        {answers.map(answer => {
            return (
                <div 
                    key={answer.answerId}
                    className={styles.answer}
                    onClick={() => onSelectAnswer(answer.answerId)}
                >
                    <div className={cn(styles.cicle, {
                        [styles.selectedCircle]: selectedIds.includes(answer.answerId)
                    })} />
                    <span className={cn(styles.answerText, {
                        [styles.selectedText]: selectedIds.includes(answer.answerId)
                    })}>
                        {answer.text}
                    </span>
                </div>
            )
        })}
    </>
  )
}

export default TestQuestion