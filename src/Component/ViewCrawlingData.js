import { useParams } from "react-router-dom";

function ViewCrawlingData(){
    
    const nickname = useParams();
    
    return (
        <>
            {nickname}
        </>
    );
}