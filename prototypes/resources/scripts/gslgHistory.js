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
      let paragraph = document.createElement('p');
      paragraph.innerText = array[i].desc;
      paragraph.style.borderStyle = "stroke:black, stroke-width:2"
      this.mContainer.appendChild(paragraph);
      height = paragraph.offsetHeight;
      console.log('Height(' + i + '):' + height );
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
  constructor(svg, array, startDist){
    this.mSvg = svg;
    this.fill(array,startDist);
  }
  fill(array,startDist, LOG) {
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
    let nLastDot = document.createElementNS("http://www.w3.org/2000/svg","circle");
    nLastDot.setAttribute('r','8');
    nLastDot.setAttribute('fill','red' );
    nLastDot.setAttribute('stroke','black' );
    nLastDot.setAttribute('stroke-width','2' );
    nLastDot.setAttribute('cx','50%' );
    y1 = y1 + array[array.length -1];
    nLastDot.setAttribute('cy','' + y1);
    this.mSvg.append(nLastDot);
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

    this.mObjCntnt = new HistoryContent(this.mDivCntnt, array);
    this.mObjMrkr = new HistoryMarker(this.mDivMrkr, array);
    this.mObjPath = new HistoryGraph(this.mSVG, this.mObjCntnt.getDistArray(),16);
  }
  
}