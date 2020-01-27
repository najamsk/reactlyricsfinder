import React, {Component} from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';

//import {Consumer} from '../../context';

class Lyrics extends Component {

    state = {
        track: {},
        lyrics: {},
    };

    componentDidMount() {
        const trackid = this.props.match.params.id;
        console.log("track id = ", trackid);

        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackid}&apikey=${process.env.REACT_APP_MM_KEY}`)
             .then(res => {
                 console.log(res.data);
                 console.log(res.data.message.body.lyrics);
                 this.setState({lyrics: res.data.message.body.lyrics});

                 return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${trackid}&apikey=${process.env.REACT_APP_MM_KEY}`);

             }).then(res => {
                 this.setState({track: res.data.message.body.track});
                 console.log(res.data);
             })
             .catch(err => {
                 console.log(err);
             });
    }

    render(){
        const {track, lyrics } = this.state;
        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0){
           return <Spinner /> 
        } else {
            return(
                <div>
                    <h1>
                        Lyrics
                    </h1>
                    <ul>
                        <li>
                            Track:    {track.track_name}
                        </li>
                        <li>
                            Album:   {track.album_name}
                        </li>
                        <li>
                            Artist:   {track.artist_name}
                        </li>
                    </ul>
                    <p>{lyrics.lyrics_body}</p>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                </div>
            );
        }
    };
}
export default Lyrics;
