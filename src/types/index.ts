import { QuestionType } from "./enums";

export type Answer = {
    answerId: number;
    text: string
}

export type Question = {
    title: string;
    questionId: number;
    questionType: QuestionType;
    answers: Answer[]
}

export type QuestionsData = Question[]

export type ICompletedQuestionAction = {
    questionId: number;
    answerIds: number[]
}

export type CompletedQuestion = {
    questionId: number;
    answers: Answer[];
}

export type IChangeInputAnswerData = {
    id: number;
    answer: Answer;
}

export interface TestSlice {
    questionsData: QuestionsData;
    completedQuestions: CompletedQuestion[];
    currentQuestionId: number;
    isTimeOver: boolean;
    isTestOver: boolean;
}