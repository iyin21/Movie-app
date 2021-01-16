import React, { Component } from "react";
import "./Home.css";
import SearchBar from "../sections/SearchBar/SearchBar";
import HeroImage from "../sections/HeroImage/HeroImage";
import ImageGrid from "../sections/ImageGrid/ImageGrid";
import Spinner from "../sections/Spinner/Spinner";
import LoadMoreBtn from "../sections/LoadMoreBtn/LoadMoreBtn"

class Home extends Component{
	state = {

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