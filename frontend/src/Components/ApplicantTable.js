import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ApplicantTable = () => {
    const [applicants, setApplicants] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const getApplicants = async () => {
            const response = await axios.post(`http://localhost:3001/api/job/getApplied`, {
                userId: localStorage.getItem('id'),
                jobId: id
            });
            console.log(response.data);
            if (response.data.success) {
                setApplicants(response.data.applicants);
            } else {
                console.log(response.data.error);
                alert(response.data.error);
            }
        }
        getApplicants();
    }, [])
    return (
        <div class='bg-white'>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="bg-gray-200 border-b">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Resume
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Codeforces Handle
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            LeetCode Handle
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Github Handle
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Score
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        applicants.map((applicant, index) => {
                                            let link = applicant.resume.replace('output/','http://localhost:3001/');
                                            
                                            return (
                                                <tr class="bg-white border-b">
                                                    <td class="text-sm text-gray-900 px-6 py-4 text-left">
                                                        {index + 1}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 text-left">
                                                        <a href={link} target='_blank'>Click to view</a>
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 text-left">
                                                        {applicant.cf}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 text-left">
                                                        {applicant.lc}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 text-left">
                                                        {applicant.gh}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 text-left">
                                                        {applicant.score}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default ApplicantTable