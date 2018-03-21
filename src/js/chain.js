class ChainGame extends GameController{
  constructor() {
    super("chainGame");
    this.words = [];
    this.currentWordsList = [];
    this.currentWordId = 0;
    this.registeredAnswers = [];
    this.initWords();
    this.updateWordsList();
  }

  static getGameName(){
    return "chainGame";
  }

  initWords(){
    for (var i = 1; i <= 200; i++) {
      this.words.push("word" + i)
    }
  }

  startButton(){
    let gameSpaceDemo = this.createElement("div","container content","chain-game-demo")
    let gameSpace = document.getElementById("chain-game-space");
    let bar = this.createElement("div","","demo-start");
    gameSpace.appendChild(gameSpaceDemo);
    gameSpaceDemo.appendChild(bar)

    let instructon = this.createElement("div","col-xs-12 col-sm-12 col-md-12 col-lg-12");
    bar.appendChild(instructon);

    instructon.appendChild(this.createElement("h3","","demo-instruciton"));
    instructon.appendChild(this.createElement("h3","","demo-description"));

    let btn = this.createButton("","btn btn-outline-dark question-answer");
    btn.setAttribute("onclick","cg.startGame(this)");
    instructon.appendChild(btn);

    let ins = document.getElementById("demo-instruciton");
    let desc = document.getElementById("demo-description");

    ins.innerText = "Instruction";
    desc.innerText = "You must remember the order of words, and in the end you must compile that list of scattered words"
    btn.innerText = "Start";
  }

  startGame(){
    let demoForHidden = document.getElementById("chain-game-demo");
    demoForHidden.style.display = "none";
    this.initGameSpace();
  }

  initGameSpace(){
    this.currentWordId = 0;
    let gameSpace = document.getElementById("chain-game-space");
    gameSpace.innerHTML = "";
    let scoreDiv =  this.createElement("div","offset-xs-11 offset-sm-11 offset-md-11 offset-lg-11","scoreDiv");
    let viewWord = this.createElement("div","col-xs-12 col-sm-12 col-md-12 col-lg-12","viewWord");
    let nextWordBtn = this.createButton("Next","btn btn-outline-dark","","next-word-button");
    let exit = this.createElement("a","","exit");
    nextWordBtn.setAttribute("onclick","cg.changeWord()");
    scoreDiv.appendChild(this.createElement("h3","","score"));
    scoreDiv.appendChild(this.createElement("h3","","listSize"));
    viewWord.appendChild(this.createElement("h3","","current-word"));
    viewWord.appendChild(nextWordBtn);
    gameSpace.appendChild(exit);
    gameSpace.appendChild(scoreDiv);
    gameSpace.appendChild(viewWord);
    exit.href = "/gamesForMemory/";
    exit.innerText = "EXIT";
    exit.style.color = "red";
    exit.style.fontSize = "30px";
    this.updateLevel();
    this.updateWordsList();
    this.changeWord();
  }


  updateWordsList(){
    let level = getCookieInt(ChainGame.getGameName());
    setCookie(ChainGame.getGameName(),level);
    let arr = this.getRandom(getCookieInt(ChainGame.getGameName()));
    this.currentWordsList = arr;
    return arr;
  }

  nextWord(){
  if(!this.hasNextWord()){
      return;
    }
    let nextWord = this.currentWordsList[this.currentWordId]
    this.currentWordId++;
    return nextWord;
  }

  hasNextWord(){
    return this.currentWordsList.length > this.currentWordId ;
  }

  changeWord(){
    if(this.hasNextWord()){
      let currentWord = this.nextWord();
      document.getElementById("current-word").innerText = currentWord;
    }
    else {
      this.checkAnswerView();
    }
  }

  checkAnswerView(){
    let exView = document.getElementById("viewWord");
    exView.style.display = "none";
    let mainDiv = document.getElementById("chain-game-space");
    let answerCheck = this.createElement("div","d-flex flex-column justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12","answerView");
    mainDiv.appendChild(answerCheck);


    let shuffle = this.shuffle();
    for (var i = 0; i < shuffle.length; i++) {
      let b = answerCheck.appendChild(this.createButton(shuffle[i],"btn btn-outline-dark ans"));
      b.setAttribute("onclick","cg.registerAnswer(this)");
    }

    let checkButton = this.createButton("Check","btn btn-outline-dark");
    checkButton.setAttribute("onclick","cg.resultAnswer(this)");
    answerCheck.appendChild(checkButton);
    checkButton.style.color = "red";
    checkButton.id = "checkAnswer";
    checkButton.disabled = true;
  }

  registerAnswer(element){
    element.style.color = "green";
    element.disabled = true;
    if (this.registeredAnswers.length == this.currentWordsList.length) {
      this.registeredAnswers = [];
    }
    this.registeredAnswers.push(element.innerText);
    let ansClass = document.getElementsByClassName("ans")
    let count = 0;
    for (var i = 0; i < ansClass.length; i++) {
      if (ansClass[i].disabled == true)
        count += 1;
    }
    if (count == ansClass.length) {
      let checkButton = document.getElementById("checkAnswer");
      checkButton.disabled = false;
    }
  }


  resultAnswer(element){
    element.disabled = true;
    let answerCheck = document.getElementById("answerView");
    let result = this.createElement("h3","","result");
    let next = this.createButton("Next","btn btn-outline-dark");
    answerCheck.appendChild(result);
    if (this.checkForTrue()) {
      let level = getCookieInt(ChainGame.getGameName());
      level += 1;
      setCookie(ChainGame.getGameName(),level);
      result.innerText = "CORRECT";
      result.style.color = "green"
      answerCheck.appendChild(next);
      next.setAttribute("onclick","cg.nextLevel(this)");
    }
    else {
      result.innerText = "INCORRECT";
      result.style.color = "red"
      answerCheck.appendChild(next);
      next.setAttribute("onclick","cg.nextLevel(this)");
      next.innerText = "Restart";
    }
  }

  nextLevel(element){
    this.initGameSpace();
  }

  updateLevel(){
    let level = getCookieInt(ChainGame.getGameName());
    if (level==0) {
      level += 1;
      setCookie(ChainGame.getGameName(),level);
    }
    document.getElementById("score").innerText = "Level: " + level;
  }

  checkForTrue(){
    if (this.currentWordsList.length != this.registeredAnswers.length) {
      return false;
    }
    for (var i = 0; i < this.currentWordsList.length; i++) {
      if (this.currentWordsList[i]!=this.registeredAnswers[i]) {
        return false;
      }
    }
    return true;
  }


  shuffle(){
    let arr = [];
    for (var i = 0; i < this.currentWordsList.length; i++) {
      arr.push(this.currentWordsList[i]);
    }
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  getRandom(level){
    let nums = [];
    for (let i = 1; i <= (level*3); i++) {
      let check = "";
      let n = this.words[Math.floor(Math.random() * this.words.length)];
      if (nums.length==0)
        nums.push(n);
      else
        for (let j = 0; j < nums.length; j++) {
          check = false;
          if (nums[j] != n)
            check = true;
        }
      if (check) {
        nums.push(n)
      }
    }
    return nums;
  }

}























//
