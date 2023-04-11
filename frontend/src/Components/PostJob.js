import React from 'react'
import axios from 'axios'

const PostJob = () => {
    const handlePostJob = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        data.append('userId', localStorage.getItem('id'));
        var object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        console.log(object);
        const res = await axios.post('/api/job/create', object);
        console.log(res.data);
        if (res.data.success) {
            alert('Job posted successfully');
            window.location.href = '/allJobs';
        } else {
            alert(res.data.err);
        }
    }
    return (
        <div className='bg-gray-200 h-[100vh] flex justify-center items-center'><section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Post Job</h2>

            <form method='post' onSubmit={handlePostJob}>
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="username">Job Title</label>
                        <input id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name='jobTitle' />
                    </div>

                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Company Name</label>
                        <input id="emailAddress" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name='companyName' />
                    </div>

                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="password">Job Description</label>
                        <input id="password" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name='jobDescription' />
                    </div>

                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Job Location</label>
                        <input id="passwordConfirmation" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name='jobLocation' />
                    </div>
                </div>

                <div class="flex justify-end mt-6">
                    <button type='submit' class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                </div>
            </form>
        </section></div>
    )
}

export default PostJob