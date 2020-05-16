import React, { Component } from 'react'
import moment from 'moment'
import Photo from './components/photo'
import DateInput from './components/dateInput'

import SearchBar from './components/searchBar'
import Axios from 'axios'
import SearchResults from './components/searchResults'

const api_key = process.env.REACT_APP_NAPI

class App extends Component {
    
    state = {
        date: moment().format('YYYY-MM-DD'),
        photo: "",
        jsonImage: [],
        images: [],
        value: "",
    }

    componentDidMount() {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=Kwq7XQ6MeWqWVbOHfDMH41F36DF6BuycKSqTcGWn`)
          .then(response => response.json())
          .then(json => this.setState({ photo: json }));
      }

    cDate = event => {
        event.preventDefault()
        let dateFromInput = event.target[0].value
        if(dateFromInput > moment().format('YYYY-MM-DD')){
            dateFromInput = moment().format('YYYY-MM-DD')
            this.setState({ date: dateFromInput})  
        }else
            this.setState({ date: dateFromInput})        
        this.getPhoto(dateFromInput)
        
    }

    getPhoto = date => (
        fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=Kwq7XQ6MeWqWVbOHfDMH41F36DF6BuycKSqTcGWn`)
        .then(response => response.json())
        .then(photoDate => this.setState({photo: photoDate}))
    )

    prvImage = () => {
        var pDay = moment(this.state.date).add(-1,'days').format('YYYY-MM-DD')       
        this.setState({date: pDay })
        this.getPhoto(pDay)
    }

    nxtImage = () => {
        var nDay = moment(this.state.date).add(+1,'days').format('YYYY-MM-DD')
        if(nDay > moment().format('YYYY-MM-DD')){
            nDay = moment().format('YYYY-MM-DD')
            this.setState({date: nDay })
        }else
            this.setState({date: nDay })              
        this.getPhoto(nDay)
    }


    ////////////////////////////////////////////////////////////////////////////////////

    /*imgsSearch = () => (
        fetch('https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=Kwq7XQ6MeWqWVbOHfDMH41F36DF6BuycKSqTcGWn')
        .then(response => response.json())
        .then(json => this.setState({neoList: json}))
    )*/


    imgSearch = val => (
        Axios.get(`https://images-api.nasa.gov/search?q=${val}&media_type=image`)
        .then(res => {
            //this.setState({images : []})
            const imagesData = res.data
            this.setState({jsonImage: imagesData})
            var keys = Object.keys(imagesData.collection.items)
            var objects = keys.map((j) => imagesData.collection.items[j])
            var jsons = objects.map(function(j){
                return j.href
            })
            this.setState({jsonImage: jsons})
            this.imgGet()
        })
    )
    imgGet = () => {
        Promise.all(this.state.jsonImage.map(obj => 
            Axios.get(obj)
        .then(response => {
            this.state.images.push(response.data[2])
        })

        ))
    }

    searchHandler = event => {
        event.preventDefault()
        let sQuery = event.target[0].value
        this.imgSearch(sQuery)

    }
    //temporary

    searchClear = () => (
        this.setState({images : []})
    )

    render(){
        return (
            <div className="Container">
                <h1>image</h1>                       
                <DateInput changeDate={this.cDate} 
                    nxtImage={this.nxtImage}
                    prvImage={this.prvImage} 
                />
                <Photo photo={this.state.photo}/>
                <SearchBar searchHandler={this.searchHandler}
                    imgSearch={this.imgSearch}
                    imgGet={this.imgGet} 
                    searchClear={this.searchClear}
                />
                <SearchResults images={this.state.images} />
            </div>
        )
    }
}

export default App