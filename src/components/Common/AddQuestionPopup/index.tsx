import React, { useState } from 'react'
import styles from './styles.module.css'
import { QuestionType } from '../../../types/enums';
import cn from 'classnames'
import { Answer } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addQuestionToData } from '../../../redux/slices/testSlice';

type IProps = {
    onTogglePoppup: () => void;
}

const dafaultAnswers: Answer[] = [
    {
        answerId: 1,
        text: ''
    },
    {
        answerId: 2,
        text: ''
    },
    {
        answerId: 3,
        text: ''
    },
]

const questionTypes = [
    {
        type: QuestionType.TEST,
        text: 'Тест'
    },
    {
        type: QuestionType.BIG_INPUT,
        text: 'Большой инпут'
    },
    {
        type: QuestionType.SMALL_INPUT,
        text: 'Малый инпут'
    },
]

const AddQuestionPopup:React.FC<IProps> = ({ onTogglePoppup }) => {
    const dispatch = useAppDispatch()

    const [question, setQuestion] = useState('')

    const [type, setType] = useState<QuestionType>()

    const [answers, setAnswers] = useState<Answer[]>(dafaultAnswers)

    const { questionsData } = useAppSelector(state => state.test)

    const isAddButtonDisabled = !question || !type || (type === QuestionType.TEST && answers.find(elem => !elem.text))

    const onChangeQuestion = (value: string) => setQuestion(value)

    const onSelectType = (value: QuestionType) => setType(value)

    const onChangeAnswerText = (value: string, id: number) => {

        const currentAnswerIndex = answers.findIndex(elem => elem.answerId === id)

        const currentAnswer: Answer = {...answers[currentAnswerIndex], text: value}

        const newAnswers = answers.filter(elem => elem.answerId !== id)
        
        newAnswers.splice(currentAnswerIndex, 0, currentAnswer)

        setAnswers(newAnswers)
    }

    const onAddNewAnswer = () => {
        const newAnswer = {
            answerId: answers.length + 1,
            text: ''
        }

        setAnswers(prev => [...prev, newAnswer])
    }

    const onSubmit = () => {

        if (!question || !type) return;

        const newQuestion = {
            title: question,
            questionId: questionsData.length + 1,
            questionType: type,
            answers
        }

        dispatch(addQuestionToData(newQuestion))

        onTogglePoppup()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <span className={styles.title}>Добавить вопрос</span>
                    <div 
                        onClick={onTogglePoppup} 
                        className={styles.closeButton}
                    >
                        Закрыть
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.titleWrapper}>
                        <span className={styles.secondTitle}>Ввердите вопрос</span>
                        <input 
                            className={styles.input} 
                            value={question} 
                            placeholder='Вопрос'
                            onChange={(e) => onChangeQuestion(e.target.value)} 
                        />
                    </div>
                    <div className={styles.typesWrapper}>
                        <span className={styles.secondTitle}>Выберите тип</span>
                        <div className={styles.types}>
                            {questionTypes.map(item => {
                                return (
                                    <div 
                                        key={item.type}
                                        onClick={()=>onSelectType(item.type)} 
                                        className={styles.questionType} 
                                    >
                                        <div className={cn(styles.questionTypeCircle, {
                                            [styles.selectedCircle]: type === item.type
                                        })} />
                                        <span>{item.text}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {type === QuestionType.TEST && (
                        <div className={styles.answersWrapper}>
                            <span className={styles.secondTitle}>Введите варианты ответов</span>
                            <div className={styles.answers}>
                                {answers.map(item => {
                                    return (
                                        <div key={item.answerId}>
                                            <input 
                                                value={item.text} 
                                                placeholder='Вариант ответа'
                                                className={styles.input} 
                                                onChange={(e) => onChangeAnswerText(e.target.value, item.answerId)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.addAnswer} onClick={onAddNewAnswer}>
                                Добавить вариант ответа
                            </div>
                        </div>
                    )}
                </div>
                <button 
                    className={cn(styles.addAnswerButton, {
                        [styles.disabled]: isAddButtonDisabled
                    })}
                    onClick={onSubmit}
                >
                    Добавить
                </button>
            </div>
        </div>
    )
}

export default AddQuestionPopup