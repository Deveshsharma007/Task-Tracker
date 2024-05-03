import axios from 'axios';
const url="https://jsonplaceholder.typicode.com/todos";

class APICalls{
    getTasks(){
        return(
            axios({
                method:'GET',
                url:url
            })
        )
    }
}

export default new APICalls();