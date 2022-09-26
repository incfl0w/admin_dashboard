import DefaultService from './defaultService';

class GroupService extends DefaultService {
    async getAllGroups(){
        const res = await this.getResource("api/v1/groups/?format=json")
        return res.map(this._transformGroup)
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
