var wordsDeck = (function() {

  var wordsPerLevel = {
    cp: words_cp,
    ce1: words_ce1,
    ce2cm2: words_ce2cm2
  }

  var level, deckSize, index;

  function init(l, i, s) {
    level = l;
    index = i;
    deckSize = s;
    notifyDeckChange = function(){};
  }

  function setLevel(l) {
    level = l;
    notifyDeckChange(getWords());
  }

  function setDeckSize(s) {
    deckSize = s;
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
    return wordsPerLevel[level].slice(index-1,index-1+deckSize);
    return wordsPerLevel[level];
  }

  function getIndexes() {
    return _.range(1, wordsPerLevel[level].length + 1, deckSize);
  }

  return {
    init: init,
    setLevel: setLevel,
    setDeckSize: setDeckSize,
    setIndex: setIndex,
    onChange: onChange,
    getWords: getWords,
    getIndexes: getIndexes,
  };
})();
