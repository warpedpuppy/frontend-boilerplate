import React from 'react';

const UserContext = React.createContext({
    username:'',
    token: ''
})
export default UserContext;