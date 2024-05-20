import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { logInCustomer } from '../../Services/api';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../store/slices/authSlice';
import "./account.css"
const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [success, setSuccess] = useState(false)

    // const [validPassword, setValidPassword] = useState("");
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const { authToken } = useSelector((state) => state.authProvider)

    const customerLoginTrigger = async (evt) => {
        evt.preventDefault();
        let creds = {
            email,
            password
        }


        try {
            // const resp = await logInCustomer(creds);

            const resp = dispatch(userLogin(creds))
            console.log(resp)
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

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }
    return (

        authToken ? (
            <div>
                <div>
                    {authToken}
                </div>
                <div>
                    Logged in

                </div>
            </div>
        ) : (

            <div className='login'>
                {/* <div className='headingText'></div> */}
                <form onSubmit={customerLoginTrigger} className='authForm'>
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

                            />
                        </div>
                        {/* <div className="errorMessage emailErrorMessage">

                        {

                            !validEmail && emailFocus && email ? ("Please enter a valid email address.") : validEmail && emailFocus && email ? " " : emailFocus ? ("Required") : ""
                        }

                    </div> */}
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

                        {/* <div className='errorMessage passwordErrorMessage'>
                        {

                            !validPassword && passwordFocus && password ?
                                ("Please enter a valid password")
                                : passwordFocus && validPassword && password ? " "
                                    : passwordFocus ? ("Required")
                                        : ""
                        }
                    </div> */}


                    </div>

                    <button className='formButton'>
                        Login
                    </button>

                    <div className="options">

                        or  <Link to="/account/signup"> Create an account</Link>
                    </div>

                </form>
            </div>
        )

    )
}

export default Login