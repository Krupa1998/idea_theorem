import { useState, memo } from "react";
import Alert from '@mui/material/Alert';
import React from 'react';
import axios from 'axios';
import './registration.css'

const Registration = () => {

    const [fullName, setFullName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alertSuccessFlag, setSuccessAlertFlag] = useState(false)
    const [alertFailFlag, setAlertFailFlag] = useState(false)

    const getDaysInMonth = () => {
        let arr = []
        for (let i = 0; i < 31; i++) {
            arr.push(i + 1)
        }
        return arr
    }

    const namesOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const yearPicker = () => {
        let arr = []
        for (let i = 1950; i < 2016; i++) {
            arr.push(i)
        }
        return arr
    }

    const checkValidation = () => {
        var fNameFlag = true
        var cNoFlag = true
        var emailFlag = true
        var pwdFlag = true
        var confPwdFlag = true

        const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/
        const cNoRegex = /^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

        if (fullName == null || fullName == "" || nameRegex.test(fullName) == false) {
            fNameFlag = false
        }
        if (contactNumber == null || contactNumber == "" || cNoRegex.test(contactNumber) == false) {
            cNoFlag = false
        }
        if (email == null || email == '' || emailRegex.test(email) == false) {
            emailFlag = false
        }
        if (password == null || password == '' || pwdRegex.test(password) == false) {
            pwdFlag = false
        }
        if (confirmPassword == null || confirmPassword == '' || password != confirmPassword) {
            confPwdFlag = false
        }
        if (fNameFlag === true && cNoFlag === true && emailFlag === true &&
            pwdFlag === true && confPwdFlag === true) { return true }
        else { return false }
    }

    const onSubmit = () => {
        var valFlag = checkValidation()
        if (valFlag === false) {

            //validation failed
            setAlertFailFlag(!alertFailFlag)
        }
        else {

            //validation success
            setSuccessAlertFlag(true)

            axios.post("https://fullstack-test-navy.vercel.app/api/users/create", {
                FullName: fullName,
                ContactNumber: contactNumber,
                Email: email,
                Password: password
            }).then((response) => console.log(response))
        }
    }

    return (
        <div className="main">
            <div style={{ margin: "10px", fontWeight: "600" }}>
                Create User Account
            </div>
            <form>
                <div className="card" >
                    <div style={{ padding: "3%" }} >
                        <label>Full Name</label><br />
                        <input
                            style={{ width: "90%" }}
                            placeholder="Full Name"
                            onChange={(e) => setFullName(e.target.value.trim())}
                        />
                    </div>
                    <div style={{ padding: "3%" }}>
                        <label>Contact Number</label><br />
                        <input
                            style={{ width: "90%" }}
                            placeholder="Contact Number"
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </div>
                    <div style={{ padding: "3%" }}>
                        <label>Email Address</label><br />
                        <input
                            style={{ width: "90%" }}
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div style={{ padding: "3%" }}>
                        <label>Birthdate</label><br />
                        <select name="Day" style={{ width: "75px", height: "30px" }} required>
                            <option value="Day">Day</option>
                            {
                                getDaysInMonth().map((day) => <option>{day}</option>)
                            }
                        </select>
                        <select name="Month" style={{ width: "75px", height: "30px" }} required>
                            <option value="Month">Month</option>
                            {
                                namesOfMonth.map((month) => <option>{month}</option>)
                            }
                        </select>
                        <select name="Year" style={{ width: "75px", height: "30px" }} required>
                            <option value="Year">Year</option>
                            {
                                yearPicker().map((year) => <option>{year}</option>)
                            }
                        </select>
                    </div>
                    <div style={{ padding: "3%" }}>
                        <label>Password</label><br />
                        <input
                            style={{ width: "90%" }}
                            type="password"
                            placeholder="Create Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{ padding: "3%" }}>
                        <label>Confirm Password</label><br />
                        <input
                            style={{ width: "90%" }}
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", padding: "5%" }}>
                    <button style={{ background: "white", color: "#127C95" }}>Cancel</button>
                    <button onClick={() => onSubmit()}>Submit</button>
                </div>
            </form >
            {alertSuccessFlag == true && (
                <Alert severity="success">
                    User account successfully created.
                </Alert>
            )}

            {alertFailFlag === true && (
                <Alert severity="error">
                    There was an error creating this account.
                </Alert>
            )}
        </div>
    )
}

export default memo(Registration);