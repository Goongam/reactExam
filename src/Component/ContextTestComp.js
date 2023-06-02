import { useContext } from "react";
import { createContext } from "react";
import ContextUsed from "./ContextTest/Contextused";
import ContextNotUsed from "./ContextTest/ContextNotUsed";

export const CacheKeysContext = createContext({
    postsKey: "/api/posts",
});
  
export const useCacheKey = () => useContext(CacheKeysContext);

export default function ContextTestComp(){
    return <>
        <CacheKeysContext.Provider value={{postsKey:'test'}}>
            <ContextUsed />
        </CacheKeysContext.Provider>
        <br></br>
        <ContextNotUsed />
    </>
}