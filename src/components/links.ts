
const API_URL = 'http://mfoijwtgcugfpx87.myfritz.net:5000/api/links';

const API2_URL = 'http://mfoijwtgcugfpx87.myfritz.net:5010/weblinks/list';

const DEBUG_API_URL = 'http://localhost:5235/weblinks/list';

export function getUrl() : string {
    return API_URL;
}

export function GetAspUrl() : string {

if(false) {
    return DEBUG_API_URL;
}

    return API2_URL;
}

