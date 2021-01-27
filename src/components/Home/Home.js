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
		const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
		this.fetchItems(endpoint);
	}
	loadMoreItems = () => {
		let endpoint= "";
		this.setState({ loading: true});
		if(this.state.searchTerm === ""){
			endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`
		}else{
			endpoint= `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
		}
		this.fetchItems(endpoint);
	}	

	fetchItems = (endpoint) =>{
		fetch(endpoint)
		.then(result => result.json())
		.then(result => {
			this.setState({
				movies: [...this.state.movies, ...result.results],
				heroImage: this.state.heroImage || result.results[0],
				loading: false,
				currentPage: result.page,
				totalPages: result.total_Pages
			})	
		})
	}
	// componentDidMount(){
	// 	this.setState({loading:true});
		
	// 	}
	// 	fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
	// 	.then(response => response.json())
	// 	.then(response =>{
			
	// 		})
	// 	})
	// }
	render(){
		return(
			<div className="movie-home">
			{this.state.heroImage ?
				<div>
					<HeroImage
					image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
					title= {this.state.heroImage.original_title}
					text={this.state.heroImage.overview}
					/>
					<SearchBar/>
				</div> : null}
				<ImageGrid/>
				<Spinner/>
				<LoadMoreBtn/>
			</div>
		)
	}
}

export default Home;