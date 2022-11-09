import React from 'react'
import BgVideo from '../../img/mainvideo.mp4'

const MainEvent = () => {
  return (
    <div>

        {/* 비디오 출력 */}
        <div id='videoDiv'>
            <video src={BgVideo} autoPlay muted loop id="video-bg"/>
        </div>

    </div>
  )
}

export default MainEvent