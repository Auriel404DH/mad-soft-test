import styles from './styles.module.css'
import cn from 'classnames'
import { useAppSelector } from '../../hooks'

const ProgressBar = () => {
    const { 
        questionsData, 
        completedQuestions, 
        currentQuestionId 
    } = useAppSelector(({ test }) => test)

    const completedQuestionsIds = completedQuestions.map(item => item.questionId)

    return (
        <div className={styles.questionsProgressBar}>
            {questionsData.map((question) => {
                return <div 
                    className={cn(styles.question, {
                        [styles.completedQuestion]: completedQuestionsIds.includes(question.questionId),
                        [styles.currentQuestion]: question.questionId === currentQuestionId
                    })}
                    key={question.questionId}
                />
            })}
        </div>
    )
}

export default ProgressBar