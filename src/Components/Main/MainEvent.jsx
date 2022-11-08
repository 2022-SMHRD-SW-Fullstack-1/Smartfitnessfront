import React from 'react'
import BgVideo from '../../img/mainvideo.mp4'
import '../../Css/video.css'

const MainEvent = () => {
  return (
    <div>

        {/* 비디오 출력 */}
        <div className='videoDiv'>
            <video src={BgVideo} autoPlay muted loop className="video-bg"/>
        </div>

    </div>
  )
}

export default MainEvent