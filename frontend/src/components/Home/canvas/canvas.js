import React,{useState} from 'react'
import './canvas.css'
import shining_cloth from '../../../assets/images/clean-clothes.png'

export const Canvas = () => {
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
    
const chattoggler=()=>{
    setIsChatBoxOpen(!isChatBoxOpen);
}

  return (
    <>


<div onClick={chattoggler} id="chat-circle" className="btn btn-raised">
        <div id="chat-overlay"></div>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image-fill" viewBox="0 0 16 16">
  <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
</svg> */}
  <img src={shining_cloth} className='shining_cloth_icon' alt="Outfit" />
	</div>

    <div  className={isChatBoxOpen?'chat-box ':'chat-box displaynone'}>
    <div className="chat-box-header">
      Outfit Generator
      <span  onClick={chattoggler} className="chat-box-toggle">
        {/* <i className="material-icons">close</i> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>
        </span>
    </div>
    <div className="chat-box-body">
      <div className="chat-box-overlay">   
      </div>
      <div className="chat-logs">
       
<div class="grid grid-cols-2 gap-2">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="Outfit" />
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="Outfit" />
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="Outfit" />
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="Outfit" />
        </div>
    </div>

      </div>
    </div>
    <div className="chat-input">      
      <form>
        <input type="text" id="chat-input" placeholder="Send a message..."/>
      <button type="submit" className={isChatBoxOpen?'chat-submit':'chat-submit displaynone'} id="chat-submit"><i className="material-icons">send</i></button>
      </form>      
    </div>
  </div>
  

    </>
  )
}
