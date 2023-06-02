import { useContext } from "react";
import { CacheKeysContext } from "../ContextTestComp";

export default function ContextUsed(){
    const context = useContext(CacheKeysContext);

    return <>{context.postsKey}</>;
}