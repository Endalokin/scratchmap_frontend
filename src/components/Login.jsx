import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import fetchData from '../utils/fetchAPI';

export default function LoginModal() {

    const navigate = useNavigate()
    const [, , , , , setUser] = useOutletContext();
    const { VITE_SERVER_URL } = import.meta.env;

    const [pwd, setPwd] = useState()
    const [inputUser, setInputUser] = useState()

    function handleChange(e) {
        setWarning()
        if (e.target.id == "userName") {
            setInputUser(e.target.value)
        } else if (e.target.id == "pwd") {
            setPwd(e.target.value)
        }
    }

    function login(e) {
        e.preventDefault()
        let body = { username: inputUser, password: pwd }
        const CHECK_URL = `${VITE_SERVER_URL}/login`
        fetchData(CHECK_URL, (data) => {
            if (data.userid) {
                setUser({ username: inputUser, userid: data.userid })
                setWarning()
                navigate(-1)
            } else {
                setWarning("Invalid user or password")
            }
        }, "POST", body)
    }

    function cancleLogin(e) {
        e.preventDefault();
        setInputUser()
        setPwd()
        setWarning()
        navigate(-1)
    }

    const [warning, setWarning] = useState()

    return (
        <>
            <div className='modal' id="loginModal" >
                <form action="" onSubmit={login}>
                    <p style={{ color: "red" }}>{warning}</p>
                    <div className='input-fields'>
                        <div>
                            <label htmlFor="userName">User</label>
                            <input type="text" value={inputUser} onChange={handleChange} id="userName" />
                        </div>
                        <div>
                            <label htmlFor="pwd">Password</label>
                            <input type="password" value={pwd} onChange={handleChange} id="pwd" />
                        </div>
                    </div>
                    <div>
                        <button className="ribbon ribbon-secondary" onClick={cancleLogin}>Cancel</button>
                        <button className="notching" onClick={login}>Login</button>
                    </div>
                </form>
            </div>
            <div className="modal-back"></div>
        </>
    )
}
