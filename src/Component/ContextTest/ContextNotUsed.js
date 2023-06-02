import { useContext } from "react";
import { CacheKeysContext } from "../ContextTestComp";

export default function ContextNotUsed(){
    const context = useContext(CacheKeysContext);

    return <>{context.postsKey}</>;
}