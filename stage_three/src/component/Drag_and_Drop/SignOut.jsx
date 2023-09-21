import { useNavigate } from "react-router-dom"

const SignOut = () => {
    const history = useNavigate()

    const signOut = (e) =>{
        e.preventDefault()
        history('/')
    }
  return (
    <div>
        <button onClick={signOut} type='button' className="cursor-pointer mt-9 py-4 px-9 bg-violet-500 rounded-2xl border-none">Signout</button>
    </div>
  )
}

export default SignOut