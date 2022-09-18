import React, {useEffect} from 'react'
import Auth from '../Auth/Auth.jsx'
import {useDispatch, useSelector, useStore} from "react-redux";


const Sidebar = () => {

    const store = useStore();
    const {userSignedIn} = store.getState();

    useEffect(() => {
        console.log(store.getState());
    }, [])
    

    return (
        <div>
            <div>
                {userSignedIn ? "CHATS" : <Auth></Auth>}
            </div>
        </div>
    )
}

export default Sidebar