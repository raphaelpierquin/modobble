var sampleSize = 25;
var words;

function drawScores(score1, score2) {
  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
}

function levelChangeEventHandler(event) {
  wordsDeck.setLevel(event.target.value);
  updateDeckSelectOptions();
}

function wordsPerCardChangeEventHandler(event) {
  modobble.setNumberOfWordsPerCard(event.target.value);
}

function deckSizeChangeEventHandler(event) {
  wordsDeck.setDeckSize(parseInt(event.target.value));
  updateDeckSelectOptions();
}

function deckChangeEventHandler(event) {
  wordsDeck.setIndex(event.target.value);
}

function toggleConfigPanel() {
  document.getElementById('configpanel').classList.toggle('hidden');
}

function updateDeckSelectOptions() {
  var root = document.querySelector('select[name="deck"]');
  while (root.firstChild) { root.removeChild(root.firstChild);}
  wordsDeck.getIndexes().forEach(function(index){
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(index));
    root.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  wordsDeck.init('cp',1,25)
  modobble.init(wordsDeck.getWords(),document.getElementById("gauche"),document.getElementById("droite"),drawScores);
  wordsDeck.onChange(function(words){ modobble.loadWords(words)});
  modobble.draw();
  updateDeckSelectOptions();
  document.querySelector('select[name="level"]').onchange=levelChangeEventHandler;
  document.querySelector('select[name="wordspercard"]').onchange=wordsPerCardChangeEventHandler;
  document.querySelector('select[name="decksize"]').onchange=deckSizeChangeEventHandler;
  document.querySelector('select[name="deck"]').onchange=deckChangeEventHandler;
  document.getElementById('menu').onclick=toggleConfigPanel;
});

