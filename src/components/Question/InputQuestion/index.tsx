import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { changeInputAnswerData } from '../../../redux/slices/testSlice'
import { QuestionType } from '../../../types/enums'

type IProps = {
    type: QuestionType;
    selectedIds: number[]
    onSelectAnswer: (value: number) => void;
}

const InputQuestion: React.FC<IProps> = ({ type, onSelectAnswer, selectedIds }) => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState('')

    const { currentQuestionId, completedQuestions } = useAppSelector(({ test }) => test)

    const onChangeValue = (value: string) => {
        setValue(value)

        dispatch(changeInputAnswerData({ 
            id: currentQuestionId,
            answer: { 
                answerId: 1,
                text: value
            }
        }))

        if ((value && selectedIds.length === 0) || (!value && selectedIds.length > 0)) {
            onSelectAnswer(1)
        }
    }

    useEffect(() => {
        setValue('')
    }, [currentQuestionId])    

    useEffect(() => {
        const currentQuestion = completedQuestions.find(el => el.questionId === currentQuestionId)

        if (currentQuestion) {
            setValue(currentQuestion.answers[0].text)
        }
        
    }, [currentQuestionId])

    if (type === QuestionType.BIG_INPUT) {
        return (
            <div className={styles.wrapper}>
                <textarea 
                    rows={10} 
                    placeholder='Введите ответ'
                    className={styles.textArea} 
                    value={value} 
                    onChange={(e) => onChangeValue(e.target.value)}
                />
            </div>
        )
    }

    
    return (
        <div className={styles.wrapper}>
            <input 
                className={styles.input} 
                placeholder='Введите ответ'
                value={value} 
                onChange={(e) => onChangeValue(e.target.value)}
            />
        </div>
    )
}

export default InputQuestion