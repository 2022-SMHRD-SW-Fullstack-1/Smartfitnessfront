import React from 'react'
import VideoPlayer from '../Components/VideoPlayer'

const BookEq = () => {

  const params = new URLSearchParams(window.location.search)
  const name =params.get("name")
  const video = params.get("video")

  return (
    <div className='pagesDiv'>
        <h1>Book Equipment</h1>
        <h2>{name}</h2>
        <VideoPlayer url={video}/>
    </div>
  )
}

export default BookEq