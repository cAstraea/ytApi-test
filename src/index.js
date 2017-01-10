import React, { Component } from 'react'
import ReactDom from 'react-dom';
import API_KEY from '../keys';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';



class App extends Component {
    constructor(props) {

        super(props);

        this.state = { 
            videos: [],
            selectedVid: null
        };
        
        this.videoSearch('kittens');
     
        
    }
    videoSearch(term) {
                YTSearch({key: API_KEY.youtubeKey, term}, (videos) => {
                    this.setState({
                        videos,
                        selectedVid: videos[0]
                    });
         });   
    }
    render() {

        const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 350 );
     
        return ( <div>
         <SearchBar onSearchChange={videoSearch} />
         <VideoDetail video={this.state.selectedVid} /> 
         <VideoList videos={this.state.videos} onVideoSelect={selectedVid => this.setState({selectedVid})} />
        </div> );
    }
};
   


ReactDom.render(<App />, document.querySelector('.container'));
