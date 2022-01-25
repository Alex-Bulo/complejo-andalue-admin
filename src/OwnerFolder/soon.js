import { useHistory } from "react-router-dom";

function Soon(){
    const history = useHistory()
    console.log(history);

    return(
        <div>PROXIMAMENTE</div>
    )
}
export default Soon