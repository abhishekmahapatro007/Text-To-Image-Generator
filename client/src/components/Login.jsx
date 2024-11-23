import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin,backendUrl,setToken,setUser } = useContext(AppContext)

  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setFullName] = useState('');

  const onSubmitHandler = async(e) => {
    e.preventDefault()

    try {
      if(state === 'Login'){
        const {data} = await axios.post(backendUrl + '/api/user/login' ,{email,password})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
          toast.success('Logged in successfully!');
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/register' ,{name,email,password})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
          toast.success('Account created successfully!')
        }else{
          toast.error(data.message)
        }      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Check for empty fields
    if (!email || !password || (state === 'Signup' && !fullName)) {
      toast.error('Please fill in all fields!');
      return;
    }

    // HANDLE ACCORDING TO DATABASE
    if (state === 'Login') {
      // Simulate a failed login attempt
      if (email !== 'test@example.com' || password !== 'password123') {
        toast.error('Invalid email or password!');
      } else {
        toast.success('Logged in successfully!');
      }
    } else if (state === 'Signup') {
      // Simulate account creation
      if (email === 'test@example.com') {
        toast.error('Email already in use!');
      } else {
        toast.success('Account created successfully!');
      }
    }
  };

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSubmitHandler}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm mt-2 ml-2'>
          {state === 'Login' ? 'Welcome back! Please sign in to continue' : 'New to Imagify? Create a new account'}
        </p>

        {state !== 'Login' &&
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.user_icon} alt="" />
            <input
              type="text"
              className='outline-none text-sm'
              placeholder='Full Name'
              value={name}
              onChange={(e) => setFullName(e.target.value)} />
          </div>
        }

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="" />
          <input
            type="email"
            className='outline-none text-sm'
            placeholder='Email id'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="" />
          <input
            type="password"
            className='outline-none text-sm'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

        <button type="submit" className='bg-blue-600 w-full text-white py-2 rounded-full'>
          {state === 'Login' ? 'Login' : 'Create account'}
        </button>

        {state === 'Login' ?
          <p className='mt-5 text-center'>
            Don't have an account?
            <span
              className='text-blue-600 cursor-pointer'
              onClick={() => {
                setState('Signup');
                toast.info('Switched to Signup!');
              }}>
              Sign up
            </span>
          </p>
          :
          <p className='mt-5 text-center'>
            Already have an account?
            <span
              className='text-blue-600 cursor-pointer'
              onClick={() => {
                setState('Login');
                toast.info('Switched to Login!');
              }}>
              Login
            </span>
          </p>
        }

        <img
          onClick={() => {
            setShowLogin(false);
            toast.info('Closed Login Modal');
          }}
          src={assets.cross_icon}
          alt=""
          className='absolute top-5 right-5 cursor-pointer' />
      </motion.form>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  )
}

export default Login;

// import React, { useContext, useEffect, useState } from 'react'
// import { assets } from '../assets/assets'
// import { AppContext } from '../context/AppContext'

// const Login = () => {
//   const [state,setState] = useState('Login')
//   const {setShowLogin} = useContext(AppContext)

//   useEffect(() => {
//     document.body.style.overflow = 'hidden'

//     return() => {
//       document.body.style.overflow = 'unset'
//     }
//   },[])

//   return (
//     <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center
//     items-center'>
//       <form className='relative bg-white p-10 rounded-xl text-slate-500'>
//         <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
//         <p className='text-sm mt-2 ml-2'>
//           {state === 'Login' ?' Welcome back! Please sign in to continue' : 'New to Imagify ? Create a new account'}
//         </p>

//         {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
//             <img src={assets.user_icon} alt="" />
//             <input type="text" className='outline-none text-sm' placeholder = 'Full Name' />
//         </div>
// }
//         <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//             <img src={assets.email_icon} alt="" />
//             <input type="email" className='outline-none text-sm' placeholder = 'Email id' />
//         </div>

//         <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//             <img src={assets.lock_icon} alt="" />
//             <input type="password" className='outline-none text-sm' placeholder = 'Password' />
//         </div>

//         <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

//         <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
//             {state === 'Login' ? 'Login' : 'create account'}
//         </button>

//         {state === 'Login' ?
//           <p className='mt-5 text-center'>
//             Don't have an account?
//             <span className='text-blue-600 cursor-pointer' onClick={() => setState('Signup')}>
//               Sign up
//             </span>
//          </p>
//         :
//          <p className='mt-5 text-center'>
//             Already have an account?
//             <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>
//               Login
//             </span>
//          </p>}

//          <img onClick={() => setShowLogin(false)}
//           src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
//       </form>
//     </div>
//   )
// }

// export default Login
