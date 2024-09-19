import { createContext, useReducer } from "react";

import questions from "../data/questions.js";

const STAGES = ["start", "category", "playing", "end"];

const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    score: 0, 
    answerSelected: false,
    help: '',
    remove: true,
}

const quizReducer = (state, action) => {

    switch (action.type) {
        case "ChangeState":
            return {
                ...state,
                gameStage: STAGES[1], 
            };

        case "ReorderQuestions":
            return {
                ...state,
                questions: state.questions.sort(() => Math.random() - 0.5)
            };

        case "ChangeQuestion":
            const nextQuestion = state.currentQuestion + 1;
            let endgame = false;

            if (nextQuestion === state.questions.length) {
                endgame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endgame ? STAGES[3] : state.gameStage,
                answerSelected: false,
                help: '',
                remove: true,
            };

        case "RestartGame":
            return initialState;

        case "SelectAnswer":
            if (state.answerSelected) return state;

            const { answer, option } = action.payload;
            let newScore = state.score;

            if (answer === option) {
                newScore = state.score + 1;
            }

            return {
                ...state,
                score: newScore,
                answerSelected: true,
            };

        case "StartGame":
            let quizQuestions = null;

            state.questions.forEach((question) => {
                if(question.category === action.payload) {
                    quizQuestions = question.questions;
                }
            })

            return{
                ...state,
                questions: quizQuestions, 
                gameStage: STAGES[2],
            }

        case "ShowTip":
            return {
                ...state,
                help: "tip",
            }

        case "RemoveOption":
            const {options, resp} = action.payload
            const otherOptions = options.filter((option) => option !== resp)  
            const randomOption = Math.floor(Math.random() * otherOptions.length)
            const newOptions = options.filter((option) => option !== otherOptions[randomOption])
            
            state.questions.options = newOptions   
            
            return {
                ...state,
                questions: state.questions.map((question, index) => 
                    index === state.currentQuestion ? { ...question, options: newOptions } : question
                ),
                remove: false,
                help: 'alredyhelped'
            }
            
        
        default:
            return state;
    }

}

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const value = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
}