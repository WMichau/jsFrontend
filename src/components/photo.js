import React from "react"
import '../styles.css'

const Photo = props => (
    <div className="PictureContainer">
        <h1>{props.photo.title}</h1>
        <div className="photo">
            <img src={props.photo.url} alt="PictureOfTheDay" />  
        </div>           
        <div className="explanation">
            <p>{props.photo.explanation}</p>
        </div>
    </div>
)

export default Photo