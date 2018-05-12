var modobble = (function() {
  var players = []
  var words;
  var wordsPerCard = 8;
  var scores = [0,0];
  var drawScores, gameOver;

  function init(w, d1, d2, sf,gf) {
    words = w;
    var card = nextCard([]);
    players[0] = new Player(d1,card);
    players[1] = new Player(d2,nextCard(card));
    drawScores = sf;
    gameOver = gf;
  }

  function nextTurn(previousWinner,theOtherPlayer) {
    previousWinner.card = nextCard(theOtherPlayer.card);
    previousWinner.draw();
  }

  function restart() {
    players[0].score = 0;
    players[1].score = 0;
    reset();
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
      drawScores(players[0].score,players[1].score);
      if (player.score >= 20) {
        player.wins();
        otherPlayer.looses();
        gameOver();
      } else
        nextTurn(player,otherPlayer);
    }
  }

  function draw() {
    players[0].draw();
    players[1].draw();
    drawScores(players[0].score,players[1].score);
  }


  var Player = function(d,c) {
    this.score = 0;
    this.card = c;
    this.display = d;
  }

  Player.prototype.draw = function() {
    var ponderate = function(word) { return [word,50]; };
    var opts = {
      list: this.card.map(ponderate),
      click: clickByPlayer(this),
      shuffle: true,
      gridSize: 32,
      minRotation: - Math.PI / 12 * 11,
      maxRotation: Math.PI / 12 * 11,
      rotationSteps: 12,
      rotateRatio: 1,
      shape: "square"
    };
    WordCloud(this.display, opts);
    return this;
  }

  Player.prototype.looses = function() {
    while (this.display.firstChild) { this.display.removeChild(this.display.firstChild);}
    this.display.style["z-index"] = 0;
    //this.display.hidden = true; 
  }

  Player.prototype.wins = function() {
    var opts = {
      list: _.times(30,function(){return ["bravo !",_.sample([10,30, 50, 100])]}),
      click: clickByPlayer(this),
      minRotation: - Math.PI / 12 * 11,
      maxRotation: Math.PI / 12 * 11,
      rotationSteps: 12,
      rotateRatio: 1,
      shape: "square",
      color: "green",
      backgroundColor: "yellow",
      drawOutOfBound: true
    };
    this.display.style["z-index"] = -1;
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
    setNumberOfWordsPerCard: setNumberOfWordsPerCard,
    restart: restart
  }

}());


