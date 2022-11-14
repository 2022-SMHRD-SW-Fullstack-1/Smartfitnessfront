
import React, { useState } from 'react';
import Star from './Star';
import '../Scss/Rating.scss';
import axios from 'axios';
import { useEffect } from 'react';


const Rating = ({ numStars = 5 ,starNum}) => {
 
  const INITIAL_STARS = []

  for (let i = 0; i < numStars; i++) {
    INITIAL_STARS.push({ id: i, on: false });
  }


  const starNumber = {starNum : localStorage.getItem("star")}

  const [stars, setStars] = useState(INITIAL_STARS);
  const [lastId, setLastId] = useState(null);

  const handleStar=(e)=>{
    console.log(e.target.key)
  }


  const changeHandler = (event) => {
    setStars(event.currentTarget.value)
  }

  useEffect(()=>{

  axios.post('http://localhost:8889/smart/programs/trainer/rate', starNumber)
  .then(response =>console.log(response))
  .catch(e=>console.log(e))

  },[starNumber])





  return (
    <div className="Rating">
      <div className="Stars">
        {stars.map(star => <Star onClick={handleStar} key={star.id} star={star} stars={stars} setStars={setStars} lastId={lastId} setLastId={setLastId} />)}
      </div>
    </div>
  )
}

export default Rating;