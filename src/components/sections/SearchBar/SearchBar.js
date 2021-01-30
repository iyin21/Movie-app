import React, {Component} from "react";
//import FontAwesome from "react-fontAwesome";
import "./SearchBar";

class SearchBar extends Component{
	state={
		value:''

	}
	timeout = null;
	//this.onInputSearch = this.onInputSearch.bind(this)
	//onInputSearch(event){
	onInputSearch = (event) =>{
		this.setState({value: event.target.value})
		clearTimeout(this.timeout);

		this.timeout = setTimeout( () =>{
			this.props.callback(this.state.value);
		}, 500);
	}
	render(){
		return(
			<div className="searchbar">
				<div className="searchbar-content">
					<div className="check"><i className="fas fa-search"></i></div>
					<input
						type="text"
						className="searchbar-input"
						placeholder="Search"
						onChange={this.onInputSearch}
						value={this.state.value}
					/>	
				</div>
			</div>
		)
	}
}

export default SearchBar;