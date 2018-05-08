var modobble = (function() {
  var display1, display2;
  var words = [ "maison", "chaussure", "bateau", "assiette", "lapin", "chaussette", "cheval", "miaou", "petit", "manger", "rouge", "nuage", "éléphant", "téléphone" ];
  var wordsPerCard = 4;
  var card1 = nextCard([]);
  var card2 = nextCard(card1);
  var scores = [0,0];
  var drawScores;

  function init(d1, d2, f) {
    display1 = d1;
    display2 = d2;
    drawScores = f;
  }

  function nextTurn(previousWinner) {
    if (previousWinner ==1) {
      card1 = nextCard(card2);
      var ponderate = function(word) { return [word,50]; };
      WordCloud(display1, { list: card1.map(ponderate), click: clickForPlayer(1), shuffle: true } );
      drawScores(scores[0],scores[1]);
      console.log(scores);
      console.log(card1);
      console.log(card2);
    }

    if (previousWinner ==2) {
      card2 = nextCard(card1);
      var ponderate = function(word) { return [word,50]; };
      WordCloud(display2, { list: card2.map(ponderate), click: clickForPlayer(2), shuffle: true } );
      drawScores(scores[0],scores[1]);
      console.log(scores);
      console.log(card1);
      console.log(card2);
    }
  }

  function draw() {
    var ponderate = function(word) { return [word,50]; };
    WordCloud(display1, { list: card1.map(ponderate), click: clickForPlayer(1), shuffle: true } );
    WordCloud(display2, { list: card2.map(ponderate), click: clickForPlayer(2), shuffle: true } );
    drawScores(scores[0],scores[1]);
  }

  function loadWords(list) {
    words = list;
  }

  function nextCard(currentCard) {
    var remaining = _.difference(words, currentCard);
    var card = _.sample(remaining, wordsPerCard);
    if (currentCard.length > 0) {
      card.pop();
      card.push(_.sample(currentCard));
    }
    return card;
  }

  function clickForPlayer(player) {
    return function(elems) {
      var word = elems[0]
      if (_.contains(card1, word) && _.contains(card2, word)) {
        incrementScore(player);
        nextTurn(player);
      }
    }
  }

  function incrementScore(player) {
    scores[player-1]++;
    console.log(scores);
  }

  return {
    init : init,
    draw : draw,
    loadWords : loadWords
  }

}());
