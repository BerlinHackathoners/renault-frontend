import axios from 'axios';

const KNOWLEDGE_API = 'http://localhost:8080/knowledge?query='
const DESCRIPTION_API = 'http://localhost:8080/intent?query='

export function get_api_call_test() {
    return axios.get('https://jsonplaceholder.typicode.com/users')

}

export function get_knowledge_async(queryObject) {
    /*
        params: queryObject (String)
        returns: promise
    */
    return axios.get(KNOWLEDGE_API.concat(queryObject))
}

export function get_description_async(intent) {
    /*
        params: intent (String)
        returns: promise
    */
    return axios.get(DESCRIPTION_API.concat(intent))
}


