class UserService {
    constructor(){
        this._apiBase = "http://127.0.0.1:8000/"
    }

    async getResource(url){
        const res = await fetch (`${this._apiBase}${url}`);
        if (!res.ok){
            throw new Error(`Could't fetch ${url}\Received:${res.status}`)
        }
        return await res.json();
    }
    
    async getAllUsers(){
        const res = await this.getResource("api/v1/users/?format=json")
        return res.map(this._transformUser)
    }

    _transformUser(user){
        return{
            id: user.id,
            username: user.username,
            created: user.date_joined,
            groups: user.groups
        }
    }
}

export default UserService