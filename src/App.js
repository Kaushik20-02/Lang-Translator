//libretranslate: use the below values according to the site
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  //to store all those data( diff language) in option// Initially English (en)
  const [options, setOptions]= useState([])
  const [to, setTo]= useState('en')   
  const [from, setFrom]= useState('en')
  const [input, setInput]= useState('')
  const [output, setOutput]= useState('')

  const translate= ()=>{
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      //we can't pass json type here
    //urlencoded(website) needed so jst copy it from below
    const params= new URLSearchParams()
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    /*axios.post('https://libretranslate.de/translate',{
      q:input, source: from, target: to,
      api_key: ('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    },*/
  
    axios.post('https://libretranslate.de/translate',params,{
    headers:{'accept':' application/json',
    'Content-Type':'application/x-www-form-urlencoded',
  },
    }).then(res=>{ 
      console.log(res.data)
      setOutput(res.data.translatedText)
    })
  }


  useEffect(()=>{
    axios.get('https://libretranslate.com/languages',
    {headers:{accept:'application/json'},}).then(res=>{
      console.log(res.data)
      setOptions(res.data)
    })
  },[]) //to stop infinite loop in react we must pass [] array
  

  return (
    <div className="App relative">
      <h1 className='mt-[-8rem] p-14 font-extrabold
       text-[3rem] text-yellow-500 underline'>Leo's LangTrans</h1>
      <div className=' text-gray-500 flex w-full align-center justify-center'>
      <div className='pr-[4rem]'>
     From ({from}) :  {/*this ll show en, ar, lang in short*/}
     <select onChange={e=>setFrom(e.target.value)}
      className='text-slate-800 font-bold rounded-[1rem] 
      outline-none border-none pl-[1rem] cursor-pointer'> 
      {options.map(opt=><option key={opt.code}>
        {opt.name}</option>)}

      {/*this 2 r dropdown put in above
      <option value='1'>1</option>
      <option value='1'>2</option>  */}
     </select>
    </div>

     To ({to}) :
     <select onChange={e=>setTo(e.target.value)}
     className=' text-slate-800 font-bold rounded-[1rem]
     outline-none border-none pl-[1rem] cursor-pointer'> 
      {/* Samee  this 2 r dropdown */}
      {options.map(opt=><option key={opt.code}>
        {opt.name}</option>)}
     </select>
      </div>

      <div className='mt-[3rem] xl:flex w-full align-center 
      justify-around sm:gap-[4rem] sm: flex'>
      <div className=' text-slate-900 text-[2rem] font-semibold'>
        
        <textarea cols='30' rows='4' className='rounded-[2rem]
         bg-gray-300 pl-9 pt-9 resize-none border-none
          outline-none' placeholder='Enter the txt'
         onInput={(e)=>setInput(e.target.value)}></textarea>
      
      </div>
      <div className=' text-slate-900 text-[2rem] font-semibold'>
        
        <textarea  cols='30' rows='4' className='rounded-[2rem]
         bg-slate-400 pl-9 pt-9 resize-none border-none
          outline-none' placeholder='Enter the txt'
        value={output}></textarea>
      </div>
      </div>
      <div>
        <button onClick={e=>translate()}className=' bg-red-400
        mt-[-8rem] ml-[-2.8rem] p-4 rounded-xl 
        absolute '>
          Translate</button>
      </div>
    </div>
  );
}

export default App;
