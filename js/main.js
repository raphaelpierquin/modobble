var sampleSize = 25;
var words;

function drawScores(score1, score2) {
  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
}

function levelChangeEventHandler(event) {
  wordsDeck.setLevel(event.target.value);
}

function wordsPerCardChangeEventHandler(event) {
  modobble.setNumberOfWordsPerCard(event.target.value);
}

function deckSizeChangeEventHandler(event) {
  wordsDeck.setDeckSize(event.target.value);
}

function toggleConfigPanel() {
  document.getElementById('configpanel').classList.toggle('hidden');
}

document.addEventListener("DOMContentLoaded", function() {
  wordsDeck.init('cp',1,25)
  modobble.init(wordsDeck.getWords(),document.getElementById("gauche"),document.getElementById("droite"),drawScores);
  wordsDeck.onChange(function(words){ modobble.loadWords(words)});
  modobble.draw();
  document.querySelector('select[name="level"]').onchange=levelChangeEventHandler;
  document.querySelector('select[name="wordspercard"]').onchange=wordsPerCardChangeEventHandler;
  document.querySelector('select[name="decksize"]').onchange=deckSizeChangeEventHandler;
  document.getElementById('menu').onclick=toggleConfigPanel;
});

