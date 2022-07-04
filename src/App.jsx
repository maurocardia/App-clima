import { useState, useEffect, Suspense, lazy} from 'react'
import './App.css'
import FadeLoader   from "react-spinners/FadeLoader";

const Weather = lazy(()=>import("./components/Weather"))
function App() {
  
  const [loadinScreen, setLoadingScreen]= useState(false)

   useEffect(()=>{
      
          setLoadingScreen(true)
          setTimeout(()=>{
              setLoadingScreen(false)
          },50000)
    },[])

  return (
    <div className="App">
        <Suspense fallback={<FadeLoader color="blueViolet" loading={loadinScreen} size={120}/>}>
        <div className='container' >
          <Weather/>
        </div> 
        </Suspense>
    </div>
     
  )
}

export default App
