import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AiTwotoneDelete } from 'react-icons/ai';
import { client, urlFor } from '../client';

const Pin = ({ pin, socket, user }) => {
  const navigate = useNavigate();
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const { postedBy, image, _id} = pin;

  const User = localStorage.getItem('User') !== 'undefined' ? JSON.parse(localStorage.getItem('User')) : localStorage.clear();

  let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === User?.sub);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: User?.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: User?.sub,
          },
        }])
        .commit()
        .then(() => {
          setSavingPost(false);
        });
    }
  };
  

  // delete a post
  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload(false);
      });
      
  };
  // unsave a post
  const Unsave = (id) => {
    const ToRemove = [`save[userId=="${User?.sub}"]`];
    client
      .patch(id)
      .unset(ToRemove)
      .commit()
      .then(() => {
        window.location.reload(false);
      });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >

        {image && (
        <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="User-post" />)}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">

              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    Unsave(_id);
                  }}
                  className="bg-nOrange opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  Unsave
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-nOrange opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {savingPost ? 'Saving' : 'Save'}
                </button>
              )}

              {postedBy?._id === User?.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`/User-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="User-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};
export default Pin;
