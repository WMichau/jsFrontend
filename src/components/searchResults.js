import React from 'react'
import '../styles.css'

const SearchResults = props => {
        return props.images.slice(0, 30).map(img => {
                return <img className="imgResults" src={img} alt='' />
        })
}
        

export default SearchResults