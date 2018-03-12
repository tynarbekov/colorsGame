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

  increaseScore(){
    setScore(getCookie()+1);
  }

  createElement(elType = "div",className="",id=""){
    let el = document.createElement(elType);
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
  }
  initColors(){
    this.colorValues = ["red","blue","black","green","purple","yellow"];
    this.colorKeys = ["Красный","Синий","Чёрный","Зелёный","Фиолетовый","Жёлтый"];
  }
  initGameSpace(){
    let gameSpace = document.getElementById("color-game-space");

    let scoreDiv =  this.createElement("div","offset-xs-11 offset-sm-11 offset-md-11 offset-lg-11");
    let questionDiv = this.createElement("div","col-xs-12 col-sm-12 col-md-12 col-lg-12");
    let answersDiv = this.createElement("div","row");
    let answerDiv1 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4 question-answer");
    let answerDiv2 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4 question-answer");
    let answerDiv3 = this.createElement("div","col-xs-4 col-sm-4 col-md-4 col-lg-4 question-answer");

    scoreDiv.appendChild(this.createElement("h3","","score"));
    questionDiv.appendChild(this.createElement("h2","","question"));
    questionDiv.appendChild(this.createElement("p","","question-instruciton"));
    answerDiv1.appendChild(this.createElement("h2"));
    answerDiv2.appendChild(this.createElement("h2"));
    answerDiv3.appendChild(this.createElement("h2"));
    answersDiv.appendChild(answerDiv1);
    answersDiv.appendChild(answerDiv2);
    answersDiv.appendChild(answerDiv3);

    gameSpace.appendChild(scoreDiv);
    gameSpace.appendChild(questionDiv);
    gameSpace.appendChild(answersDiv);
  }
  updateGameSpace(){
    let question = document.getElementById("question");

    question.innerText = this.colorKeys[2];
    question.style.color = this.colorValues[1];

  }

}
