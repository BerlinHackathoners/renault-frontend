import axios from 'axios';

//const BASE_URL = 'http://10.125.1.12:8080'
const BASE_URL = 'http://localhost:8080'

const KNOWLEDGE_API = BASE_URL.concat('/knowledge?query=')
const RESPONSE_API = BASE_URL.concat('/get_response?q=')
const GET_ROUTES_API = BASE_URL.concat('/get_routes?q=')
const DESCRIPTION_API = BASE_URL.concat('/intent?query=')
const TEST_API = 'http://10.125.1.12:8080/'
const LANDMARKS_API = BASE_URL.concat('/landmarks?gps=')

export function get_api_call_test() {
    return axios.get(TEST_API)

}

export function get_landmarks_async(lat,lon) {
    return axios.get(LANDMARKS_API.concat(lat).concat(',').concat(lon))
}

export function get_response_async(query) {
    return axios.get(RESPONSE_API.concat(query))
}

export function get_routes_async(start_lat,start_lon,end_lat,end_lon) {
    return axios.get(RESPONSE_API.concat(start_lat).concat(',').concat(start_lon).concat(end_lat).concat(',').concat(end_lon))
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


