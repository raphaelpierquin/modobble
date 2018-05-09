function drawScores(score1, score2) {
  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
}

document.addEventListener("DOMContentLoaded", function() {
    modobble.init(words_cp,document.getElementById("gauche"),document.getElementById("droite"),drawScores);
    modobble.draw();
});

