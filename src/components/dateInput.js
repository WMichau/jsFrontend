import React from "react";
import '../styles.css'

const DateInput = props => (
    <div className="Input">
        <form onSubmit={props.changeDate}>
            Enter a date (YYYY-MM-DD):
            <input />
            <input className="submit" type="submit" value="Search" />
        </form>
        <button onClick={props.prvImage}>Previous</button>
        <button onClick={props.nxtImage}>Next</button>
    </div>
)

export default DateInput;