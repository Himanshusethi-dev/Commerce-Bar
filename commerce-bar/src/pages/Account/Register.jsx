import React, { useState, useEffect, useRef } from 'react'
import { FaEye } from "react-icons/fa";
import { createCustomer } from '../../Services/api'
import { useSelector,useDispatch } from 'react-redux';

import "./account.css"

const regexMail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const Register = () => {

    const emailRef = useRef(null)
    const {authToken} = useSelector((state)=>state.authProvider)

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [success, setSuccess] = useState(false)

    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState("");
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const createCustomerTrigger = async (evt) => {
        evt.preventDefault();
        let registerData = {
            email,
            password
        }
        try {
            const resp = await createCustomer(registerData);
            // const { customerCreate: { customer } } = resp.data.data
            // const { customerCreate: [customerUserErrors] } = resp.data.data
            // console.log(resp, registerData, customer)
            // console.log("customerUserErrors", customerUserErrors)
            setEmail("")
            setPassword("")
            setSuccess(true)
        } catch (error) {
        }

    }

    useEffect(() => {
        const result = regexMail.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = regexPassword.test(password);
        setValidPassword(result);
    }, [password])

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }




    return (

        success ? (

            <div>  Hurray,Your account is created </div>)

            : (

                <div className='register'>
                    <div className='headingText'>Create Account</div>
                    <form onSubmit={createCustomerTrigger} className='authForm'>
                        <div className="userField emailField">
                            <div className={`fieldContainer ${email ? "labelShare" : ""}`}>
                                <label htmlFor="userEmail" className={`${email ? "labelShare" : ""}`}>
                                    Email :
                                </label>
                                <input
                                    type="email"
                                    name='userEmail'
                                    id='userEmail'
                                    autoComplete='off'
                                    required
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    onFocus={() => { setEmailFocus(true) }}
                                    onBlur={() => { setEmailFocus(false) }}
                                    ref={emailRef}
                                />
                            </div>
                            <div className="errorMessage emailErrorMessage">

                                {

                                    !validEmail && emailFocus && email ? ("Please enter a valid email address.") : validEmail && emailFocus && email ? " " : emailFocus ? ("Required") : ""
                                }

                            </div>
                        </div>

                        <div className="userField pwdField">

                            <div className={`fieldContainer ${password ? "labelShare" : ""}`}>
                                <label htmlFor="userPassword" className={`${password ? "labelShare" : ""}`}>
                                    Password :
                                </label>
                                <input
                                    type={`${passwordVisibility ? "text" : "password"}`}
                                    name='userPassword'
                                    id='userPassword'
                                    autoComplete='off'
                                    required
                                    value={password}
                                    onFocus={() => { setPasswordFocus(true) }}
                                    onBlur={() => { setPasswordFocus(false) }}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />

                                {password && (
                                    <span className="togglePasswordVisibility">
                                        <FaEye onClick={togglePasswordVisibility} />
                                    </span>
                                )}

                            </div>

                            <div className='errorMessage passwordErrorMessage'>
                                {

                                    !validPassword && passwordFocus && password ?
                                        ("Please enter a valid password")
                                        : passwordFocus && validPassword && password ? " "
                                            : passwordFocus ? ("Required")
                                                : ""
                                }
                            </div>


                        </div>

                        <button className='formButton'>
                            Sign up
                        </button>

                    </form>

                    <div>
                        { authToken }
                    </div>
                </div>
            )



    )
}

export default Register