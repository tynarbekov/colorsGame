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





























//
