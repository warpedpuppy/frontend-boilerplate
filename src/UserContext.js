import React from 'react';

const UserContext = React.createContext({
    username:'',
    token: '',
    id: '',
    subscriptions: []
})
export default UserContext;