import React, { useState } from 'react'

import signinImage from '../assets/signup.jpg'

const initialState = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    avatarURL: ""
}

export default function Auth() {
    const [isSignup, setIsSignup] = useState(true)
    const [form, setForm] = useState(initialState)

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(form)

    }
  return (
    <div className="auth__form-container">
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p>{isSignup? 'Sign Up': 'Sign In'}</p>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullName"> Full Name</label>
                            <input
                                name="fullName"
                                type="text"
                                placeholder="Full Name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {/* Username is needed both at registration and sign in */}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username"> Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                    </div>

                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="avatarURL">Profile picture URL</label>
                            <input
                                name="avatarURL"
                                type="text"
                                placeholder="Profile picture URL"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_button">
                        <button type="submit">{ isSignup? "Sign Up" : "Sign In" }</button>
                    </div>
                </form>

                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignup
                            ? "Already have an account?"
                            : "Don't have an account?"
                        }
                    </p>
                    <span onClick={switchMode}>
                        {isSignup ? 'Sign In' :'Sign Up'}
                    </span>
                </div>
            </div>
        </div>

        <div className="auth__form-container_image">
            <img src={signinImage} alt="sign in" />
        </div>
      
    </div>
  )
}
