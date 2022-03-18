import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import './style/All.css'

const App = () => {
  const [movie, setMovie] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const getMovie = () => {
    axios
      .get('http://www.omdbapi.com/?i=tt3896198&apikey=ec44a943')
      .then((response) => {
        // console.log(response)
        const myMovie = response.data
        setMovie(myMovie)
        setLoading(false)
      })
  }
  useEffect(() => {
    getMovie()
  }, [])

  const movies = []
  movies.push(movie)
  console.log(movies)

  return (
    <div className='App'>
      <div className='first-div'>
        <div className='second-div text-capitalize text-center'>
          <p className='mt-1 mt-md-3'>myTestApp</p>
        </div>
      </div>
      <div className='third-div text-center'>
        <p>Watch something incredible.</p>
      </div>
      {loading === false && (
        <Fragment>
          <div className='fourth-div p-4'>
            <p className='search ml-md-5'>Search</p>
            <input
              type='text'
              id='search'
              className='input ml-md-5'
              onChange={(event) => {
                setSearch(event.target.value)
              }}
            />
            {movies
              .filter((item) => {
                if (search == '') {
                  return null
                } else if (
                  item.Title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item
                }
              })
              .map((item, key) => {
                return (
                  <div key={key}>
                    <div className='list'>
                      {item.Title}
                    </div>
                  </div>
                )
              })}
            {movies.map((item, key) => {
              return (
                <div key={key}>
                  <div className='movie-genre ml-md-5 mt-md-5'>{item.Genre}</div>
                  <div className='movie-name mt-5 ml-md-5'>
                    <p>{item.Title === search ? search : item.Title}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default App
