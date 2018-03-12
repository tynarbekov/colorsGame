class GameController{
  constructor(name){
    this.score = 0;
    this.gameName = name;
  }
  getCookie(cname) {
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

  setCookie(cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getScore(){
    parseInt(getCookie(this.gameName));
  }

  setScore(score){
    setCookie(this.gameName,score);
  }

  increaseScore(value){
    setScore(getCookie()+value);
  }

  increaseScore(value){
    setScore(getCookie()-value);
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
  initColors(){
    this.colorValues = ["red","blue","black","green","purple","yellow"];
    this.colorKeys = ["RED","BLUE","BLACK","GREEN","PURPLE","YELLOW"];
  }
  initGameSpace(){
    let gameSpace = document.getElementById("color-game-space");

    let scoreDiv =  this.createElement("div","offset-xs-11 offset-sm-11 offset-md-11 offset-lg-11");
    let questionDiv = this.createElement("div","col-xs-12 col-sm-12 col-md-12 col-lg-12");
    let answersDiv = this.createElement("div","row");
    let answerDiv1 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");
    let answerDiv2 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");
    let answerDiv3 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4");

    scoreDiv.appendChild(this.createElement("h3","","score"));
    questionDiv.appendChild(this.createElement("h2","","question"));
    questionDiv.appendChild(this.createElement("p","","question-instruciton"));
    questionDiv.appendChild(this.createElement("p","","answer"));

    let btn1 = this.createButton("","btn btn-secondary question-answer");
    btn1.setAttribute("onclick","javascript:cg.checkAnswer(this)")
    answerDiv1.appendChild(btn1);

    let btn2 = this.createButton("","btn btn-secondary question-answer");
    btn2.setAttribute("onclick","cg.checkAnswer(this)");
    answerDiv2.appendChild(btn2);

    let btn3 = this.createButton("","btn btn-secondary question-answer");
    btn3.setAttribute("onclick","cg.checkAnswer(this)");
    answerDiv3.appendChild(btn3);

    answersDiv.appendChild(answerDiv1);
    answersDiv.appendChild(answerDiv2);
    answersDiv.appendChild(answerDiv3);

    gameSpace.appendChild(scoreDiv);
    gameSpace.appendChild(questionDiv);
    gameSpace.appendChild(answersDiv);

    // scoreDiv.innerText = "ASD"
  }

  updateScore(){
    document.getElementById("score").innerText = "Score: " + this.score;
  }

  remove(array, index) {
    if (index > -1) {
        array.splice(index, 1);
    }
  }

  updateGameSpace(){
    this.updateScore();
    let colorLen = this.colorKeys.length;
    let question = document.getElementById("question");
    let questionInstraction = document.getElementById("question-instruciton")
    let answers = document.getElementsByClassName("question-answer");

    questionInstraction.innerText = "Choose word"

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
      this.score += 10;
      ans.innerText = "CORRECT"
      this.updateGameSpace();
      // console.log(this.score);
    }
    else {
      this.score -= 10;
      ans.innerText = "INCORRECT"
      this.updateGameSpace();
      console.log(this.score);
    }
    if (this.score < -30) {
      ans.innerText = "GAME OVER!!!"
      this.score = 0;
      this.updateGameSpace();
    }
  }
}






































//
