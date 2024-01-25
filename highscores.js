const highScoresList = document.getElementById('highscoreslist');
const Highscores = JSON.parse(localStorage.getItem('Highscores')) || [];


highScoresList.innerHTML =  Highscores.map( score =>{
    return `<li class="High-score">${score.name} -  ${score.score}</li>`;
}).join("");
