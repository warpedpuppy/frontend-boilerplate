const TokenService = {
    setToken (token) {
        localStorage.setItem('token',token);
    }


}

export default TokenService;