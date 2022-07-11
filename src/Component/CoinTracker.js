import { useMemo, useState, memo, useEffect } from 'react';

function CoinTracker(){
//https://api.coinpaprika.com/v1/tickers
    const [data, setData] = useState([]);
    const [sortPriceASC, setSortPriceASC] = useState(true);

    useEffect(()=>{
        setTimeout( ()=>{
            fetch("https://api.coinpaprika.com/v1/tickers").then(
                (response)=>response.json()
            ).then(
                (jsonData)=>{
                    setData(jsonData);
                }
            )
        }, 0 );
    },[]);

    function coinSortByPriceASC(){
        let copyData = [...data];
        copyData.sort((a, b)=>{
            if(a.quotes.USD.price < b.quotes.USD.price) return -1;
            if(b.quotes.USD.price < a.quotes.USD.price) return 1;
            return 0;
        })
        setData(copyData);
        setSortPriceASC(false);
    }
    function coinSortByPriceDESC(){
        let copyData = [...data];
        copyData.sort((a, b)=>{
            if(a.quotes.USD.price > b.quotes.USD.price) return -1;
            if(b.quotes.USD.price > a.quotes.USD.price) return 1;
            return 0;
        })
        setData(copyData);
        setSortPriceASC(true);
    }
    return (
        <div>
            
            <h2>Coins ({data.length}) </h2>
            <table style={ {"textAlign":"center"} }>
                <tr>
                    <th>name</th>
                    <th>symbol</th>
                    <th>price {sortPriceASC ? 
                        <button onClick={coinSortByPriceASC}>▼</button> : 
                        <button onClick={coinSortByPriceDESC}>▲</button>}  
                    </th>
                </tr>

            {
                data.map( (coin,index)=>
                    <tr key={index}>
                        <td>{coin.name}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.quotes.USD.price}</td>
                    </tr>
             )
            }
 
            </table>
        </div>
    );
}

export default CoinTracker;