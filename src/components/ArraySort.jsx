import { useState, useEffect } from "react";

import axios from "axios";

const ArraySort = () => {
    const [load, setLoad] = useState(false);
    const [inital, setInitial] = useState(true);
    const apiURL = "https://api.coindesk.com/v1/bpi/currentprice.json";
    const [api, setAPI] = useState(null);
    const [direction, setDirection] = useState('asc');
    let chart;
    const [arr,setArr] = useState(chart);
    const [time, setTime] = useState(Date.now);
    const [currency, setCurrency] = useState("USD");
    const [input, setInput] = useState("");
    const [result, setResult] = useState();
    fetch = () => {
        const timeNow = Date.now();
        console.log(timeNow-time);
        if(timeNow - time >= 300000 || inital)
        {
            axios.get(apiURL).then((response) => {
                setAPI(response.data);
                });
                setLoad(true);
                setInitial(false);
        }else{
            alert("Cannot Fetch AGAIN, not 5 minutes yet, U may only return to initial state. API will not be fetched");
        }
    }

    const generate = () => {
        chart = [
            {
                id:1,
                names: api.bpi.USD.code,
                num: api.bpi.USD.rate_float
            },
            {
                id:2,
                names: api.bpi.GBP.code,
                num: api.bpi.GBP.rate_float
            },
            {
                id:3,
                names: api.bpi.EUR.code,
                num: api.bpi.EUR.rate_float
            }
        ]
        setArr(chart);
        console.log(arr);
    }

    useEffect(() => 
    {
        setArr(chart);
        console.log(input);
    },[]);

    const sortNumbers = () => {
        // take the numbers variable and sort them desc if current direction is asc and vice versa
        // change direction to desc if it was asc and vice versa
        const chart = [...arr];
        if(direction === 'asc') {
            chart.sort((a,b) => b.num - a.num);
            setDirection('desc');
        } else {
            chart.sort((a,b) => a.num - b.num);
            setDirection('asc');
        }
        setArr(chart);
        console.log(arr);
    }

    const convertCurr = () => {
        if(currency === 'USD')
        {
            const total = api.bpi.USD.rate_float * input;
            setResult(total);
        }
        if(currency === 'EUR')
        {
            const total = api.bpi.EUR.rate_float * input;
            setResult(total);
        }
        if(currency === 'GBP')
        {
            const total = api.bpi.GBP.rate_float * input;
            setResult(total);
        }
    }
    /*if(arr !== undefined && api !== null){
        return (arr.map((prop) => {
            return <div>{prop.id} {prop.names} {prop.num}
            <button onClick={sortNumbers}>ReSort</button> <small>{direction}</small></div>
        }))
    }*/

    return (<div>
        {!!!load && <p>Loading...<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetch}>Start Loading</button></p>}
        {load && <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generate}>Generate Initial</button>}
        {arr !== undefined && <p>{arr.map((prop) => {
            return <div>{prop.id} {prop.names} {prop.num}</div>
        })} <button onClick={sortNumbers} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> SORT </button> <div></div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetch}> FETCH AGAIN </button>
        <div>
            <select id="curr" onChange={(e)=> {
                const selectedCurrency = e.target.value;
                setCurrency(selectedCurrency);
            }}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
            </select>
            Enter BTC Value to Convert to selected Currency
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" onChange={(e)=>{
                const userInput = e.target.value;
                setInput(userInput);
                console.log(input);
            }}></input>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={convertCurr}> SUBMIT </button>
            <div>{result}</div>
        </div>
        </p>}
    </div>)
    
}

export default ArraySort;