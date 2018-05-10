var modobble = (function() {
  var players = []
  var words = [ "maison", "chaussure", "bateau", "assiette", "lapin", "chaussette", "cheval", "miaou", "petit", "manger", "rouge", "nuage", "éléphant", "téléphone" ];
  var wordsPerCard = 5;
  var scores = [0,0];
  var drawScores;

  function init(w, d1, d2, f) {
    words = w;
    var card = nextCard([]);
    players[0] = new Player(d1,card);
    players[1] = new Player(d2,nextCard(card));
    drawScores = f;
  }

  function nextTurn(previousWinner,theOtherPlayer) {
    previousWinner.card = nextCard(theOtherPlayer.card);
    previousWinner.draw();
    drawScores(players[0].score,players[1].score);
  }

  function reset() {
    players[0].card = nextCard([]);
    players[1].card = nextCard(players[0].card);
    draw();
  }

  function loadWords(list) {
    words = list;
    reset();
  }

  function setNumberOfWordsPerCard(n) {
    wordsPerCard = n;
    reset();
  }

  function theOther(player) {
    return player == players[0] ? players[1] : players[0];
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

  function clickByPlayer(player) {
    return function(elems) {
      click(player,elems[0])
    }
  }

  function click(player,word) {
    var otherPlayer = theOther(player);
    if (_.contains(player.card, word) && _.contains(otherPlayer.card, word)) {
      player.incrementScore();
      nextTurn(player,otherPlayer);
    }
  }

  function draw() {
    players[0].draw();
    players[1].draw();
  }


  var Player = function(d,c) {
    this.score = 0;
    this.card = c;
    this.display = d;
  }

  Player.prototype.draw = function() {
    var ponderate = function(word) { return [word,50]; };
    var opts = { list: this.card.map(ponderate), click: clickByPlayer(this), shuffle: true, rotateRatio: 1 };
    WordCloud(this.display, opts);
    return this;
  }

  Player.prototype.incrementScore = function() { this.score++; };

  return {
    init : init,
    draw : draw,
    loadWords : loadWords,
    words : words,
    players : players,
    setNumberOfWordsPerCard: setNumberOfWordsPerCard
  }

}());


