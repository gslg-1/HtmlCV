class HistoryContent{
  constructor(div, array, txtSize)
  {
    this.mContainer = div;
    this.fill(array);
    this.textSize = txtSize;
  }

  fill(array) {
    let dArray = [];
    let height = 0;
    for (let i = 0 ; i < array.length; i++ )
    {
      let paragraph = document.createElement('div');
      paragraph.style.fontSize =this.textSize;
      paragraph.innerText = array[i].desc;
      paragraph.style.height = 'auto';
      paragraph.style.width = '100%'
      paragraph.style.overflowWrap = 'break-word'
      paragraph.style.padding = this.textSize + 'px';
      paragraph.style.textAlign = 'left';
      paragraph.style.textIndent = 24 + 'px';
      paragraph.style.borderWidth = 2 + 'px';
      paragraph.style.borderColor = "Black";
      this.mContainer.appendChild(paragraph);
      height = paragraph.offsetHeight;
      dArray.push(height);
    }
    this.mDistArray = dArray;
  }
  getDistArray()
  {        
    return this.mDistArray;
  }
  getDistArray()
  {        
    return this.mDistArray;
  }
}

class HistoryMarker{
  constructor(div, cntntArray, distArray )
  {
    this.mContainer = div;
    this.fill(cntntArray, distArray);
  }

  fill(cntntArray, distArray) {
    
    for (let i = 0 ; i < cntntArray.length; i++ )
    {
      this.write(cntntArray[i].duration,"h1");
      this.write(cntntArray[i].sDesc,"p");
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
  constructor(svg, array, textSize){
    this.mSvg = svg;
    this.fill(array,(textSize / 2));
  }
  fill(array,startDist) {
    let y1 = startDist;
    let i = 0;
    for ( i = 0 ; i < array.length; i++ )
    {
      let PosDist = array[i]
      let nLine = document.createElementNS("http://www.w3.org/2000/svg","line");
      let nDot = document.createElementNS("http://www.w3.org/2000/svg","circle");
      
      if ( i > 0)
      {
        y1 = y1 + (array[i-1]);
      }      
      let y2 = y1 + array[i];
      /** Line */
      nLine.setAttribute("stroke-width", "3");
      nLine.setAttribute("stroke", "black");
      nLine.setAttribute('x1','50%');
      nLine.setAttribute('x2','50%');
      nLine.setAttribute('y1', ''+ y1 );
      nLine.setAttribute('y2', '' + y2 );
      /** Dot */
      nDot.setAttribute('r','8');
      nDot.setAttribute('fill','red' );
      nDot.setAttribute('stroke','black' );
      nDot.setAttribute('stroke-width','2' );
      nDot.setAttribute('cx','50%' );
      nDot.setAttribute('cy','' + y1);
      
      this.mSvg.append(nLine);
      this.mSvg.append(nDot);
    }
    
  }
}
class History {
  constructor( container , array, cntntTxtSize) {
    this.mContainer = container;
    this.mCntntTxtSize = cntntTxtSize;
    this.Create(array);
  }
  Create(array) {
    this.mDivMrkr = document.createElement("div");
    this.mDivCntnt = document.createElement("div");
    this.mSVG = document.createElementNS("http://www.w3.org/2000/svg","svg");
    
    this.mDivMrkr.style.backgroundColor = "rgba(255, 0, 0, 1)"  ;
    this.mDivMrkr.style.width = "33%";
    this.mDivMrkr.style.boxSizing = "border-box";
    this.mDivMrkr.style.cssFloat = "left";
    this.mDivMrkr.style.overflow = "auto";
    
    this.mDivCntnt.style.backgroundColor = "rgba(0, 255, 0, 1)";
    this.mDivCntnt.style.width = "33%";
    this.mDivCntnt.style.cssFloat = "left";
    this.mDivCntnt.style.boxSizing = "border-box";
    this.mDivCntnt.style.boxSizoverflowing = "auto";

    this.mSVG.style.backgroundColor = "rgba(0, 0, 255, 1)";
    this.mSVG.style.width = "10%";
    this.mSVG.setAttribute("height", "6000px")
    this.mSVG.style.cssFloat = "left";
    this.mSVG.style.boxSizing = "border-box";
    this.mSVG.style.boxSizoverflowing = "auto";
        
    this.mContainer.style.overflow = "auto";

    this.mContainer.appendChild(this.mDivMrkr);
    this.mContainer.appendChild(this.mSVG);
    this.mContainer.appendChild(this.mDivCntnt);
    
    this.mObjCntnt = new HistoryContent(this.mDivCntnt, array, this.mCntntTxtSize);
    this.mObjMrkr = new HistoryMarker(this.mDivMrkr, array);
    this.mObjPath = new HistoryGraph(this.mSVG, this.mObjCntnt.getDistArray(), this.mCntntTxtSize);
  }
  
}