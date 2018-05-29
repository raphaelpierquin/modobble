var wordsDeck = (function() {

  var wordsPerLevel = {
    cp: words_cp,
    ce1: words_ce1,
    ce2cm2: words_ce2cm2
  }

  var levelName ={
    cp: "CP",
    ce1: "CE1",
    ce2cm2: "CE2-CM2"
  }

  var level, deckSize, index, afresh;

  function init(l, i, s) {
    level = l;
    index = i;
    deckSize = s;
    notifyDeckChange = function(){};
    afresh = false;
  }

  function setLevel(l) {
    level = l;
    index = 1;
    notifyDeckChange(getWords());
  }

  function setAfresh(a) {
    afresh = a;
    notifyDeckChange(getWords());
  }

  function setIndex(i) {
    index = i;
    notifyDeckChange(getWords());
  }

  function onChange(h) {
    notifyDeckChange = h;
  }

  function getWords() {
    var firstIndex = afresh ? 0 : index-1;
    return wordsPerLevel[level].slice(firstIndex, index-1+deckSize);
  }

  function getIndexes() {
    var indexes = []
    _.range(1, wordsPerLevel[level].length + 1, deckSize).forEach(function(i){
      var label = levelName[level] + " de " + i + " à " + (i + deckSize -1);
      indexes.push({order:i,label:label});
    })
    return indexes;
  }

  return {
    init: init,
    setLevel: setLevel,
    setIndex: setIndex,
    setAfresh: setAfresh,
    onChange: onChange,
    getWords: getWords,
    getIndexes: getIndexes,
  };
})();
