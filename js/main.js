function drawScores(score1, score2) {
  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
}

function levelChangeEventHandler(event) {
    var words = {
      cp: words_cp,
      ce1: words_ce1,
      ce2cm2: words_ce2cm2
    }
    modobble.loadWords(words[event.target.value]);
}

function wordsPerCardChangeEventHandler(event) {
  modobble.setNumberOfWordsPerCard(event.target.value);
}

function toggleConfigPanel() {
  document.getElementById('configpanel').classList.toggle('hidden');
}

document.addEventListener("DOMContentLoaded", function() {
    modobble.init(words_cp,document.getElementById("gauche"),document.getElementById("droite"),drawScores);
    modobble.draw();
    document.querySelector('select[name="level"]').onchange=levelChangeEventHandler;
    document.querySelector('select[name="wordspercard"]').onchange=wordsPerCardChangeEventHandler;
    document.getElementById('menu').onclick=toggleConfigPanel;
});

