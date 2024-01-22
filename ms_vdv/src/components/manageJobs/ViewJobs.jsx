import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import instance from '../../service/AxiosInstance';


function createData(job_no, critical, createAt, location, image) {
    return { job_no, critical, createAt, location, image };
  }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   ];

const ViewJobs = () => {
    const[rows, setRows] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await instance('/admin/jobs')
                console.log(res.data)
                // setRows(res.data)
                const row = res.data.map((item) => {
                    return createData(item.job_no, item.critical, item.createAt, item.location, item.image)
                }) 
                setRows(row)
            }
            catch(err){
                console.log(err)
            }
        }
        getData()
    },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Job No</TableCell>
            <TableCell align="right">Critical</TableCell>
            <TableCell align="right">CreateAt</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.job_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.job_no}
              </TableCell>
              <TableCell align="right">{row.critical}</TableCell>
              <TableCell align="right">{row.createAt.split("T")[0]}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">
                <img src={`http://localhost:8081/public/image/${row.image}`} alt="job_no" style={{width: 50}} />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ViewJobs