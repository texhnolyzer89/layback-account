import axios from 'axios'

////////////////////////////////////////
// USER SERVICE
////////////////////////////////////////
class User {
    // get logged in user -> check if ADMIN and restrict certain routes
    
    // Create one user
    create = async (email: string, password: string, telephone_number: string) => {
        return axios.post('/api/users', {
            email: email,
            password: password,
            telephone_number: telephone_number,
        })
    }

    // Find all users
    findAll = async () => {
        return axios.get('/api/users')
    }

    // Find a user by userId
    findOne = async (userId: string) => {
        return axios.get(`/api/users?userId=${userId}`)
    }

    // Confirm the account
    confirmAccount = async (jwt: string) => {
        return axios.put('/api/users', {
            jwt: jwt,
        })
    }

    // Reset user password
    resetPassword = async (jwt: string, password: string) => {
        return axios.put('/api/users', {
            jwt: jwt,
            password: password,
        })
    }

    // Update user password
    updatePassword = async (email: string | undefined, newPassword: string | undefined) => {
        return axios.put('/api/users', {
            email: email,
            password: newPassword,
        })
    }

    // Update user email
    updateEmail = async (email: string | undefined, newEmail: string | undefined) => {
        return axios.put('/api/users', {
            email: email,
            newEmail: newEmail,
        })
    }

    // Update user role
    updateRole = async (email: string | undefined, newRole: string | undefined) => {
        return axios.put('/api/users', {
            email: email,
            newRole: newRole,
        })
    }

    // Delete user by id
    deleteById = async (userId: string) => {
        return axios.delete(`/api/users?userEmail=${userId}`)
    }

    // Delete user by email
    deleteByEmail = async (userEmail: string) => {
        return axios.delete(`/api/users?userEmail=${userEmail}`)
    }
}

const UserService = new User()

export default UserService
