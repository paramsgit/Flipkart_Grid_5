import React,{useState} from 'react'
import './canvas.css'
import shining_cloth from '../../../assets/images/clean-clothes.png'

export const Canvas = () => {
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
    const [chatlogs, setchatlogs] = useState();
    const [loadingon, setloadingon] = useState(false);
 

const chattoggler=()=>{
    setIsChatBoxOpen(!isChatBoxOpen);
}

function scrolldwon(){
  document.getElementById('chatlogs').scrollTop=document.getElementById('chatlogs').scrollHeight
}

const handlesend=async(e)=>{
  e.preventDefault();
  
let chatinput=document.getElementById('chat-input').value
console.log(chatinput)

 const find_product=async()=>{
 
  const response=await fetch(`http://localhost:4000/api/v1/getoutfit`,{
    method:'post',
    headers:{
        'Content-Type':'application/json',
    },
    
});
let json=await response.json();
console.log(json)
let ch_lg=document.getElementById('cth_here');
let gridelly=`<div class="grid grid-cols-2 gap-2">`

if(json.topwear.length){
  console.log(json.topwear[0].images[0].url)
  gridelly=gridelly+`<div class='fou_div'>
  <img class="h-auto max-w-full rounded-lg" src="${json.topwear[0].images[0].url}" alt="${json.topwear[0].specifications.Category}" />
</div>`

}
if(json.bottomwear.length){
  console.log(json.bottomwear[0].images[0].url)
  gridelly=gridelly+`<div class='fou_div'>
  <img class="h-auto max-w-full rounded-lg" src="${json.bottomwear[0].images[0].url}" alt="${json.topwear[0].specifications.Category}" />
</div>`
}
if(json.footwear.length){
  console.log(json.footwear[0].images[0].url)
  gridelly=gridelly+`<div class='fou_div'>
  <img class="h-auto max-w-full rounded-lg" src="${json.footwear[0].images[0].url}" alt="${json.topwear[0].specifications.Category}" />
</div>`
}
if(json.accessories.length){
  console.log(json.accessories[0][0].images[0].url)
  gridelly=gridelly+`<div class='fou_div'>
  <img class="h-auto max-w-full rounded-lg" src="${json.accessories[0][0].images[0].url}" alt="${json.topwear[0].specifications.Category}" />
</div>`
}

gridelly=gridelly+`</div>`
setloadingon(false)
ch_lg.innerHTML=ch_lg.innerHTML+gridelly;
 }
 setloadingon(true)
 
 setTimeout(find_product, 2000);
 setTimeout( scrolldwon,10)

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

    <div  className={isChatBoxOpen?'chat-box ':'chat-box displaynone2'}>
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
      <div className="chat-logs" id='chatlogs'>
      <div className="cth_here" id='cth_here'>

</div>
     <div class={loadingon?'loading':'displaynone'}>
     <div className="grid grid-cols-2 gap-2">

     <div className='fou_div animated-background'>
            <img className="h-auto max-w-full rounded-lg" style={{opacity:"0"}} src="https://res.cloudinary.com/dcbyjkq82/image/upload/v1692114367/products/ntlmbu9aa0vaagqn6ftx.png" alt="Outfit" />
        </div>
        <div className='fou_div animated-background2'>
            <img className="h-auto max-w-full rounded-lg" style={{opacity:"0"}} src="https://res.cloudinary.com/dcbyjkq82/image/upload/v1692114367/products/ntlmbu9aa0vaagqn6ftx.png" alt="Outfit" />
        </div>
        <div className='fou_div animated-background4'>
            <img className="h-auto max-w-full rounded-lg" style={{opacity:"0"}} src="https://res.cloudinary.com/dcbyjkq82/image/upload/v1692114367/products/ntlmbu9aa0vaagqn6ftx.png" alt="Outfit" />
        </div>
        <div className='fou_div animated-background3'>
            <img className="h-auto max-w-full rounded-lg" style={{opacity:"0"}} src="https://res.cloudinary.com/dcbyjkq82/image/upload/v1692114367/products/ntlmbu9aa0vaagqn6ftx.png" alt="Outfit" />
        </div>
</div>
</div>

{/* <div className="grid grid-cols-2 gap-2">

        <div className='fou_div'>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="Outfit" />
        </div>
        <div className='fou_div'>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="Outfit" />
        </div>
        <div className='fou_div'>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="Outfit" />
        </div>
        <div className='fou_div'>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="Outfit" />
        </div>
    </div> */}

      </div>
    </div>
    <div className="chat-input">      
      <form>
        <input required='true' type="text" id="chat-input" placeholder="Send a message..."/>
      <button type="submit" onClick={handlesend} className={isChatBoxOpen?'chat-submit':'chat-submit displaynone'} id="chat-submit"><i className="material-icons">send</i></button>
      </form>      
    </div>
  </div>
  

    </>
  )
}
