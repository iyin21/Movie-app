import React, { Component } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE} from "../../config";
import "./Home.css";
import SearchBar from "../sections/SearchBar/SearchBar";
import HeroImage from "../sections/HeroImage/HeroImage";
import ImageGrid from "../sections/ImageGrid/ImageGrid";
import MovieThumb from '../sections/MovieThumb/MovieThumb';
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

	searchTerm = (searchTerm) =>{
		let endpoint = '';
		this.setState({
			movies: [],
			loading: true,
			searchTerm
		})

		if(searchTerm ===''){
			endpoint= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
		}else{
			endpoint= `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${searchTerm}`;
		}
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
		.catch(error => console.error("Error:", error))
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
					<SearchBar callback={this.searchItems} />
				</div> : null}
				<div className="home-grid">
					<ImageGrid
						header={this.state.searchTerm ? "Search Result" : "popular Movies"}
						loading = {this.state.loading}
					>
						{this.state.movies.map( (element, i)=> {
							return <MovieThumb 
								key={i}
								clickable={true}
								image={element.poster_path ? `{IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_pacth}` : "./images/no_image.jpg"}
								movieId={element.id}
								movieName={element.original_title}
								/>
						})}
						</ImageGrid>
				</div>
				<Spinner/>
				<LoadMoreBtn/>
			</div>
		)
	}
}

export default Home;