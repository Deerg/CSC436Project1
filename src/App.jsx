import { useEffect, useState } from 'react'
import ConversionRates from './components/ConversionRate';
import ArraySort from './components/ArraySort';
import axios from 'axios';
function App() {

  const [componentToShow, setComponentToShow] = useState('rates');
  const apiURL = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const [time, setTime] = useState(null);
  
  useEffect(()=>{
    axios.get(apiURL).then((response) => {
      setTime(response.data.time.updatedISO);
      setTime(Date(time));
      });
      
  })
  const ratesHandler = () => {
    setComponentToShow('rates');
  }
  const conversionHandler = () => {
    setComponentToShow('convert');
  }
  

  return (
    <div className="App w-[50%] mx-auto py-5">
      Updated From UTC to Browserday :
      <div>{time}</div>
      <nav class="flex justify-center gap-5">
        <button onClick={ratesHandler} className="relative inline-block text-lg group">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Rates</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </button>

        <button onClick={conversionHandler} className="relative inline-block text-lg group">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Conversion</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </button>
      </nav>

      <section className='py-5'>
        {componentToShow === 'rates' && <ConversionRates />}
        {componentToShow === 'convert' && <ArraySort />}
      </section>
    </div>
  )
}

export default App
