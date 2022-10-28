//how to fet queries 
//categories

import dairy from '../assets/categories/dairy.jpg';
import fats from '../assets/categories/Fats.jpg';
import fish from '../assets/categories/fish.jpg';
import fruits from '../assets/categories/Fruits.jpg';
import meat from '../assets/categories/meat.jpg';
import protein from '../assets/categories/Protein.jpg';
import veg from '../assets/categories/veg.jpg';

export const categories = [
  {
    name: 'Vegetables',
    image: veg,
     
  },
  {
    name: 'Dairy Foods',
    image: dairy,
  },
  {
    name: 'Fats',
    image: fats,
  },
  {
    name: 'Protein',
    image: protein,
  },
  {
    name: 'Fruits',
    image: fruits,
  },
  {
    name: 'Fish and Seafoods',
    image: fish,
  },
  {
    name: 'Meat and Poultry',
    image: meat,
  },
  {
    name: 'others',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      procedure,
      ingredient[],
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    ingredient[],
    category,
    procedure,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    procedure,
    ingredient[],
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            procedure,
            ingredient[],
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    procedure,
    ingredient[],
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    procedure,
    ingredient[]
    postedBy->{
      _id,
      userName,
      ingredient[],
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};



/*
export const userfollowers = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}'] | order(_createdAt desc) {
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};


export const userfollowing = `*[_type == "user"] | order(_createdAt desc) {
  image,
  _id,
  _type,
  userName,
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
} `;


export const image = `*[_type == "user"] | or` */