import { useState, useEffect } from 'react';

function CoinTracker(){
//https://api.coinpaprika.com/v1/tickers
    const [data, setData] = useState([]);
    const [sortPriceASC, setSortPriceASC] = useState(true);
    const [loading, setLoading] = useState(true);
    const [searchCoin, setSearchCoin] = useState('');

    const [Coins, setCoins] = useState([]);

    useEffect(()=>{
        (async function(){ //fetch 연습
            let res = await fetch("https://goongam.github.io/data.json");
            let data1 = await res.json();
            console.log(data1);
        })();
        
        fetch("https://api.coinpaprika.com/v1/tickers").then(
            (response)=>response.json()
        ).then(
            (jsonData)=>{
                setCoins(jsonData);
                setData(jsonData);
                setLoading(false);
            }
        );
        
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

    function changeSearch(e){
        setSearchCoin(e.target.value);
    }
    function keyDownSearch(e){
        if(e.key === "Enter") SearchCoin()        
    }

    function SearchCoin(){
        let CopyData = Coins;
        CopyData = CopyData.filter((value)=> value.name.includes(searchCoin) );
        
        setData(CopyData);
        console.log(CopyData.length);
    }

    return (
        <div>
            <h2>Coins ({data.length}) </h2>
            
            {loading ? 'loading...':
                <div>
                    <input type='text' placeholder='Search CoinName...' onKeyDown={keyDownSearch}  onChange={changeSearch} value={searchCoin} ></input>
                    <button onClick={SearchCoin}>SEARCH</button>
                    { data.length === 0 ? <div>No Result</div>:
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
                    }
                </div>
            }
        </div>
    );
}

export default CoinTracker;