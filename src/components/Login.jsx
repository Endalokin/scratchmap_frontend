import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import fetchData from '../utils/fetchAPI';

export default function LoginModal({ setIsOpen }) {

    const navigate = useNavigate()
    const [, , , , userName, setUserName] = useOutletContext();
    const { VITE_SERVER_URL } = import.meta.env;

    const [pwd, setPwd] = useState()
    const [inputUser, setInputUser] = useState()

    function handleChange(e) {
        if (e.target.id == "userName") {
            setInputUser(e.target.value)
        } else if (e.target.id == "pwd") {
            setPwd(e.target.value)
        }
    }

    function login(e) {
        e.preventDefault()
        console.log(userName)
        console.log(pwd)
        const CHECK_URL = `${VITE_SERVER_URL}/test`
        fetchData(CHECK_URL, (data) => {
            console.log(data)
            if (data.msg) {
                setUserName(inputUser)
                navigate(-1)
            }
        })

    }

    function cancleLogin(e) {
        e.preventDefault();
        setInputUser()
        setPwd()
        navigate(-1)
    }

    return (
        <>
            <div className='modal' id="loginModal" >
                <form action="" onSubmit={login}>
                    <div className='input-fields'>
                        <div>
                            <label htmlFor="userName">User</label>
                            <input type="text" value={inputUser} onChange={handleChange} id="userName" />
                        </div>
                        <div>
                            <label htmlFor="pwd">Password</label>
                            <input type="text" value={pwd} onChange={handleChange} id="pwd" />
                        </div>
                    </div>
                    <div>
                        <button className="ribbon2" onClick={cancleLogin}>Cancel</button>
                        <button className="notching" onClick={login}>Login</button>
                    </div>
                </form>

            </div>
            <div className="modal-back"></div>
        </>
    )
}
