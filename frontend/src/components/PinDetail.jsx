/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AiTwotoneDelete, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ReactTooltip from 'react-tooltip';
import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [ingredient, setIngredient] = useState();
  const navigate = useNavigate();

  const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  let alreadySaved = pinDetail?.save?.filter((item) => item?.postedBy?._id === User?.sub);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        navigate('/');
      });
  };

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
          window.location.reload();
        });
    }
  };

  // unsave a post
  const Unsave = (id) => {
    const ToRemove = [`save[userId=="${User.sub}"]`];
    client
      .patch(id)
      .unset(ToRemove)
      .commit()
      .then(() => {
        setSavingPost(false);
        window.location.reload();
      });
  };

  const deleteComment = (id) => {
    const ToRemove = [`comments[comment=="${id}"]`];
    client
      .patch(pinId)
      .unset(ToRemove)
      .commit()
      .then(() => {
        fetchPinDetails();
        setComment('');
        setAddingComment(false);
      });
    // window.location.reload();
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return (
      <Spinner message="Loading Recipe" />
    );
  }

  return (
    <>
      {pinDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg px-10 py-10"
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
            />

          </div>

          <div className="w-full p-5 flex-1 xl:min-w-620">
            {alreadySaved?.length !== 0 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  Unsave(pinDetail._id);
                }}
                className=" mt-5 bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
              >
                <AiFillHeart />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(pinDetail._id);
                }}
                type="button"
                className="mt-5 bg-gray-400 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
              >
                <AiOutlineHeart />
              </button>
            )}

            {pinDetail.postedBy?._id === User.sub && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deletePin(pinDetail._id);
                navigate('/home');
              }}
              className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
            >
              <AiTwotoneDelete />
            </button>
            )}
            <div>
              <div>
                <h1 className="text-4xl font-bold break-words mt-3 uppercase">
                  {pinDetail.title}
                </h1>
              </div>
              <p className="mt-3 py-4 capitalize font-semibold">
                {pinDetail.about}
              </p>
             
              <div className="flex justify-left items-left flex-col border bg-gray-100">
              <div class="float-root  flex">
              <div class='float-left py-4'>
              <p style={{ marginBottom: '15px' }} class="font-semibold "> Ingredients: </p>
              {pinDetail.ingredient.map((item) => (
                <div style={{ width: 'auto', height: 'auto', marginLeft: '10px', position: 'relative' }}>

                <li class="capitalize flex flex-nowrap" key="{item}">{item}</li>
                </div>
              ))}
                </div>
                <div class='float-middle py-4 ml-8'>
              <p style={{ marginBottom: '15px' }} class="font-semibold"> Ingredients Value: </p>
              {pinDetail.ingredientVal.map((item) => (
                <div style={{ width: 'auto', height: 'auto', marginLeft: '10px', position: 'relative' }}>
                  <li class=" flex flex-nowrap" key="{item}">{item}</li>
                </div>
              ))}
                 </div>
                 </div>
              <p style={{ marginBottom: '15px' }} class="font-semibold"> Procedure: </p>
              {pinDetail.procedure.map((item) => (
                <div style={{ width: 'auto', height: 'auto', marginLeft: '10px', position: 'relative' }}>
                  <li class="capitalize" key="{item}">{item}</li>
                </div>
              ))}

            </div>
            
            </div>
            <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-semibold capitalize">{pinDetail.postedBy?.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl"> Comments </h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((comment) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={comment.comment}>

                  <img
                    src={comment.postedBy?.image}
                    alt="user-profile"
                    className="pointer-events-none w-10 h-10 rounded-full cursor-pointer"
                  />

                  <div className="flex flex-col">
                    <p className="font-bold">{comment.postedBy?.userName}</p>
                    <p>{comment.comment}</p>
                  </div>
                  <div className="flex flex-col mt-4">
                    {comment?.postedBy?._id === user._id ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteComment(comment?.comment);
                        }}
                        className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                      >
                        <ReactTooltip />
                        <p data-tip="Delete Comment"><AiTwotoneDelete /></p>
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>

      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;
