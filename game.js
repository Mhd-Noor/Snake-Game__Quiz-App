const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const score_text = document.getElementById('score-display');
const progressBarfull = document.getElementById('progressBarfull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let score =  0;
let availableQuestions = [];

let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log("Q is working");
        questions = loadedQuestions.results.map( loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
       
        startGame();
        console.log("Loader hidden");
    })
    .catch(err => {
        console.error(err);
    });
//  constants
const CORRENT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    console.log("Game started");
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
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

