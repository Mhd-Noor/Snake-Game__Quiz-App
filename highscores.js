const highScoresList = document.getElementById('highscoreslist');
const Highscores = JSON.parse(localStorage.getItem('Highscores')) || [];

Highscores.map( score =>{
    console.log(`<li class="High-score">${score.name}-${score.score}</li>`);
});
