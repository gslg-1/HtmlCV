class HistoryContent{
  constructor(div, array)
  {
    this.mContainer = div;
    this.fill(array);
  }

  fill(array) {
    
    for (let i = 0 ; i < array.length; i++ )
    {
      this.write(array[i].desc,"p");
    }
  }
  write(text, eType) {
    var dElement = document.createElement(eType);
    dElement.innerHTML = text;
    this.appendToMe(dElement);
  }
  appendToMe(element) {
    this.mContainer.appendChild(element);
  }
}

class HistoryMarker{
  constructor(div, array)
  {
    this.mContainer = div;
    this.fill(array);
  }

  fill(array) {
    
    for (let i = 0 ; i < array.length; i++ )
    {
      this.write(array[i].duration,"h1");
      this.write(array[i].sDesc,"p");
    }
  }
  write(text, eType) {
    var dElement = document.createElement(eType);
    dElement.innerHTML = text;
    this.appendToMe(dElement);
  }
  appendToMe(element) {
    this.mContainer.appendChild(element);
  }
}
class HistoryGraph{
  constructor(container, Dbg){
    this.mContainer = container;
    this.mDbg = Dbg;

    this.attachMe();
    this.mDbg.Dbg("History Graph - Created");
  }
  attachMe() {
    this.mSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.mContainer.appendChild(this.mSVG);
  }
  configureMe() {

  }
}
class History {
  constructor( container , array) {
    this.mContainer = container;
    this.Create(array);
  }
  Create(array) {
    this.mDivMrkr = document.createElement("div");
    this.mDivCntnt = document.createElement("div");
    
    this.mDivMrkr.style.backgroundColor = "red";
    this.mDivMrkr.style.width = "50%";
    this.mDivMrkr.style.boxSizing = "border-box";
    this.mDivMrkr.style.cssFloat = "left";
    this.mDivMrkr.style.overflow = "auto";
    
    this.mDivCntnt.style.backgroundColor = "blue";
    this.mDivCntnt.style.width = "50%";
    this.mDivCntnt.style.cssFloat = "left";
    this.mDivCntnt.style.boxSizing = "border-box";
    this.mDivCntnt.style.boxSizoverflowing = "auto";
    
    this.mContainer.appendChild(this.mDivMrkr);
    this.mContainer.appendChild(this.mDivCntnt);
    this.mObjMrkr = new HistoryMarker(this.mDivMrkr, array);
    this.mObjCntnt = new HistoryContent(this.mDivCntnt, array);
  }
  
}