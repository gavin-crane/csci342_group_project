import React, {useEffect} from 'react'
import "./LeftBar.css"


export default function LeftBar() {

  useEffect(() => {
    var floatingDiv = document.getElementByclassName("leftBarContainer")[0];
    var footerDiv = document.getElementByclassName("footer")[0];
    var floatingDivHeight = floatingDiv.offsetHeight;
    
    window.onscroll = function() {
      if (window.pageYOffset + window.innerHeight > footerDiv.offsetTop - floatingDivHeight) {
        floatingDiv.style.position = "absolute";
        floatingDiv.style.bottom = footerDiv.offsetHeight + "px";
      } else {
        floatingDiv.style.position = "fixed";
        floatingDiv.style.bottom = 0;
      }
    };}, []);
  return (
    <div className = "leftBar">
    <div className="leftBarContainer">
      <div className = "profile">
        <div className = "fill">
          <img src = "https://cdn.vectorstock.com/i/1000x1000/59/87/computer-science-lab-logo-icon-design-vector-22915987.webp" alt="logo" />
          <h1>Comp Sci</h1>
          <h2>Forum</h2>
        </div>
      </div>
    </div>
  </div>
  )
}
