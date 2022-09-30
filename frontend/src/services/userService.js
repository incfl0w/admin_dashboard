import DefaultService from "./defaultService"
import statusProcessor from "../custom_functions/statusProcessor"

class UserService extends DefaultService {
    async getAllUsers() {
        const res = await this.getResource("api/v1/users/?format=json")
        return res.map(this._transformUser)
    }

    async createUser({ username, password, groups }) {

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                groups: groups
            }),
        }
        try {
            const res = await fetch(`${this._apiBase}api/v1/users/`, requestOptions);
            await res.json();
            return (statusProcessor(res))

        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteUser(id) {
        const requestOptions = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            const res = await fetch(`${this._apiBase}api/v1/users/${id}/`, requestOptions);
            await res.json();
            return (statusProcessor(res))
        }
        catch (err) {
            console.log(err)
        }
    }

    async updateUser({ id, username, groups }) {
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                username: username,
                groups: groups
            })
        }
        try {
            const res = await fetch(`${this._apiBase}api/v1/users/${id}/`, requestOptions);
            await res.json();
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