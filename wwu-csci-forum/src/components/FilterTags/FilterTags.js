import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
import Button from '../Button/Button';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import './FilterTags.css';



const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function FilterTags({loadedChips , chipBank}) {

  // handle adding and deletion of chips
  const [chipData, setChipData] = React.useState(loadedChips);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleAdd = (label) => {
    const chipToAdd = chipBank.find((chip) => chip.label === label);
    if (!chipData.some((chip) => chip.key === chipToAdd.key)) {
      setChipData((chips) => [...chips, chipToAdd]);
    }
  };

  // handle search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [closestChip, setClosestChip] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searchResults = chipBank.filter((chip) =>
      chip.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchResults.length === 0) {
      setClosestChip(null);
    } else {
      setClosestChip(searchResults[0]);
    }
  };
  // end search

  

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        position: 'relative',
        background: 'rgb(200, 200, 200)',
        p: 0.5,
        m: 0,
        paddingBottom: 1,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;
        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }
        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
      <div className = "filterSearch">
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="search filters" />
      </div>
      <div>
      {!closestChip || !searchTerm ? (
          ('')
          ) : (
              chipBank.filter(data => data.label === closestChip.label).map(data => (
              <Button sx={{color: 'black', backgroundColor: 'rgba(0, 0, 0, 0.08)'}}
                key={data.key}
                onClick={() => handleAdd(data.label)}
                variant="contained"
                color="primary"
              >
                {data.label}
              </Button>
              
              ))
              )
            }
      </div>

    
    </Paper>
  );
}
