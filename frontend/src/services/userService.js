import DefaultService from "./defaultService"

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
            if (res.status === 201) {
                console.log("User created Successfully")
            }
            else {
                console.log("error")
                console.log(resJson)
            }
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