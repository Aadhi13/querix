import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "../../../api/axios";

function OtpVerify() {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const expiresAtState = location.state.data.expiresAt;
    const {email, name} = location.state.data;
    const [expiresAt, setExpiresAt] = useState(expiresAtState);
    const [loader, setLoader] = useState(false);
    const errRef = useRef();
    const succRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [succMsg, setSuccMsg] = useState("");
    const navigate = useNavigate();

    const resendOtp = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            setOtp('');
            const response = await axios.post('/otp-resend', { email });
            setExpiresAt(response.data.expiresAt);
            setLoader(false);
            if (response.data.message === 'Request is received') {
                setErrMsg('')
                setSuccMsg('Successfully resented OTP; check your mail.')
            }
        } catch (err) {
            if (!err?.response) {
                setSuccMsg('');
                setErrMsg('No server response.');
            } else if (err.code === "ERR_NETWORK") {
                setSuccMsg('');
                setErrMsg(err.message);
            } else if (err.response.data.message === 'Something went wrong.') {
                setSuccMsg('');
                setErrMsg('Something went wrong.');
            } else if (err.response.data.message === 'Email is missing. Try signing in.') {
                setSuccMsg('');
                setErrMsg('An unexpected error occurred. Try signing in.');
            } else {
                setSuccMsg('');
                setErrMsg('Something went wrong.');
            }
            errRef.current.focus();
            setLoader(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/otp-verify', { otp, email });
            if (response.data.message === 'Email is already verified.') {
                setSuccMsg('')
                setErrMsg('Email is already verified.');
                navigate('/signin');
            } else if (response.data.message === 'OTP is correct, email verified.') {
                setErrMsg('OTP is correct, email verified.');
                navigate('/signin');
            }

        } catch (err) {
            if (!err?.response) {
                setSuccMsg('')
                setErrMsg('No server response.');
            } else if (err.code === "ERR_NETWORK") {
                setSuccMsg('')
                setErrMsg(err.message);
            } else if (err.response.data.message === 'OTP is expired.') {
                setSuccMsg('')
                setErrMsg('OTP is expired.');
            } else if (err.response.data.message === 'OTP is not valid.') {
                setSuccMsg('')
                setErrMsg('OTP is not valid.');
            } else if (err.response.data.message === 'Internal server error.') {
                setSuccMsg('')
                setErrMsg('Internal server error.');
            } else if (err.response.data.message === 'Something went wrong.') {
                setSuccMsg('')
                setErrMsg("Something went wrong.");
            } else {
                setSuccMsg('')
                setErrMsg('Registration Failed.');
            }
            errRef.current.focus();
        }
    }

    //Countdown componenet for displaying remaing time to otp to expire.
    function Countdown({ expireTime }) {
        const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
        useEffect(() => {
            let intervalId = null;
            if (remainingTime > 0) {
                intervalId = setInterval(() => {
                    setRemainingTime(calculateRemainingTime());
                }, 1000);
            }
            return () => clearInterval(intervalId);
        }, [remainingTime]);

        function calculateRemainingTime() {
            const now = new Date();
            const diff = new Date(expireTime) - now;
            return diff > 0 ? diff : 0;
        }

        function formatTime(time) {
            const seconds = Math.floor(time / 1000);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        return (
            <span>
                {remainingTime > 0 ? (
                    <>
                        <span><abbr title="One Time Password">OTP</abbr> expires in</span>
                        <span className='text-red-700 font-semibold'>&nbsp;{formatTime(remainingTime)}&nbsp;</span>
                        <span>minutes.</span>
                    </>
                ) : (
                    <span className='text-red-700'>OTP expired&nbsp;</span>
                )}
            </span>
        );
    }


    return (
        <>
            <div className='items-center justify-center flex max-w-2xl m-auto' style={{ height: '91vh' }}>
                <div className='rounded-lg shadow-lg shadow-gray-300 bg-gray-100 p-6'>
                    <h1 className='flex justify-center font-bold text-4xl mb-6 mt-2'>Email Verification </h1>
                    <p className='text-center'>Hi <span className='font-medium'>{name}</span>, we emailed you the six digit <abbr title="One Time Password">OTP</abbr> to <span className='font-medium'>{email}</span>. Enter the code below to confirm your email address.</p>
                    <form className='mb-5 mt-6 flex items-center  justify-center' onSubmit={handleSubmit}>
                        <input type="text"
                            required
                            className='border border-gray-500 text-gray-900 text-lg rounded-md py-1 w-20 text-center'
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button type="submit" className='bg-emerald-500 ml-4 font-medium border border-gray-500 text-gray-900 text-lg rounded-md py-1 w-20 text-center' >Verify</button>
                    </form>
                    <div className='flex justify-center items-center mb-2'>
                        <p ref={errRef} className={errMsg ? "errmsg text-red-700" : "offscreen"} >
                            {errMsg}
                        </p>
                        <p ref={succRef} className={succMsg ? "errmsg text-green-700" : "offscreen"} >
                            {succMsg}
                        </p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='mr-1 flex items-center justify-center'><Countdown expireTime={expiresAt} /></p>
                        <button
                            onClick={resendOtp}
                            className="text-red-600 font-semibold hover:bg-red-900 hover:bg-opacity-20 hover:rounded-full hover:underline px-2 py-1 cursor-pointer disabled:opacity-60"
                            disabled={
                                loader ? true : false
                            }
                        >
                            {loader ? 'Resending...' : 'Resend OTP'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtpVerify