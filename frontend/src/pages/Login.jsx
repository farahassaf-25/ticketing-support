import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password: '',
    })

    const { email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((
        state) => state.auth
    )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        //redirect when logged in
        if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return(
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please log in to get support</p>
            </section>
            <section className="from">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" name="email" id="email" placeholder='Enter your email' value={email} onChange={onChange} className='form-control'
                        required />
                    </div>
                    <div className='form-group'>
                        <input type="password" name="password" id="password" placeholder='Enter password' value={password} onChange={onChange} className='form-control'
                        required />
                    </div>    
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login