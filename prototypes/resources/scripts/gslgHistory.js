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
  constructor(svg, array){
    this.mSvg = svg;
    this.fill(array);
  }
  fill(array) {
    
    let PosStart = 32;
    let PosDist = 160;
    for (let i = 0 ; i < array.length; i++ )
    {
      let nLine = document.createElementNS("http://www.w3.org/2000/svg","line");
      let nDot = document.createElementNS("http://www.w3.org/2000/svg","circle");
      
      let y1 = PosStart + (PosDist * i);
      let y2 = PosStart + (PosDist * (i+1));
      nLine.setAttribute('x1','50%');
      nLine.setAttribute('y1', ''+ y1 );
      nLine.setAttribute('x2','50%');
      nLine.setAttribute('y2', '' + y2 );
      nLine.setAttribute("stroke", "black");
      nLine.setAttribute("stroke-width", "3");
      
      nDot.setAttribute('r','8');
      nDot.setAttribute('cx','50%' );      
      nDot.setAttribute('cy','' + y1);
      nDot.setAttribute('stroke','black' );
      nDot.setAttribute('stroke-width','2' );
      nDot.setAttribute('fill','red' );
      
      console.warn('Part '+i + ' Y1 = ' + y1 + ' Y2 = ' + y2);

      this.mSvg.append(nLine);
      this.mSvg.append(nDot);
      this.mSvg.append("New Line"+i);
    }
  }
}
class History {
  constructor( container , array) {
    this.mContainer = container;
    this.Create(array);
  }
  Create(array) {
    this.mDivMrkr = document.createElement("div");
    this.mDivCnt = document.createElement("div");
    this.mSVG = document.createElementNS("http://www.w3.org/2000/svg","svg");
    
    this.mDivMrkr.style.backgroundColor = "rgba(255, 0, 0, 1)"  ;
    this.mDivMrkr.style.width = "33%";
    this.mDivMrkr.style.boxSizing = "border-box";
    this.mDivMrkr.style.cssFloat = "left";
    this.mDivMrkr.style.overflow = "auto";
    
    this.mDivCnt.style.backgroundColor = "rgba(0, 255, 0, 1)";
    this.mDivCnt.style.width = "33%";
    this.mDivCnt.style.cssFloat = "left";
    this.mDivCnt.style.boxSizing = "border-box";
    this.mDivCnt.style.boxSizoverflowing = "auto";

    this.mSVG.style.backgroundColor = "rgba(0, 0, 255, 1)";
    this.mSVG.style.width = "10%";
    this.mSVG.style.height = "6400";
    this.mSVG.style.cssFloat = "left";
    this.mSVG.style.boxSizing = "border-box";
    this.mSVG.style.boxSizoverflowing = "auto";
        
    this.mContainer.style.overflow = "auto";

    this.mContainer.appendChild(this.mDivMrkr);
    this.mContainer.appendChild(this.mSVG);
    this.mContainer.appendChild(this.mDivCnt);

    this.mObjMrkr = new HistoryMarker(this.mDivMrkr, array);
    this.mObjCntnt = new HistoryContent(this.mDivCnt, array);
    this.mObjPath = new HistoryGraph(this.mSVG, array);
  }
  
}