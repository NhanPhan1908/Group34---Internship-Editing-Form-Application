import "./SummitStyle.css";
import React, { useState } from 'react';

function SummitIndex() {

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        gender: '',
        contact: '',
        Bachelor: '',
        bill: '',
        note: ''
      });
      
    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:[e.target.value]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }

    const ResetFunction = () => {
        setValues({firstname: '', lastname: '', email: '', contact: '', bill: '', Bachelor: '', note: ''})
    }


    return (
        <div className="container">
            <h1>Summit Form</h1>
            <form on Submit = {handleSubmit}>
                <label htmlFor="firstname">First Name*</label>
                <input type="text" placeholder="Enter First Name" name = "firstname" 
                onChange={(e) => handleChanges(e)} required value = {values.firstname}/>

                <label htmlFor="lastname">Last Name*</label>
                <input type="text" placeholder="Enter Last Name" name = "lastname" 
                onChange={(e) => handleChanges(e)} required value = {values.lastname}/>

                <label htmlFor="email">Email*</label>
                <input type="email" placeholder="Enter Email" name = "email" 
                onChange={(e) => handleChanges(e)} required value = {values.email}/>

                <label htmlFor="contact">Contact*</label>
                <input type="text" placeholder="Enter phone number" name = "contact" 
                onChange={(e) => handleChanges(e)} required value = {values.contact}/>

                <label htmlFor="Gender">Gender</label>
                <input type="radio" name = "gender" 
                onChange={(e) => handleChanges(e)} required /> Male
                <input type="radio" name = "gender" 
                onChange={(e) => handleChanges(e)} required /> Female
                <input type="radio" name = "gender" 
                onChange={(e) => handleChanges(e)} required /> Other

                <label htmlFor="bachelor">Bachelor</label>
                <select name="bachelor" id="bachelor" onChange={(e) => handleChanges(e)} required value = {values.Bachelor}>
                    <option value="ICT">ICT</option>
                    <option value="DS">DS</option>
                    <option value="CS">CS</option>
                    <option value="AET">AET</option>
                    <option value="MST">MST</option>
                    <option value="FST">FST</option>
                    <option value="Space and Application">SaP</option>
                </select>

                <label htmlFor="bill">Bill</label>
                <input type="file" name="url" id="Please upload the bill" 
                onChange={(e) => handleChanges(e)} required value = {values.bill}/>

                <label htmlFor="note">Note</label>
                <textarea name="note" id="note" cols = "30" rows = "10" placeholder="Write your note here"
                onChange={(e) => handleChanges(e)} required value = {values.note}></textarea>

                <button type = "button" onClick = {ResetFunction}>Reset</button>
                <button type = "summit">Summit</button>
                 
            </form>
        </div>
    );
}

export default SummitIndex;
