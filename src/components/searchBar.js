import React from "react"
import '../styles.css'

class searchBar extends React.Component{

    render(){
        return(
            

            <div className="searchBarContainer">  <br></br>
                <h1><center>Not working as inteded</center></h1>      
                <form className="searchBarForm" onSubmit={this.props.searchHandler}>           
                    <input placeholder="e.g. Andromeda"/>
                    <input className="submit" type="submit" value="Search <-- 2 clicks needed" />
                </form>
                <center><button className="clear" onClick={this.props.searchClear} >Clear</button></center>
                     
            </div>
        )
    }
}

/*const searchBar = props => (
    <div className="searchBarContainer">        
        <form className="searchBarForm" onSubmit={props.searchHandler}>           
            <input placeholder="e.g. Andromeda"/>
            <input className="submit" type="submit" value="" />
        </form>      
    </div>
)*/

export default searchBar