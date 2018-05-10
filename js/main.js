var sampleSize = 25;
var words;

function drawScores(score1, score2) {
  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
}

function levelChangeEventHandler(event) {
  var words_per_level = {
    cp: words_cp,
    ce1: words_ce1,
    ce2cm2: words_ce2cm2
  }
  words = words_per_level[event.target.value];
  modobble.loadWords(_.take(words,sampleSize));
}

function wordsPerCardChangeEventHandler(event) {
  modobble.setNumberOfWordsPerCard(event.target.value);
}

function sampleSizeChangeEventHandler(event) {
  sampleSize = event.target.value;
  modobble.loadWords(_.take(words,sampleSize));
}

function toggleConfigPanel() {
  document.getElementById('configpanel').classList.toggle('hidden');
}

document.addEventListener("DOMContentLoaded", function() {
  words = words_cp;
  modobble.init(words,document.getElementById("gauche"),document.getElementById("droite"),drawScores);
  modobble.draw();
  document.querySelector('select[name="level"]').onchange=levelChangeEventHandler;
  document.querySelector('select[name="wordspercard"]').onchange=wordsPerCardChangeEventHandler;
  document.querySelector('select[name="samplesize"]').onchange=sampleSizeChangeEventHandler;
  document.getElementById('menu').onclick=toggleConfigPanel;
});

