function toAngle(Number, Index) {
  let angle = (2 * Math.PI * Index) / Number;
  return angle;
}
function toXY(center, radius, angle) {
  let XYPos = {
    x: radius,
    y: radius
  };
  XYPos.x = center.x + (radius * Math.sin(angle));
  XYPos.y = center.y + (radius * Math.cos(angle));;
  return XYPos;
}
function RadarFigure(svg, ValueA, ValueC, color) {
  /* Values: */
  let width = svg.clientWidth;
  let height = svg.clientHeight;
  let center = {
    x: (width / 2),
    y: (height / 2)
  };
  let MaxRadius = Math.min(center.x, center.y);
  let RadiusMarker = MaxRadius - 16; /*px*/
  let RadiusBorder = RadiusMarker - 16;/*px*/
  let Radius = RadiusBorder - 16;

  /* Single Elements */
  let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute("fill", color);
  polygon.setAttribute("stroke", color);
  polygon.setAttribute("fill-opacity", 0.4);
  polygon.setAttribute("stroke-opacity", 0.4);
  polygon.setAttribute("stroke-width", 2);

  /*Creaet Axis Related Elements*/
  for (let i = 0; i < ValueC; i++) {
    /*Values*/
    let phi = toAngle(ValueC, i);
    let r = (Radius * ValueA[i]) / 100;
    let posVal = toXY(center, r, phi);
  
    /*Elements:*/
    let point = svg.createSVGPoint();
    /*Daimond Edges: */
    point.x = posVal.x;
    point.y = posVal.y;

    /*Append*/
    polygon.points.appendItem(point);
  }
  svg.appendChild(polygon);
}
function RadarPlane(svg, ValueA, ValueC, enableMRing, RingCnt, RingColor, ) {
  /* Values: */
  let width = svg.clientWidth;
  let height = svg.clientHeight;
  let center = {
    x: (width / 2),
    y: (height / 2)
  };
  let MaxRadius = Math.min(center.x, center.y);
  let RadiusMarker = MaxRadius - 16; /*px*/
  let RadiusBorder = RadiusMarker - 16;/*px*/
  let Radius = RadiusBorder - 16;
  let RingRadius = Radius;

  /*Create Rings*/
  for (i = 0; i < RingCnt; i++) {
    let ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute("cx", center.x);
    ring.setAttribute("cy", center.y);
    ring.setAttribute("r", (((RingRadius * (i + 1)) / RingCnt)));
    ring.setAttribute("stroke", RingColor);
    ring.setAttribute("stroke-width", "2");
    ring.setAttribute("fill-opacity", "0");
    svg.appendChild(ring);
  }

  /*Creaet Axis Related Elements*/
  for (let i = 0; i < ValueC; i++) {
    /*Values*/
    let phi = toAngle(ValueC, i);
    let r = (Radius * ValueA[i]) / 100;
    let posVal = toXY(center, r, phi);
    let posAxis = toXY(center, r, phi);
    let posMarker = toXY(center, r + 20, phi);
    if (RingCnt > 0) {
      posMarker = toXY(center, RadiusMarker, phi);
      posAxis = toXY(center, Radius, phi);
    }
    /*Elements:*/
    let marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    let mLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    /*Axis: */
    line.setAttribute("x1", center.x);
    line.setAttribute("y1", center.y);
    line.setAttribute("x2", posAxis.x);
    line.setAttribute("y2", posAxis.y);
    line.setAttribute("stroke", RingColor);
    line.setAttribute("stroke-width", "2");

    /*Marker:*/
    marker.setAttribute("cx", posMarker.x);
    marker.setAttribute("cy", posMarker.y);
    marker.setAttribute("r", 12);
    marker.setAttribute("stroke", RingColor);
    marker.setAttribute("stroke-width", "2");
    marker.setAttribute("fill-opacity", "0");

    /*Lable: */
    mLabel.setAttribute("x", posMarker.x);
    mLabel.setAttribute("y", posMarker.y);
    mLabel.textContent = (i + 1);
    mLabel.setAttribute("fill", RingColor);
    mLabel.setAttribute("font-weight", "bold");
    mLabel.setAttribute("font-family", "Verdana");
    mLabel.setAttribute("dominant-baseline", "middle");
    mLabel.setAttribute("text-anchor", "middle");

    /*Append*/
    svg.appendChild(line);
    svg.appendChild(mLabel);
    if (enableMRing == 1)
    {
      svg.appendChild(marker);
    }
  }
}
function RadarLegend(list, Elements, ElementCount) {
  /*Frame:*/
  /*Elements*/
  for (i = 0; i < ElementCount; i++) {
    let litem = document.createElement('li');
    litem.innerHTML = Elements[i];
    list.appendChild(litem);
  }
}


/**/
