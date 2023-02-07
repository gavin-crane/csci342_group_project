import React, {useEffect} from 'react'
import "./LeftBar.css"
import FilterTags from '../FilterTags/FilterTags';


export default function LeftBar() {


  return (
    <div className="leftBarContainer">
      <div className = "profile">
        <div className = "fill">
          <img src = "https://cdn.vectorstock.com/i/1000x1000/59/87/computer-science-lab-logo-icon-design-vector-22915987.webp" alt="logo" />
          <h1>Comp Sci</h1>
          <h2>Forum</h2>
        </div>
      </div>
      <FilterTags/>
    </div>
  )
}
