import React, { useEffect, useState } from 'react'
import './styles/add_job.scss'
import instance from '../../service/AxiosInstance';

const AddJob = () => {

    const [jobNo, setJobNo] = useState('');
    const [location, setLocation] = useState([]);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const getJobNo = async () => {
            try {
                const res = await instance.get('/admin/getJobNo');
                setJobNo(res.data.job_no);
            }
            catch (err) {
                console.log(err)
            }
        }
        getJobNo();

        const getLocation = async () => {
            try {
                const res = await instance.get('/admin/location');
                console.log(res.data);
                setLocation(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getLocation();
    }, [trigger])

    const performAddJob = (e) => {
        e.preventDefault()

        if (e.target['location'].value == "") {
            alert('Location is required')
            return
        }

        const formData = new FormData()

        formData.append('job_no', e.target['job_no'].value)
        formData.append('critical', e.target['critical'].value)
        formData.append('location', e.target['location'].value)
        formData.append('file', document.getElementById('add_image').files[0])

        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        const addJob = async () => {
            try {
                await instance.post('/admin/job', formData, headers);
                alert('Job added successfully');
                e.target.reset();
            }
            catch (err) {
                console.log(err)
            }
            setTrigger(!trigger)
        }
        addJob();
    }
    return (
        <div id='add_job'>
            <div className="container">
                <form onSubmit={performAddJob} id='job_add_form'>
                    <table>
                        <tbody>
                            <tr>
                                <td className='label'>Job No.</td>
                                <td><input type="text" name='job_no' value={jobNo} disabled /></td>
                            </tr>

                            <tr>
                                <td className='label'>Critical</td>
                                <td className='radio'>
                                    <input type="radio" name="critical" id="critical_yes" />
                                    <label htmlFor="critical_yes">Yes</label>
                                    <input type="radio" name="critical" id="critical_no" />
                                    <label htmlFor="critical_no">No</label>
                                </td>
                            </tr>

                            <tr>
                                <td className='label'>Location</td>
                                <td>
                                    <select name="location" id="location" defaultValue=''>
                                        <option value="" style={{ display: 'none' }}> - Select Location - </option>
                                        {
                                            location.map((loc, index) => {
                                                return <option key={index} value={loc.id}>{loc.name}</option>
                                            })
                                        }
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>Image</td>
                                <td className='image_upload'>
                                    <input type="file" name="add_image" id="add_image" />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="input">
                        <input type="submit" value="Add Job" />
                    </div>
                </form>
            </div>


        </div>
    )
}

export default AddJob