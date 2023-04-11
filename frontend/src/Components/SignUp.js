import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            email,
            password
        }
        console.log(data)
        const response = await axios.post('/api/user/signup', data)
        console.log(response.data)
        if(response.data.success){
            localStorage.setItem('id', response.data.user._id)
            window.location.href = '/'
        }else{
            alert(response.data.err)
        }
    }
    return (
        <div className='h-[100vh] flex items-center bg-gray-200'><div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="px-6 py-4">
                <div class="flex justify-center mx-auto">
                    <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                </div>
    
                <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome</h3>

                <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Create account</p>

                <form onSubmit={handleSubmit} method='post'>
                    <div class="w-full mt-4">
                        <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Full Name" aria-label="Name" onChange={
                        (e) => {
                            setName(e.target.value)
                        }
                        } />
                    </div>
                    <div class="w-full mt-4">
                        <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" onChange={(e)=>{
                            setEmail(e.target.value)
                        }} />
                    </div>

                    <div class="w-full mt-4">
                        <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                    </div>

                    <div class="flex items-center justify-between mt-4">
                        <a href="#" class="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">By Clicking SignUp you accept T&C</a>

                        <button type='submit' class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <span class="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>

                <Link to='/login' class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Login</Link>
            </div>
        </div></div>
    )
}

export default SignUp