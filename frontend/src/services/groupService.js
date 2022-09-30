import statusProcessor from '../custom_functions/statusProcessor';
import DefaultService from './defaultService';

class GroupService extends DefaultService {
    async getAllGroups() {
        const res = await this.getResource("api/v1/groups/?format=json")
        return res.map(this._transformGroup)
    }

    async createGroup({ name, description }) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                description: description
            })
        }
        try {
            const res = await fetch(`${this._apiBase}api/v1/groups/`, requestOptions)
            await res.json()
            return statusProcessor(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteGroup(id) {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }
        try {
            const res = await fetch(`${this._apiBase}api/v1/groups/${id}/`, requestOptions);
            await res.json
            return (statusProcessor(res))
        }
        catch (err) {
            console.log(err)
        }
    }
    async updateGroup({ id, name, description }) {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                name: name,
                description: description
            })
        }
        try {
            const res = await fetch(`${this._apiBase}api/v1/groups/${id}/`, requestOptions)
            await res.json();
            return (statusProcessor(res))
        }
        catch (err) {
            console.log(err)
        }
    }


    _transformGroup(group) {
        return {
            id: group.id,
            name: group.name,
            description: group.description
        }
    }


}

export default GroupService;
