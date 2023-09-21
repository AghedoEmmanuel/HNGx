import { useState } from "react"
import {BrowserRouter as Router,Routes,Route,Link, useNavigate} from 'react-router-dom'
import {auth} from '../Firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault() 
        
        signInWithEmailAndPassword(auth, email, password).then(data =>{
            console.log(data,'authData')
            history('./draganddrop')
        }).catch((error) => {
             alert(`Stop playing ${error.code}`)
            })
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="bg-sky-800 h-screen flex flex-col md:justify-center items-center py-52">
            <form onSubmit={handleSubmit} className="border-4 border-black rounded-xl text-center w-[20rem] h-[23rem] flex flex-col justify-center items-center shadow-2xl hover:shadow-violet-950">
                <div className="mb-6 flex flex-col justify-center items-center space-y-2">
                    <label>UserName</label>
                    <input value={email} placeholder="youremail@example.com" type="email" onChange={updateEmail} className="border-4 p-4 border-violet-500 rounded-xl"/>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <label>Password</label>
                    <input value={password} placeholder="******" type="password" onChange={updatePassword} className="border-4 p-4 border-violet-500 rounded-xl"/>
                </div>
                <button type="submit" className="mt-9 py-4 px-9 bg-violet-500 rounded-2xl border-none cursor-pointer">Login</button>
            </form>
        </div>
    )
}

export default Login