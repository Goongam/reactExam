import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';


async function prefetching(id){
    const res = await fetch(`http://localhost:3001/GetArticleContent/${id}`);
    // const json = await 
   return res.json();

   
}
async function fetching62(){
   const res = await fetch("http://localhost:3001/GetArticleContent/62");
   return await res.json();
}

export default function Prefetching(){
    const [articleId , setArticleId] = useState(60);
    const queryClient = useQueryClient();
    useEffect(()=>{
        queryClient.prefetchQuery([62], fetching62);
    },[articleId,queryClient]);

    const {data, isLoading, isError, error} = useQuery([articleId], ()=>prefetching(articleId) );
    if(isLoading) return <>Loading...</>
    if(isError) return <>error</>

    return(
        <>
            {/* <button onClick={prefetching}>60</button> */}
            <button onClick={()=>setArticleId(62)}>62</button><br></br>
            {data.CONTENT}
        </>
    );
}