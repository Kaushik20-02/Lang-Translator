//libretranslate: use the below values according to the site
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  //to store all those data( diff language) in option
   {/*Initially English (en) */}
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
    <div className="App">
      <div className=' text-slate-200'>

     From ({from}):  {/*this ll show en, ar, lang in short*/}
     <select onChange={e=>setFrom(e.target.value)}
      className='text-slate-800 font-bold'> 
      {options.map(opt=><option key={opt.code}>
        {opt.name}</option>)}

      {/*this 2 r dropdown put in above
      <option value='1'>1</option>
      <option value='1'>2</option>  */}
     </select>

     To ({to}):
     <select onChange={e=>setTo(e.target.value)}
     className=' text-slate-800 font-bold'> 
      {/* Samee  this 2 r dropdown */}
      {options.map(opt=><option key={opt.code}>
        {opt.name}</option>)}
     </select>
      </div>

      <div className='mt-[1rem]'>
      <div>
        <textarea cols='50' rows='8'
         onInput={(e)=>setInput(e.target.value)}></textarea>
      </div>
      <div>
        <textarea cols='50' rows='8' value={output}></textarea>
      </div>
      <div>
        <button onClick={e=>translate()}className=' bg-red-400'>Translate</button>
      </div>
      </div>
    </div>
  );
}

export default App;