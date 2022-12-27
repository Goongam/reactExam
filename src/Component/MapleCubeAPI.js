import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from "react-query";

let date = "2022-11-28";
const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjUwMzY3NTY2MyIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNjg3MDY2MTI2LCJpYXQiOjE2NzE1MTQxMjYsIm5iZiI6MTY3MTUxNDEyNiwic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.QwN-tMq_EJ2yIw258L3R3KASyRXGTrv742jJtre1_lA`;
const initurl = `http://cors-anywhere.herokuapp.com/https://public.api.nexon.com/openapi/maplestory/v1/cube-use-results?count=100&date=${date}&cursor=`
const nexturl = `http://cors-anywhere.herokuapp.com/https://public.api.nexon.com/openapi/maplestory/v1/cube-use-results?count=100&date=&cursor=`;

async function getapi(url){
    const res = await fetch(url,{
        headers: {
            'mode': 'cors',
            'Authorization':key
        },
    });
    const json = await res.json();
    console.log(json);
    return json;
}

export default function MapleCubeAPI(){

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isError,
        error,
        isFetching
    } = useInfiniteQuery(
        ['cube-his'],
        ({pageParam = initurl})=> getapi(pageParam),
        {
            getNextPageParam: (lastpage) => {
                if(lastpage.next_cursor === "") return undefined;
                return nexturl+lastpage.next_cursor
            }
        }
    )

    if(isLoading) return <div>loading...</div>
    if(isError) return <>Error!</>;
    return (
        <>
            <button onClick={()=>{fetchNextPage()}}>next</button>

            <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
                {
                    data.pages.map((pageData)=>
                        pageData.cube_histories.map((hisData)=>
                            <div className='his-data'>
                                <div>{hisData.character_name}</div>
                                <div>{hisData.create_date}</div>
                                <div>{hisData.cube_type}</div>
                                <div>{hisData.before_potential_options}</div>
                                <div>{hisData.after_potential_options}</div>
                            </div>
                        )
                    )
                }
            </InfiniteScroll>
        </>
    );
}