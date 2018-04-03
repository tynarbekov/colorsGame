
class SchulteTable extends GameController{
  constructor(){
    super("Schulte Table");
    this._tableSize = 0; // size of table
    this._numbersList = []; // list of numbers
    this._gameSpace = document.getElementById("schulte-game-space"); // game space HTML element
    this._table = "";
    this._currentNumber = 1;
    this._isGameStarted = false;
    this._time = new Time();
    this._intervalId = 0;
    this._startTime = new Date();
  }

  get numbersList(){
    return this._numbersList;
  }
  static get time(){
    return this._time;
  }
  get tableSize(){
    return this._tableSize === 0 ? 5 : this._tableSize;
  }

  set tableSize(value){
    this._tableSize = parseInt(value);
  }

  get gameSpace(){
    return this._gameSpace;
  }

  set tableSize(value){
    this.setTableSize(value)
  }
  setTableSize(value){
    console.log("setTableSize("+value+")");
    this._tableSize = parseInt(value);
    this.updateGameSpace();
  }
  /**
   * clear game's numbers list
   */
  clearNumbersList(){
    this._numbersList = [];
  }

  /**
   * initialize game space.
   * -creates table
   */
  initGameSpace(){
    this._gameSpace.appendChild(this.createExitBtn());

    let startBtn = this.createButton("Start","","","schulte-start");
    startBtn.setAttribute("onclick","st.updateGameSpace()");
    let stopBtn = this.createButton("Stop","","","stop-schulte");
    stopBtn.setAttribute("onclick","st.stopGame()");

    let statusBar = this.createElement("div","","status-bar");
    let timeInfo = this.createElement("p","","time-info");
    let numberInfo = this.createElement("p","","number-info");
    
    statusBar.appendChild(timeInfo);
    statusBar.appendChild(numberInfo);
    this.gameSpace.appendChild(startBtn);
    this.gameSpace.appendChild(stopBtn);
    this.gameSpace.appendChild(statusBar);

    this.table = this.createElement("table");
    this.table.className += "table table-bordered";
    this.gameSpace.appendChild(this.table);
    this.updateGameSpace();
    let tableSizes = this.createElement("div","","table sizes")
    this.gameSpace.appendChild(tableSizes);
    for(let i = 2; i<10;i++){
      let link = this.createElement("a");
      link.innerText = i + "x" + i;
      link.className += "action-link";
      link.removeAttribute("href");
      link.setAttribute("onclick","st.setTableSize("+i+")" );
      let span = this.createElement("span");
      span.innerText = " ";
      tableSizes.appendChild(link);
      tableSizes.appendChild(span);
    }
    // this.updateGameSpace();
  }
  createEmptyTable(){
    this.clearTable();
    for(let i = 0;i < this.tableSize;i++){
      let row = this.table.insertRow(i);
      for(let j = 0; j < this.tableSize;j++){
        let cell = row.insertCell(j);
        cell.className += "big-text enable";
      }
    }
  }
  clearTable(){
    this.table.innerHTML = "";
  }

  updateStatusBar(){
    let statusBar = document.getElementById("number-info");
    statusBar.innerText = "Find -> " + this._currentNumber;
  }

  updateGameSpace(){
    this.clearTable();
    this._currentNumber = 1;
    this.updateStatusBar();
    this.updateNumberList();
    for(let i = 0;i < this.tableSize;i++){
      let row = this.table.insertRow(i);
      for(let j = 0; j < this.tableSize;j++){
        let cell = row.insertCell(j);
        cell.setAttribute("data-number",this.numbersList[i * this.tableSize + j]);
        cell.innerText = this.numbersList[i * this.tableSize + j];
        cell.className += "big-text enable";
        cell.setAttribute("onclick","st.cellClick(this)");
      }
    }
  }

  updateTime(){
    this._time.addSeconds(1)
    let statusBar = document.getElementById("time-info");
    statusBar.innerText = "Time: " + this._time.getTime();
  }

  stopGame(){
    this.clearTable();
    clearInterval(this._intervalId);
  }

  cellClick(element){
    let number = parseInt(element.getAttribute("data-number"));
    if(!this._isGameStarted){
      this._isGameStarted = true;
      this._startTime = new Date();
      console.log("start time: " + JSON.stringify(this._startTime));
    }
    if(number === this._currentNumber){
      this._currentNumber++;
      element.classList.remove("enable");
      element.className += " clicked"
    }
    if(number === this.numbersList.length ){
      this.gameFinished();
    }
    this.updateStatusBar();
  }

  gameFinished(){
    this._isGameStarted = false;
    let finishTime = new Date();
    let ft = (finishTime.getMinutes() * 60) + finishTime.getSeconds();
    let st = (this._startTime.getMinutes() * 60) + this._startTime.getSeconds();
    console.log("start time: " + JSON.stringify(finishTime));

    let time = ft - st;
    console.log(ft + " - " + st + " = " + time);

    alert("Congrats, you have finished at " + parseInt(time/60) + " minutes "+ (time%60) + " seconds.");
  }

  /**
   * updates list of numbers
   * -clears list
   * -fills with numbers in range (tableSize) * (tableSize) in random order
   */
  updateNumberList(){
    this.clearNumbersList();
    let tempNumberList = [];
    for(let i = 1;i <= this.tableSize * this.tableSize;i++ ){
      tempNumberList.push(i);
    }
    while(true){
      if(tempNumberList.length === 0)
        break;
      let index = this.getRandom(tempNumberList.length);
      this._numbersList.push(tempNumberList[index]);
      tempNumberList.splice(index,1);
    }
    return this._numbersList;
  }

}