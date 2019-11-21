var SOCCER_API_HEADERS = {
    "x-rapidapi-host": "sportsop-soccer-sports-open-data-v1.p.rapidapi.com",
    "x-rapidapi-key": "d2168f57demsh4d3f52850dfb60cp1738acjsn95632be9e357"
};


function getJSON(url, requestHeaders = {}) {
    // create and return a new promise
    return new Promise((resolve, reject) => {
        // create the required XMLHttpRequest object
        const request = new XMLHttpRequest();
        // initialise this new request - open 
        request.open("GET", url);
        // register onload handler - called if server responds 

        if (Object.keys(requestHeaders).length  > 0) {
            for (const [ key, value ] of Object.entries(requestHeaders)) {
                request.setRequestHeader(key, value);
            }
        }
        request.onload = function () {
            try {
                // make sure response is OK - server needs to return status 200 code... 
                if (this.status === 200) {
                    resolve(JSON.parse(this.response))
                } else {
                    reject(this.status + " " + this.statusText);
                }
                // try to parse json string - if success, resolve promise successfully with value
                // different status code, exception parsing JSON &c. - reject the promise...
            } catch (e) {
                reject(e.message);
            }
        };
        // if error with server communication - reject the promise...
        request.onerror = function () {
            reject(this.status + " " + this.statusText);
        };
        // send the constructed request to get the JSON
        request.send();
    });
}

function getJSONFromFile(fileName) {
    return new Promise((resolve, reject) => {
        var mydata = JSON.parse(fileName);

        if (mydata === null) {
            reject("file does not exist");
        }

        resolve(mydata);
    });
}