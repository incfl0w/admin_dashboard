import DefaultService from "./defaultService"

class UserService extends DefaultService {
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