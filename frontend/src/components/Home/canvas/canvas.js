import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './canvas.css'
import shining_cloth from '../../../assets/images/clean-clothes.png'

export const Canvas = () => {
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
    const [chatlogs, setchatlogs] = useState();
    const [grid, setgrid] = useState();
    const [loadingon, setloadingon] = useState(false);
    const [assist, setassist] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
     
    
      
     
    }, [])
    
    const handlesend=async(e)=>{
      e.preventDefault();

      const find_product=async()=>{
     
        const response=await fetch(`http://localhost:4000/api/v1/getoutfit`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
          },
          body: JSON.stringify({user_input:document.getElementById('chat-input').value})
          
      });
      let json=await response.json();
      console.log(json)
      localStorage.setItem('items',JSON.stringify(json))
      let ch_lg=document.getElementById('cth_here');
      let gridelly=`<div class="grid grid-cols-2 gap-2">`
      
      if(json.topwear.length){
        console.log(json.topwear[0].images[0].url)
        gridelly=gridelly+`<div class='fou_div'>
        <div class='outfit_image_icons_div'>
        <div class="icon1">
          <button id="cart${json.topwear[0]._id}" class='outfit_image_icons_btn pro_cart_btn'>
          <svg id="sart${json.topwear[0]._id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill pro_cart_btn" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
    </svg>
          </button>
        </div>
        <div class="icon1">
        <button class='outfit_image_icons_btn'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
    </svg>
          </button>
        </div>
      </div>
        <img class="h-auto max-w-full rounded-lg prod_img" src="${json.topwear[0].images[0].url}" alt="${json.topwear[0].specifications.Category}" />
      </div>`
      
      }
      if(json.bottomwear.length){
        console.log(json.bottomwear[0].images[0].url)
        gridelly=gridelly+`<div class='fou_div'>
        <div class='outfit_image_icons_div'>
        <div class="icon1">
          <button id="cart${json.bottomwear[0]._id}" class='outfit_image_icons_btn pro_cart_btn'>
          <svg id="sart${json.bottomwear[0]._id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="pro_cart_btn bi bi-bag-plus-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
    </svg>
          </button>
        </div>
        <div class="icon1">
        <button class='outfit_image_icons_btn'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
    </svg>
          </button>
        </div>
      </div>
        <img class="h-auto max-w-full rounded-lg prod_img" src="${json.bottomwear[0].images[0].url}" alt="${json.topwear[0].specifications.Category}" />
      </div>`
      }
      if(json.footwear.length){
        console.log(json.footwear[0].images[0].url)
        gridelly=gridelly+`<div id="fou_div${json.footwear[0]._id}" class='fou_div'>
        <div class='outfit_image_icons_div'>
        <div class="icon1">
          <button id="cart${json.footwear[0]._id}" class='outfit_image_icons_btn pro_cart_btn'>
          <svg id="sart${json.footwear[0]._id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill pro_cart_btn" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
    </svg>
          </button>
        </div>
        <div class="icon1">
       
        <button id="0${json.footwear[0]._id}" name="0${json.footwear[0]._id}" class='outfit_image_icons_btn pro_reload_btn'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
    </svg>
          </button>
        </div>
      </div>
        <img class="h-auto max-w-full rounded-lg prod_img" src="${json.footwear[0].images[0].url}" alt="${json.topwear[0].specifications.Category}" />
      </div>`
      }
      if(json.accessories.length){
        console.log(json.accessories[0][0].images[0].url)
        let acc_size=json.accessories.length
        for (let index = 0; index < acc_size; index++) {
          if(json.accessories[index].length){
            gridelly=gridelly+`<div class='fou_div'>
            <div class='outfit_image_icons_div'>
            <div class="icon1">
              <button id="cart${json.accessories[index][0]._id}" class='outfit_image_icons_btn pro_cart_btn'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
    </svg>
              </button>
            </div>
            <div class="icon1">
            <button class='outfit_image_icons_btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
    </svg>
              </button>
            </div>
          </div>
            <img class="h-auto max-w-full rounded-lg prod_img" src="${json.accessories[index][0].images[0].url}" alt="${json.topwear[0].specifications.Category}" />
          </div>`
          }
         
          
        }
       
      }
      
      gridelly=gridelly+`</div>`
      setloadingon(false)
      // setgrid(grid+gridelly)
      ch_lg.innerHTML=ch_lg.innerHTML+gridelly;
      console.log("before lam")
      setTimeout(lam, 5000);
       }
    let chatinput=document.getElementById('chat-input').value

    if(chatinput.length==0){
    
      
    }
    else{
    
      functiontoaddusermessage(chatinput);
    setTimeout( scrolldwon,0)
    setTimeout( functiontoaddbotmessage,1000)
    setTimeout( scrolldwon,1000)
    setTimeout( functiontosetload,1500)
      
     
      setTimeout(find_product, 4000);
      setTimeout( scrolldwon,1700)
      setTimeout(functiontoaddbotmessage3, 5000); 
      setTimeout( scrolldwon,5100)
    }
     
     
    
    }
const chattoggler=()=>{
    setIsChatBoxOpen(!isChatBoxOpen);
    
    if(assist==false)
    setTimeout( functiontoaddbotmessage2,1700)
}
const functiontosetload=()=>{
  setloadingon(true)
}
function lam(){
  console.log("first nj")
  const elements = document.querySelectorAll('.pro_reload_btn');
  elements.forEach(element => {
    element.addEventListener('click', refresh_product);
  });
  const elements2 = document.querySelectorAll('.pro_cart_btn');
  elements2.forEach(element => {
    element.addEventListener('click', goto_product);
  });
}
const functiontoaddbotmessage=(m)=>{
  document.getElementById('cth_here').innerHTML=document.getElementById('cth_here').innerHTML+`<div class="bot_message">
  <div class="bot_mess message_last">
  Sure, We're finding outfit for you
  </div>
</div>`
}
const functiontoaddbotmessage2=(m)=>{
  document.getElementById('cth_here').innerHTML=document.getElementById('cth_here').innerHTML+`<div class="bot_message">
  <div class="bot_mess message_last">
  How can i assist you today?
  </div>
</div>`
}
const functiontoaddbotmessage3=(m)=>{
  document.getElementById('cth_here').innerHTML=document.getElementById('cth_here').innerHTML+`<div class="bot_message">
  <div class="bot_mess message_last">
  If you wish to change anything, Just click on the icon by hovering over it.
  </div>
</div>`
}

const functiontoaddusermessage=(m)=>{
  document.getElementById('cth_here').innerHTML=document.getElementById('cth_here').innerHTML+`<div class="user_message">
  <div class="user_mess message_last">
   ${m}
  </div>
  </div>`
}


function goto_product(e){
  // navigate('/product/64da134e80dd2d19559e9362');
  console.log(e)
  let cartid=e.target.id
  cartid=cartid.slice(4)
  window.open(`/product/${cartid}`, '_blank');
}
function refresh_product(e){
  let targetid=e.target.id
  console.log(e.target.id,e)
  let items=localStorage.getItem('items')
  items=JSON.parse(items)
  
  let i=0
  let idofdiv=`fou_div${targetid.slice(1)}`
  console.log(idofdiv,"targetid=",targetid)
  let item_div=document.getElementById(idofdiv)
  item_div.innerHTML=` <div class='outfit_image_icons_div'>
  <div class="icon1">
    <button id="cart${items.footwear[1]._id}" class='outfit_image_icons_btn pro_cart_btn'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill pro_cart_btn" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
</svg>
    </button>
  </div>
  
  <div class="icon1">
 
  <button id="0${items.footwear[1]._id}" name="0${items.footwear[1]._id}" class='outfit_image_icons_btn pro_reload_btn'>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>
    </button>
  </div>
</div>
  <img class="h-auto max-w-full rounded-lg prod_img" src="${items.footwear[1].images[0].url}" alt="${items.topwear[0].specifications.Category}" />`

}

function scrolldwon(){
  document.getElementById('chatlogs').scrollTop=document.getElementById('chatlogs').scrollHeight
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
{grid}
</div>

{/* <div className="bot_message">
    <div className="bot_mess message_last">
      Hello, how's it going?
    </div>
  </div>

<div className="user_message">
    <div className="user_mess message_last">
      This is ussr message
    </div>
  </div> */}

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
          <div className='outfit_image_icons_div'>
            <div className="icon1">
              <button className='outfit_image_icons_btn'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
</svg>
              </button>
            </div>
            <div className="icon1">
            <button className='outfit_image_icons_btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>
              </button>
            </div>
          </div>
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
