import { authService } from '../services/auth.service'
import { User } from '../models/user.model'

class UserService {

    private readonly url = 'http://localhost:3030/users'

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
            throw new Error('User already exists', { cause: response.status })
        }
        
        throw new Error('Session expired')
    }

    public async getList() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: await this.getHeaders()
        })
        return await this.getData(response) as User[]
    }

    public async create(user: User) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(user)
        })
        return await this.getData(response) as User
    }

    public async update(user: User) {
        const response = await fetch(`${this.url}/${user.id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify(user)
        })
        return await this.getData(response) as User
    }

    public async delete(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: await this.getHeaders(),
        })
        return await this.getData(response) as boolean
    }

}

export const userService = new UserService()