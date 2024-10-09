import AsyncStorage from '@react-native-async-storage/async-storage'

import { User } from '../models/user.model'

class AuthService {

    private readonly url = 'http://localhost:3030/auth/login'
    private readonly sessionKey = 'AUTH:SESSION_KEY'

    public async login(username: string, password: string) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        const data: User = await response.json()

        if (data && data.token) {
            this.setSessionUser(data)
            return true
        }

        return false
    }

    private async setSessionUser(user: User) {
        await AsyncStorage.setItem(this.sessionKey, JSON.stringify(user))
    }

    public async getSessionUser() {
        const json = await AsyncStorage.getItem(this.sessionKey)
        if (json) {
            return JSON.parse(json) as User
        } else {
            return null
        }
    }

    public async logOut() {
        await AsyncStorage.removeItem(this.sessionKey)
    }
}

export const authService = new AuthService()