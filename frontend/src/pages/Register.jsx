import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password1: '',
        password2: '',
    })

    const {name, email, password1, password2} = formData

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
        if(password1 !== password2) {
            toast.error('passwords do not match')
        } else {
            const userData = {
                name, 
                email, 
                password1,
            }
            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    return(
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register 
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="from">
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type="text" name="name" id="name" placeholder='Enter your name' value={name} onChange={onChange} className='form-control'
                        required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" id="email" placeholder='Enter your email' value={email} onChange={onChange} className='form-control'
                        required />
                    </div>
                    <div className='form-group'>
                        <input type="password" name="password1" id="password1" placeholder='Enter password' value={password1} onChange={onChange} className='form-control'
                        required />
                    </div>    
                    <div className='form-group'>
                        <input type="password" name="password2" id="password2" placeholder='Confirm password' value={password2} onChange={onChange} className='form-control'
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

export default Register