const username = document.getElementById('username');
const savescoreBtn = document.getElementById('savescoreBtn');
const finalscore = document.getElementById('finalscore');

const MostrecentScore = localStorage.getItem('MostrecentScore');

const Highscores = JSON.parse(localStorage.getItem("Highscores")) || [];
const   MAX_HIGHSCORES = 5;


finalscore.innerHTML = MostrecentScore;

username.addEventListener("keyup", () => {          // The keyup event occurs when a keyboard key is released
    savescoreBtn.disabled = !username.value;
});

saveHighscore = e => {
    e.preventDefault();
    const scores =  { 
    score: Math.floor(Math.random() * 100),
    name: username.value 
    };

    Highscores.push(scores)
    Highscores.sort((a, b) => b.score - a.score);
    Highscores.splice(MAX_HIGHSCORES);

    localStorage.setItem("Highscores", JSON.stringify(Highscores));
    window.location.assign('/');

};