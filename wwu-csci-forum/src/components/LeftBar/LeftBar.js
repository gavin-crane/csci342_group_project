import React, {useEffect, useState} from 'react'
import "./LeftBar.css"
import FilterTags from '../FilterTags/FilterTags';
import logo from './R.jpeg';


// default searched filters
const loadedChips = [
  { key: 0, label: 'Python' },
  { key: 1, label: 'Project' },
  { key: 7, label: 'Research' },
  { key: 8, label: 'CS 247' },
]


// current filter bank, we can add as many as needed
const chipBank = [
  { key: 2, label: 'CS 241' },
  { key: 3, label: 'Internship' },
  { key: 4, label: 'Java' },
  { key: 5, label: 'CS 330' },
  { key: 6, label: 'CS 345' },
  { key: 0, label: 'Python' },
  { key: 1, label: 'Project' },
  { key: 7, label: 'Research' },
]



export default function LeftBar() {

  //chip data
  const [chipData, setChipData] = useState([]);
  const handleChipDataChange = (newChipData) => {
    setChipData(newChipData);
  };

  return (
    <div className="leftBarContainer">
      <div className = "profile">
        <div className = "fill">
          <img src = {logo} alt="logo" />
          <h1>Comp Sci</h1>
          <h2>Forum</h2>
        </div>
      </div>
      <FilterTags loadedChips={loadedChips} chipBank={chipBank} onChipDataChange={handleChipDataChange}/>
    </div>
  )
}
