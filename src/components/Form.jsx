import React, { useEffect, useState } from 'react'

const Form = () => {

  const [formData, SetFormData] = useState({
    name: '',
    dob: '',
    email: '',
    address1: '',
    address2: '',
    state: '',
    id: '',
    dept: '',
    designation: '',
    joinDate: '',
    salary: '',
    phno: ''
  });

  const [employees, SetEmployees] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3001/employees')
        .then(response => {
            if (!response.ok)
                throw new Error(`Http Error! Status ${response.status}`);
            return response.json();
        })
        .then(data => SetEmployees(data))
        .catch(error => console.error("Error Fetching Employee : ", error))
  }

  const handleDate = (dob) => {
    const formattedDate = new Date(dob);
    return formattedDate.toLocaleDateString();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3001/',{
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData)
      })
      if(response.ok){
        console.log("Data Submitted Successfully");
        alert('Data Submitted Successfully');
        fetchData();
      }
      else{
        console.error("Error in Submitting Data");
      }
    }catch(error){
      console.log("Error in fetching API" , error);
    }
  }

  useEffect(() => {
    fetchData();
  })

  return (
    <div className='form'>
      <div className="flex">
        <h1>Employee Registration</h1>
      </div>
      <div className="formBody">
        <div className="left">
          <div className="parent">
            <label htmlFor="name" className='txt required'>Name</label>
            <input type='text' name='name' id='name' value={formData.name} onChange={handleInputChange} className='ip' />
          </div>
          <div className="parent">
            <label htmlFor='dob' className='txt required'>DOB</label>
            <input type='date' name='dob' id='dob' value={formData.dob} onChange={handleInputChange} className='ip' />
          </div>
          <div className="parent">
            <label htmlFor='email' className='txt required'>Email</label>
            <input type='text' name='email' id='email' value={formData.email} onChange={handleInputChange} className='ip' />
          </div>

          <div className="parent">
            <label htmlFor='address1' className='txt required'>Address Line 1</label>
            <input type='text' name='address1' id='address1' value={formData.address1} onChange={handleInputChange} className='ip' />
          </div>

          <div className="parent">
            <label htmlFor='address2' className='txt required'>Address Line 2</label>
            <input type='text' name='address2' id='address2' value={formData.address2} onChange={handleInputChange} className='ip' />
          </div>

          <div className="parent">
            <label htmlFor='state' className='txt required'>State</label>
            <input type='text' name='state' id='state' value={formData.state} onChange={handleInputChange} className='ip' />
          </div>
        </div>
        <div className="right">
          <div className="parent">
            <label htmlFor='id' className='txt required'>Employee ID</label>
            <input type='number' name='id' id='id' value={formData.id} onChange={handleInputChange} className='ip' />
          </div>
          <div className="parent">
            <label htmlFor='dept' className='txt required'>Department</label>
            <select name="dept" id="dept" className='ip' value={formData.dept} onChange={handleInputChange}>
              <option value="none">Select a Department</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className="parent">
            <label htmlFor='designation' className='txt required'>Designation</label>
            <select name="designation" id="designation" className='ip' value={formData.designation} onChange={handleInputChange}>
              <option value="none">Select a Designation</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Finance Analyst">Finance Analyst</option>
              <option value="Digital Marketer">Digital Marketer</option>
            </select>
          </div>
          <div className="parent">
            <label htmlFor='joinDate' className='txt required'>Joining Date</label>
            <input type='date' name='joinDate' id='joinDate' value={formData.joinDate} onChange={handleInputChange} className='ip' />
          </div>
          <div className="parent">
            <label htmlFor='salary' className='txt required'>Salary</label>
            <input type="number" name="salary" id="salary" value={formData.salary} onChange={handleInputChange} className='ip' />
          </div>
          <div className="parent">
            <label htmlFor='phno' className='txt required'>Phone No</label>
            <input type='number' name='phno' id='phno' value={formData.phno} onChange={handleInputChange} className='ip' />
          </div>
        </div>
      </div>
      <div className="btnDiv">
        <button className='btn' onClick={handleSubmit}>Submit</button>
      </div>
      <hr />
      <div className="tableDiv">
        <table border={2}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Address</th>
              <th>State</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Joining Date</th>
              <th>Experience</th>
              <th>Salary</th>
              <th>Phone No</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{handleDate(employee.dob)}</td>
                <td>{employee.age}</td>
                <td>{employee.address}</td>
                <td>{employee.state}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{handleDate(employee.joining_date)}</td>
                <td>{employee.experience}</td>
                <td>{employee.salary}</td>
                <td>{employee.phone_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Form;