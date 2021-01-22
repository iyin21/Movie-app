import React, { Component } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE} from "../../config";
import "./Home.css";
import SearchBar from "../sections/SearchBar/SearchBar";
import HeroImage from "../sections/HeroImage/HeroImage";
import ImageGrid from "../sections/ImageGrid/ImageGrid";
import Spinner from "../sections/Spinner/Spinner";
import LoadMoreBtn from "../sections/LoadMoreBtn/LoadMoreBtn"

class Home extends Component{
	state = {
		movies: [],
		heroImage: null,
		loading: false,
		currentPage: 0,
		totalPages: 0,
		searchTerm: ""
	}

	componentDidMount(){
		this.setState({loading:true});
		const endpoint ="${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1";
		this.fetchItems(endpoint);
	}

	fetchItems = (endpoint) =>{
		fetch(endpoint)
		.then(result => result.json())
		.then(result => {
			console.log(result);
		})
	}
	render(){
		return(
			<div className="movie-home">
				<SearchBar/>
				<HeroImage/>
				<ImageGrid/>
				<Spinner/>
				<LoadMoreBtn/>
			</div>
		)
	}
}

export default Home;