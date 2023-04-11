import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';


const SingleJob = () => {
    const [job, setJob] = React.useState(undefined)
    const { id, is_applied } = useParams();

    const getJob = async () => {
        const response = await axios.get(`/api/job/get/${id}`);
        console.log(response.data);
        if (response.data.success) {
            setJob(response.data.job);
        } else {
            console.log(response.data.error);
            alert(response.data.error);
        }
    }
    useEffect(() => {
        getJob();
    }, [])

    const handleApply = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        // data.append('user_id', localStorage.getItem('id'));
        // data.append('job_id', id);
        const res = await axios.post('/api/application/apply', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            alert('Applied successfully');
            // window.location.href = '/allJobs';
        } else {
            alert(res.data.err);
        }
        console.log(res.data);
    }

    return (
        <><section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-20">
                    <h2 class="text-md text-indigo-500 tracking-widest font-medium title-font mb-1">{job ? job.companyName : ""}</h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{job ? job.jobTitle : ""}</h1>
                    <h2 class="text-md text-indigo-500 tracking-widest font-medium title-font mb-1">{job ? "Job Location : " + job.jobLocation : ""}</h2>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-justify">{job ? job.jobDescription : ""}</p>
                </div>
                <div class="flex flex-wrap -m-4">
                </div>
                <div ><section class="max-w-4xl p-6 mx-auto bg-gray-200 rounded-md shadow-md dark:bg-gray-800">
                    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">{is_applied === 'true' ? "You have already applied for this post!!" : "Apply for this role"}</h2>

                    <form style={{
                        display: is_applied === 'true' ? 'none' : 'block'
                    }} onSubmit={handleApply} method='post'>
                        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Full Name</label>
                                <input name='name' type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Email Addess</label>
                                <input name='email' type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Contact</label>
                                <input name='contact' type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="username">Github Username</label>
                                <input name="gh" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="emailAddress">LeetCode Username</label>
                                <input name="lc" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="password">Codeforces Username</label>
                                <input name="cf" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                        </div>
                        <input type="hidden" name="user_id" value={
                            localStorage.getItem('id')
                        } />
                        <input type="hidden" name="job_id" value={id} />
                        <div>
                            <label for="file" class="block text-sm text-gray-500 dark:text-gray-300 mt-3">Resume Upload</label>

                            <label for="dropzone-file" class="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500 dark:text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>

                                <h2 id="file" class="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Resume</h2>

                                <p class="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">Upload your resume in pdf fromat. </p>

                                <input id="dropzone-file" name="resume" type="file" class="hidden" onChange={(e) => {
                                    console.log(e.target.files[0])
                                    document.getElementById("file").innerHTML = e.target.files[0].name
                                }} />
                            </label>
                        </div>
                        <div class="flex justify-end mt-6">
                            <button type='submit' class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Apply</button>
                        </div>
                    </form>
                </section></div>
            </div>
        </section></>
    )
}

export default SingleJob