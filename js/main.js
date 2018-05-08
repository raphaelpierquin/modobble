function drawScores(score1, score2) {
  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
}

modobble.init(document.getElementById("gauche"),document.getElementById("droite"),drawScores);
document.addEventListener("DOMContentLoaded", modobble.draw);
