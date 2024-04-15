import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import styles from './styles.module.css'
import { addCompletedQuestion, changeCurrentQuestionId, toggleIsTestOver } from '../../redux/slices/testSlice'
import TimeIsOut from '../Common/TimeIsOut'
import NavigateButtons from './NavigateButtons'
import TestQuestion from './TestQuestion'
import InputQuestion from './InputQuestion'
import { ChangeCurrentQuestionIdValues, QuestionType } from '../../types/enums'

const Question = () => {
    const dispatch = useAppDispatch()

    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const { 
        questionsData, 
        currentQuestionId, 
        completedQuestions,
        isTimeOver
    } = useAppSelector(({ test }) => test)

    const currentQuestion = questionsData.find(item => item.questionId === currentQuestionId)

    const lastQuestion = useMemo(() => {
        return questionsData[questionsData.length - 1]
    }, [questionsData])

    const onSelectAnswer = (value: number) => {
        if(selectedIds.includes(value)) {
            setSelectedIds(prev => prev.filter(elem => elem !== value))
        } else {
            setSelectedIds(prev => [...prev, value])
        }
    }
    
    const onSubmit = () => {
        if (!currentQuestion) return;

        const newCompletedQuestion = {
            questionId: currentQuestion.questionId, 
            answerIds: selectedIds
        }

        if (lastQuestion.questionId === currentQuestionId) {
            dispatch(toggleIsTestOver())
            return;
        }

        dispatch(addCompletedQuestion(newCompletedQuestion))
        dispatch(changeCurrentQuestionId(ChangeCurrentQuestionIdValues.NEXT))

        setSelectedIds([])
    }

    const onPrev = () => {
        if (!currentQuestion) return;

        dispatch(changeCurrentQuestionId(ChangeCurrentQuestionIdValues.PREV))

        setSelectedIds([])
    }

    useEffect(() => {
        const completedQuestionsIds = completedQuestions.map(item => item.questionId)

        if (completedQuestionsIds.includes(currentQuestionId)) {
            const currentQuestion = completedQuestions.find(elem => elem.questionId === currentQuestionId)

            if (!currentQuestion) return            

            setSelectedIds(currentQuestion.answers.map(el => el.answerId))
        }

    }, [currentQuestionId])

    if (isTimeOver) {
        return <TimeIsOut />
    }

    if (!currentQuestion) return;

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{currentQuestion.title}</div>
            <div className={styles.answers}>
                {currentQuestion.questionType === QuestionType.TEST ? (
                    <TestQuestion 
                        onSelectAnswer={onSelectAnswer} 
                        selectedIds={selectedIds}
                        answers={currentQuestion.answers}
                    />
                ) : (
                    <InputQuestion
                        type={currentQuestion.questionType} 
                        selectedIds={selectedIds}
                        onSelectAnswer={onSelectAnswer}
                    />
                )}
            </div>
            <NavigateButtons onPrev={onPrev} onSubmit={onSubmit} selectedIds={selectedIds} />
        </div>
    )
}

export default Question