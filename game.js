const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const score_text = document.getElementById('score-display');
const progressBarfull = document.getElementById('progressBarfull');


let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let score =  0;
let availableQuestions = [];

let questions = [
    {
        question: "My favorite color",
        choice1: "red",
        choice2: "blue",
        choice3: "green",
        choice4: "brown",
        answer: 1
    },
    {
        question: "My favorite food",
        choice1: "ramen",
        choice2: "cheese fries",
        choice3: "buriyani",
        choice4: "qorma",
        answer: 3
    },
    {
        question: "My favorite city",
        choice1: "london",
        choice2: "lahore",
        choice3: "leeds",
        choice4: "madrid",
        answer: 4
    }
];

//  constants
const CORRENT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
         localStorage.setItem('MostrecentScore', score);
        return window.location.assign("/end.html");
    }
    questionCounter ++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random () * availableQuestions.length); //randomly generates a question
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; // display the question on the site

    choices.forEach(choice =>{
        const number = choice.dataset["number"]; // get the number id
        choice.innerText = currentQuestion["choice" + number]; // matc the choice number with the choice
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener("click", e =>{
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classtoApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if ( classtoApply === "correct") {
            incrementScore(CORRENT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classtoApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classtoApply);

            getNewQuestion();
        }, 1000);
        
        

    });
});

incrementScore = num => {
    score += num;
    score_text.innerText = score;

};

startGame();