function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// Convert Cookie "score" to int
function getCookieInt(cname){
  let num = getCookie(cname);
  num = num == "" || num == NaN || num == undefined ? 0: num;
  return parseInt(num);
}
function setCookie(cname, cvalue, exdays = 0) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    let s = "";
    if(exdays == 0){
      s = cname + "=" + cvalue ;
    }else {
      s = cname + "=" + cvalue + ";"+expires;
    }
    document.cookie = s;
}

// For all games
class GameController{
  constructor(name){
    this._score = 0;
    this.gameName = name;
  }

  static get score(){
    return this._score;
  }

  static set score(score){
    this._score = score;
  }

  increaseScore(value){
    setScore(getCookieInt()+value);
  }

  increaseScore(value){
    setScore(getCookieInt()-value);
  }
  createElement(elType = "div",className="",id=""){
    let el = document.createElement(elType);
    if(!this.isNull(className) && className !== "")
      el.className += className;
    if(!this.isNull(id) && id !== "")
      el.id = id;
    return el;
  }
  createButton(text = "text",className,name,id){
    let el = document.createElement("button");
    el.innerText = text;
    if(!this.isNull(className) && className !== "")
      el.className += className;
    if(!this.isNull(id) && id !== "")
      el.id = id;
    return el;
  }
  isNull(value){
    return value === null || value === undefined;
  }
}

class ColorsGame extends GameController{
  constructor() {
    super("colorsGame");
    this.colorKeys = [];
    this.colorValues = [];
    this.initColors();
    this._trueColorValue = 0;
  }
  static getGameName(){
    return "colorsGame";
  }
  initColors(){
    this.colorValues = ["red","blue","black","green","purple","yellow"];
    this.colorKeys = ["RED","BLUE","BLACK","GREEN","PURPLE","YELLOW"];
  }

  // Init Game view

  initGameSpace(){
    let gameSpace = document.getElementById("color-game-space");
    gameSpace.innerHTML = "";


    let scoreDiv =  this.createElement("div","offset-xs-11 offset-sm-11 offset-md-11 offset-lg-11");
    let questionDiv = this.createElement("div","col-xs-12 col-sm-12 col-md-12 col-lg-12");
    let answersDiv = this.createElement("div","row");
    let answerDiv1 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");
    let answerDiv2 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");
    let answerDiv3 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");

    scoreDiv.appendChild(this.createElement("h3","","score"));
    questionDiv.appendChild(this.createElement("h2","","question"));

    questionDiv.appendChild(this.createElement("h5","","timer"));
    questionDiv.appendChild(this.createElement("p","","question-instruciton"));
    questionDiv.appendChild(this.createElement("p","","answer"));

    let btn1 = this.createButton("","btn btn-outline-dark question-answer");
    btn1.setAttribute("onclick","javascript:cg.checkAnswer(this)")
    answerDiv1.appendChild(btn1);

    let btn2 = this.createButton("","btn btn-outline-dark question-answer");
    btn2.setAttribute("onclick","cg.checkAnswer(this)");
    answerDiv2.appendChild(btn2);

    let btn3 = this.createButton("","btn btn-outline-dark question-answer");
    btn3.setAttribute("onclick","cg.checkAnswer(this)");
    answerDiv3.appendChild(btn3);

    answersDiv.appendChild(answerDiv1);
    answersDiv.appendChild(answerDiv2);
    answersDiv.appendChild(answerDiv3);

    gameSpace.appendChild(scoreDiv);
    gameSpace.appendChild(questionDiv);
    gameSpace.appendChild(answersDiv);
  }



  // Initial view,
  startButton(){
    let gameSpaceDemo = this.createElement("div","container content","color-game-demo")
    let gameSpace = document.getElementById("color-game-space");
    let bar = this.createElement("div","","demo-start");
    gameSpace.appendChild(gameSpaceDemo);
    gameSpaceDemo.appendChild(bar)


    let instruciton = this.createElement("div","row");
    let questionInstraction = this.createElement("div","col-xs-12 col-sm-12 col-md-12 col-lg-12");
    let answerDiv1 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");
    let answerDiv2 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");
    let answerDiv3 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");
    //
    questionInstraction.appendChild(this.createElement("h3","","demo-instruciton"));
    questionInstraction.appendChild(this.createElement("h3","","demo-question"));

    bar.appendChild(questionInstraction);
    bar.appendChild(instruciton);
    instruciton.appendChild(answerDiv1);
    instruciton.appendChild(answerDiv2);
    instruciton.appendChild(answerDiv3);
    //
    let ins = document.getElementById("demo-instruciton");
    let question = document.getElementById("demo-question")

    //add instruciton and question
    ins.innerText = "Select the word that says the word";
    question.innerText = "Red";
    //add style
    question.style.color = "blue"


    let btn1 = this.createButton("","btn btn-outline-dark question-answer");
    btn1.setAttribute("onclick","")
    answerDiv1.appendChild(btn1);

    let btn2 = this.createButton("","btn btn-outline-dark question-answer");
    btn2.setAttribute("onclick","");
    answerDiv2.appendChild(btn2);

    let btn3 = this.createButton("","btn btn-outline-dark question-answer");
    btn3.setAttribute("onclick","cg.startGame(this)");
    answerDiv3.appendChild(btn3);

    btn1.innerText = "BLACK";
    btn1.style.color = "red"
    btn2.innerText = "YELLOW";
    btn2.style.color = "purple"
    btn3.innerText = "BLUE";
    btn3.style.color = "black"

  }

  // After instruciton start real game
  startGame(){
    let demoForHidden = document.getElementById("color-game-demo")
    demoForHidden.style.display = "none";
    this.initGameSpace();
    this.updateGameSpace();
  }


  updateScore(){
    let score = getCookieInt(ColorsGame.getGameName());
    score = score === "" ? 0 : score;
    document.getElementById("score").innerText = "Score: " + score;
  }

  // after every answer
  updateGameSpace(){
    this.updateScore();
    let colorLen = this.colorKeys.length;
    let question = document.getElementById("question");
    let questionInstraction = document.getElementById("question-instruciton")
    let answers = document.getElementsByClassName("question-answer");

    questionInstraction.innerText = "Select the word that says the word"

    let trueColorKey = this.getRandom(colorLen);
    this._trueColorValue = this.getRandom(colorLen);
    question.innerText = this.colorKeys[trueColorKey];
    question.style.color = this.colorValues[this._trueColorValue];

    let trueAns = this.getRandom(answers.length);
    let usedColorsValues = [this._trueColorValue];
    let usedColorsKeys = [this._trueColorValue];
    for(let i = 0;i < answers.length;i++){
      let tempColorValue = this.getRandom(colorLen,usedColorsValues);
      let tempColorKey = this.getRandom(colorLen,usedColorsKeys);
      usedColorsKeys.push(tempColorKey);
      usedColorsValues.push(tempColorValue);
      answers[i].style.color = this.colorValues[tempColorValue];
      if(i === trueAns){
        answers[i].innerText = this.colorKeys[this._trueColorValue];
        answers[i].setAttribute("colorValue", this._trueColorValue);
        continue;
      }
      answers[i].setAttribute("colorValue",tempColorKey);
      answers[i].innerText = this.colorKeys[tempColorKey];
    }

  }

  getRandom(range = 99999999, except){
    while(true){
      let num = Math.floor(Math.random() * range);
      if(this.isNull(except))
        return num;
      else
      if(except instanceof Array){
        let flag = true;
        for(let i = 0;i < except.length;i++){
          if(except[i] === num)
            flag = false;
        }
        if(flag)
          return num;
      }else
      if(!isNaN(except) && except !== num){
        return num
      }
    }
  }

  checkAnswer(btn){
    let ans = document.getElementById("answer")
    if (btn.getAttribute("colorValue") == this._trueColorValue) {
      let score = getCookieInt(ColorsGame.getGameName());
      score = score === "" ? 0 : score;
      score += 10;
      setCookie(ColorsGame.getGameName(),score);
      ans.innerText = "CORRECT"
      this.updateGameSpace();
    }
    else {
      // this.score -= 10;
      ans.innerText = "INCORRECT"
      this.updateGameSpace();
    }
    if (this.score < -30) {
      ans.innerText = "GAME OVER!!!"
      // this.score = 0;
      this.updateGameSpace();
    }
  }

}






























//
