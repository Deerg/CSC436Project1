
import { useState, useEffect } from "react";
import axios from "axios";

const ConversionRates = () => {

    const apiURL = "https://api.coindesk.com/v1/bpi/currentprice.json";
    const [api, setAPI] = useState(null);
    const [load, setLoad] = useState(false);
    const [time, setTime] = useState(Date.now);
    const [inital, setInitial] = useState(true);
    const [gen, setGen] = useState(false);
    fetch = () => {
        const timeNow = Date.now();
        console.log(timeNow-time);
        if(timeNow - time >= 3000000 || inital)
        {
            window.setTimeout(() => {
                axios.get(apiURL).then((response) => {
                    setAPI(response.data);
                    });
                    setInitial(false);
                    setLoad(true);
            },4000);
        }else{
            alert("Cannot Fetch AGAIN, not 5 minutes yet, U may only return to initial state. API will not be fetched");
        }
    }
       
    const generateRate = () => {
        setGen(true);
    }
    useEffect(() => 
    {
    },);

        return (<div>
            {!!!load && <p>Loading...Wait 3 second for after button click<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetch}>Start Loading</button></p>}
            {load && <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generateRate}>Generate</button>}
            {
                load&&(gen)&&
                <ol>
                <li> $1 USD to {(1/parseFloat(api.bpi.USD.rate_float)).toFixed(7)} BTC, 1 BTC to ${api.bpi.USD.rate}</li>
                <li> £1 USD to {(1/parseFloat(api.bpi.USD.rate_float)).toFixed(7)} BTC, 1 BTC to £{api.bpi.GBP.rate}</li>
                <li> €1 USD to {(1/parseFloat(api.bpi.USD.rate_float)).toFixed(7)} BTC, 1 BTC to €{api.bpi.EUR.rate}</li>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetch}> FETCH AGAIN </button>
                </ol>
            }
            </div>)


    
}

export default ConversionRates;
