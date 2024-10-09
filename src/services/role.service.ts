import { authService } from '../services/auth.service'
import { Role } from '../models/role.model'

class RoleService {

    private readonly url = 'http://localhost:3030/roles'

    private async getHeaders() {
        const sessionUser = await authService.getSessionUser()
        if (!sessionUser) throw new Error('User need to sign in')

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionUser.token}`,
        }
    }

    private async getData(response: Response) {
        if (response.status >= 200 && response.status < 300) {
            return await response.json()
        
        } else if (response.status === 400) {
            throw new Error('Role already exists', { cause: response.status })
        }
        
        throw new Error('Session expired')
    }

    public async getList() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: await this.getHeaders()
        })
        return await this.getData(response) as Role[]
    }

    public async create(role: Role) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(role)
        })
        return await this.getData(response) as Role
    }

    public async update(role: Role) {
        const response = await fetch(`${this.url}/${role.id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify(role)
        })
        return await this.getData(response) as Role
    }

    public async delete(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: await this.getHeaders(),
        })
        return await this.getData(response) as boolean
    }

}

export const roleService = new RoleService()