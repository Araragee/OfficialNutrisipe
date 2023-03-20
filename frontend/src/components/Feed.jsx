import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../utils/fetchUser';
import { client } from '../client';
import { feedQuery, searchQuery, userQuery, userFollowingPost } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-nGreen text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [text, setText] = useState('All Recipes');
  const [activeBtn, setActiveBtn] = useState('All Recipes');
  const { userId } = useParams();
  const { categoryId } = useParams();

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?.sub]);


  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    };
    if (text === 'All Recipes') {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } 
    else {
      setLoading(true);
        const followingpost = userFollowingPost(user.id);
        client.fetch(followingpost)
        .then((data) => {
         setPins(data);
         setLoading(false);
        });
    }
  }, [text, userId, categoryId ]);

  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} recipes to your feed!`} />
    );
  }
  return (
    
    <div>
      <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('All Recipes');
              }}
              className={`${activeBtn === 'All Recipes' ? activeBtnStyles : notActiveBtnStyles}`}
              
            >
              All Recipes
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('For you');
              }}
              className={`${activeBtn === 'For you' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              For you
            </button>
          </div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
      {pins?.length == 0 &&
        <div className="mt-10 text-center text-xl ">No Recipes Found!</div>
      }
    </div >
  );
};

export default Feed;