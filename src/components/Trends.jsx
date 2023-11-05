import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container } from './NavBar';
import axios from 'axios';
import {AiOutlineClose, AiFillPlayCircle} from 'react-icons/ai'
import NoImg from './NoImage.jpg'
import '../Styles/videos.css'
import TrailerTrending from '../Trailers/TrailerTrending';


function Trends() {
    const {toggle, inputValue} = useContext(Container)
    const input = inputValue
    const Api = 'https://api.themoviedb.org/3'
    const TrendsShown = '/trending/all/week'
    const [trendArray,setTrendArray] = useState([])
    const [trendTitle, setTrendTitle] = useState('')
    const [trailer, setTrailer] = useState(true)
    const Images = 'https://image.tmdb.org/t/p/w500'

    const Trends = async() => {
        const data = await axios.get(`${Api}${TrendsShown}` , {
            params: {
                api_key: '70a4b6e289e9685962a89a03651415e1',
                query:input
            }
        })
        const results = data.data.results
        setTrendArray(results)
    }

    useEffect(() => {
        setTimeout(() => {
            Trends()
        },100)
    },[input])
    // console.log(trendArray)
    const TrendTitle = (trend) => {
        setTrendTitle(trend.title)
        setTrailer(!trailer)
    }
    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
            <div className="movies-container">
                {trendArray.map((trend) => {
                    return(
                        <Fragment>
                        <div id={trailer ? 'container' : 'NoContainer'}>
                            <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : 'hide'} onClick={() => TrendTitle(trend)}/>
                            <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg} alt=''onClick={() => TrendTitle(trend)}/>
                            <h3 id='smaller-Text' className={toggle ? 'mainColor' : 'secondaryColor'}>{trend.title}</h3>
                        </div>
                        </Fragment>
                    )
                })}
                {trailer ? console.log : <TrailerTrending trendTitle={trendTitle} toggle={toggle}/>}
                <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} cursor={'pointer'} onClick={() => setTrailer(true)}/>
            </div>
            </div>
        </Fragment>
    );
}

export default Trends;
