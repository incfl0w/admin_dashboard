class DefaultService {
    constructor(){
        this._apiBase = "http://127.0.0.1:8000/"
    }

    async getResource(url){
        const res = await fetch (`${this._apiBase}${url}`);
        if (!res.ok){
            throw new Error(`Could't fetch ${url}\nReceived:${res.status}`)
        }
        return await res.json();
    }
    
}

export default DefaultService