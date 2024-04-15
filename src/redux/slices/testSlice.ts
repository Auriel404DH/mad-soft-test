import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ChangeCurrentQuestionIdValues, QuestionType } from '../../types/enums';
import {  
  IChangeInputAnswerData, 
  ICompletedQuestionAction, 
  Question, 
  QuestionsData,
  TestSlice
} from '../../types';
import { updateLS } from '../../helpers/updateLocalStorage';

const data: QuestionsData = [
    {
      title: 'Лучший фреймворк?',
      questionId: 1,
      questionType: QuestionType.TEST,
      answers: [
        {answerId: 1, text: 'React.JS'},
        {answerId: 2, text: 'Vue.JS'},
        {answerId: 3, text: 'Angular'},
      ]
    },
    {
      title: 'Как вас зовут?',
      questionId: 224,
      questionType: QuestionType.SMALL_INPUT,
      answers: []
    },
    {
      title: 'Расскажите о себе.',
      questionId: 5231,
      questionType: QuestionType.BIG_INPUT,
      answers: []
    }
]
  
const defaultState = {
  questionsData: data,
  completedQuestions: [],
  currentQuestionId: 1,
  isTimeOver: false,
  isTestOver: false
}

export const initializeState = () => {
  if (typeof window !== 'undefined') {
      const stateFromLS = localStorage.getItem('state');

      if (stateFromLS) {
          return JSON.parse(stateFromLS);
      }

      return defaultState
  }
};

const initialState: TestSlice = initializeState()

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    addCompletedQuestion: (state, action: PayloadAction<ICompletedQuestionAction>) => {

        const currentQuestion = state.questionsData.find(elem => elem.questionId === state.currentQuestionId)

        if (!currentQuestion) return;

        const newCompletedAnswers = action.payload.answerIds.map(elem => {
            const currentAnswer = currentQuestion.answers.find(item => item.answerId === elem)

            if (!currentAnswer) {
              return {
                answerId: elem,
                text: ''
              }
            }

            return {
              answerId: elem,
              text: currentAnswer.text
            }
        })

        const newCompletedQuestion = { questionId: action.payload.questionId, answers: newCompletedAnswers }

        const completedQuestionIds = state.completedQuestions.map(el => el.questionId)

        if (completedQuestionIds.includes(action.payload.questionId)) {
            const currentIndex = state.completedQuestions.findIndex(elem => elem.questionId === state.currentQuestionId)

            state.completedQuestions.splice(currentIndex, 1, newCompletedQuestion)

        } else {
            state.completedQuestions.push(newCompletedQuestion)
        }

        updateLS(state)
    },
    changeCurrentQuestionId: (state, action: PayloadAction<ChangeCurrentQuestionIdValues | number>) => {
        const currentQuestionIndex = state.questionsData.findIndex(elem => elem.questionId === state.currentQuestionId)

        if (action.payload === ChangeCurrentQuestionIdValues.NEXT) {
            const nextElement = state.questionsData[currentQuestionIndex + 1]

            state.currentQuestionId = nextElement.questionId
            
        } else if (action.payload === ChangeCurrentQuestionIdValues.PREV) {
            const nextElement = state.questionsData[currentQuestionIndex - 1]

            state.currentQuestionId = nextElement.questionId

        } else {
            state.currentQuestionId = action.payload
        }

        updateLS(state)
    },
    toggleIsTimeOver: (state) => {
        state.isTimeOver = !state.isTimeOver

        updateLS(state)
    },
    toggleIsTestOver: (state) => {
        state.isTestOver = !state.isTestOver
         
        updateLS(state)
    },
    resetData: (state) => {
        state.isTimeOver = false
        state.isTestOver = false
        state.currentQuestionId = 1
        state.completedQuestions = []
        
        localStorage.clear()
    },
    changeInputAnswerData: (state, action: PayloadAction<IChangeInputAnswerData>) => {

        const newDataQuestionIndex = state.questionsData.findIndex(elem => elem.questionId === action.payload.id)

        const newDataQuestion = state.questionsData[newDataQuestionIndex]

        const newQuestionsData = state.questionsData.filter(elem => elem.questionId !== action.payload.id)

        if (!newDataQuestion) return

        newDataQuestion.answers = [action.payload.answer]

        newQuestionsData.splice(newDataQuestionIndex, 0, newDataQuestion)

        state.questionsData = newQuestionsData

        updateLS(state)
    },
    addQuestionToData: (state, action: PayloadAction<Question>) => {
        state.questionsData.push(action.payload)

        updateLS(state)
    },
  },
})

export const { 
  resetData,
  toggleIsTimeOver, 
  toggleIsTestOver,
  addQuestionToData,
  addCompletedQuestion, 
  changeInputAnswerData,
  changeCurrentQuestionId, 
} = testSlice.actions

export default testSlice.reducer