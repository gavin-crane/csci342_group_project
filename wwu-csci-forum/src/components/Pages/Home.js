import React, {useEffect, useState} from 'react';
import LeftBar from '../LeftBar/LeftBar';
import ThreadList from '../ThreadList/ThreadList'
import Thread from '../Thread/Thread';
import './Home.css'
import {loadedChips, chipBank} from '../../util/chips/chips.js';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [chipData, setChipData] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/getPosts');
      const data = await response.json();
      setPosts(data.reverse()); // reverse to get most recent posts rendered first
    }

    fetchPosts();
  }, []);

  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (chipData.length > 0) {
      const filtered = posts.filter((post) => {
        return post.chipData.some((chip) => chipData.map((c) => c.label).includes(chip.label));
      });
      setFilteredPosts(filtered);
    }
    else {
      const filtered = posts;
      setFilteredPosts(filtered);
    }

  }, [chipData, posts]);

  return (
    <>
      <div className="homeContent">
        <LeftBar loadedChips={loadedChips} chipBank={chipBank} setChipData={setChipData} />
        <div className="ThreadList">
          {filteredPosts.map((post) => (
            <Thread postDetails={post} key={post.id} />
          ))}
        </div>
      </div>
    </>
  );
}


