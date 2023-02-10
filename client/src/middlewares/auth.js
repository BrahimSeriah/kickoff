import axios from "axios";

function isAuthentified() {
    return localStorage.getItem('jwt');
}

function logout() {
    localStorage.removeItem('jwt');
}

async function isUserAdmin() {
    await axios.post(
        '/api/auth/isUserAdmin',
        { jwt: localStorage.getItem('jwt') }
        )
        .then((response) => {
            var isAdmin = false
            if (response.data)
                isAdmin = true;
            return isAdmin;
        });
    
}

function verifyToken() {
    axios.post(
        '/api/auth/verifyToken',
        { jwt: localStorage.getItem('jwt') }
    )
        .then((response) => {
            return response.data
        });
}

export { isAuthentified, logout,  isUserAdmin, verifyToken }