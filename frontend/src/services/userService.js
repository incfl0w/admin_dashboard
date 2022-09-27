import DefaultService from "./defaultService"
import statusProcessor from "../custom_functions/statusProcessor"

class UserService extends DefaultService {
    async getAllUsers() {
        const res = await this.getResource("api/v1/users/?format=json")
        return res.map(this._transformUser)
    }

    async createUser({ username, password }) {
        console.log(`Create user with params ${username}, ${password}`)
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        }
        try {
            const res = await fetch(`${this._apiBase}api/v1/users/`, requestOptions);
            let resJson = await res.json();
            console.log("statusP", res.status)
            console.log("statusP", res)
            return (statusProcessor(res))
            
        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteUser(id){
        console.log(`Delete User ${id}`)
        const requestOptions = {method: "DELETE",
        headers: { 'Content-Type': 'application/json' }, 
    }
    try {
        const res = await fetch(`${this._apiBase}api/v1/users/${id}/`, requestOptions);
        let resJson = await res.json();
        console.log("statusP", res.status)
        console.log("statusP", res)
        return (statusProcessor(res))
    }
    catch (err) {
        console.log(err)
    }
        
    }


    _transformUser(user) {
        return {
            id: user.id,
            username: user.username,
            created: user.date_joined,
            groups: user.groups
        }
    }
}

export default UserService