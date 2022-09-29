import statusProcessor from '../custom_functions/statusProcessor';
import DefaultService from './defaultService';

class GroupService extends DefaultService {
    async getAllGroups(){
        const res = await this.getResource("api/v1/groups/?format=json")
        return res.map(this._transformGroup)
    }


    async deleteGroup(id){
       console.log(`Delete Group ${id}`) 
       const requestOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
       }
       try{
        const res = await fetch(`${this._apiBase}api/v1/users/${id}/`, requestOptions);
        let resJson = await res.json
        return (statusProcessor(res))
       }
       catch (err) {
        console.log(err)
       }
    }


    _transformGroup(group){
        return{
            id: group.id, 
            name: group.name,
            permissions: group.permissions
        }
    }

    
}

export default GroupService;
