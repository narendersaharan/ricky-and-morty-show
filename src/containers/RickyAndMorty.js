import React, {Component} from 'react';
import Filters from '../components/filters/Filters';
import SelectedFilters from '../components/selected-filter/SelectedFilters';
import SearchSort from '../components/search-sort/SearchSort';
import axiosInstance from '../axios-characters';
import CharacterList from '../components/character-list/CharacterList';
import filters from '../filters';

class RickyAndMorty extends Component{
    constructor(props){
        super(props);
        this.state = {
            characters: null,
            sortCharacters: '',
            searchText:'',
            searchedCharacters: null,
            selectedFilters: new Map()
        };
        this.handleCharactersSorting = this.handleCharactersSorting.bind(this);
        this.handleSearchCharacters  = this.handleSearchCharacters.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleInputSearch = this.handleInputSearch.bind(this);
        this.handleFilters = this.handleFilters.bind(this);
        this.handleFilterRemove = this.handleFilterRemove.bind(this);
    }
    
    handleCharactersSorting(event){
        this.setState({sortCharacters: event.target.value});
    }

    handleSearchInputChange(event){
        this.setState({searchText: event.target.value});
    }

    handleInputSearch(event){
        if((event.target.tagName === 'BUTTON') || (event.target.tagName === 'INPUT' && event.key === 'Enter')){
            if(this.state.searchText){
                let searchedCharacters = this.state.characters.filter(item => {
                    return item.name === this.state.searchText;
                });
                this.setState({searchedCharacters: searchedCharacters});
            }else{
                this.setState({searchedCharacters: null});
            }
        }
    }

    handleSearchCharacters(searchText){
        if(searchText){
            let searchedCharacters = this.state.characters.filter(item => {
                return item.name === searchText;
            });
            this.setState({searchedCharacters: searchedCharacters});
        }else{
            this.setState({searchedCharacters: null});
        }
    }

    handleFilters(event){
        const item = event.target.name;
        const isChecked = event.target.checked;

        if(isChecked){
            this.setState(prevState => ({ selectedFilters: prevState.selectedFilters.set(item, isChecked) }));
        }else{
            this.setState(prevState => { 
                let previosSlectedFilters = prevState.selectedFilters;
                previosSlectedFilters.delete(item);

                return {
                    selectedFilters: previosSlectedFilters
                }
            });
        }
        
    }

    handleFilterRemove(filter){
        this.setState(prevState => { 
            let previosSlectedFilters = prevState.selectedFilters;
            previosSlectedFilters.delete(filter);

            return {
                selectedFilters: previosSlectedFilters
            }
        });
    }

    componentDidMount(){
        axiosInstance.get('/api/character/').then(response =>{
            this.setState({characters: response.data.results});
        });
    }

    render(){

        let charactersToRender = null;
        let characterList = this.state.searchedCharacters || this.state.characters;
        let sortedCharacterList = null;
        let filteredCharacterList = null;
        let selectedFilters = Array.from(this.state.selectedFilters.keys());

        if(this.state.sortCharacters){
            if(this.state.sortCharacters === 'asc'){
                sortedCharacterList = characterList.sort(function(a, b){
                    return a.id - b.id;
                });
            }else if(this.state.sortCharacters){
                sortedCharacterList = characterList.sort(function(a, b){
                    return b.id - a.id;
                });
            }
        }else{
            sortedCharacterList = characterList;
        }

        console.log(sortedCharacterList);

        if(selectedFilters.length > 0 && sortedCharacterList.length > 0){
            filteredCharacterList = sortedCharacterList.reduce((prev, character) => {
                if(selectedFilters.includes(character.species) || selectedFilters.includes(character.gender) || selectedFilters.includes(character.origin.name)){
                    prev.push(character);
                }
                return prev;
            }, []);
        }else{
            filteredCharacterList = sortedCharacterList 
        }

        if(this.state.characters){
            charactersToRender = <CharacterList characterList={filteredCharacterList}/>
        }

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2">
                        <Filters createdFilters={filters} 
                                handleCheckboxChange={this.handleFilters} 
                                selectedFilters={this.state.selectedFilters}/>
                    </div>
                    <div className="col-sm-10">
                        <SelectedFilters selectedFilters={selectedFilters}
                                            handleFilterRemove={this.handleFilterRemove}/>
                        <SearchSort sortCharacters={this.state.sortCharacters}
                                    searchText={this.state.searchText} 
                                    handleCharactersSorting={this.handleCharactersSorting}
                                    handleSearchCharacters={this.handleSearchCharacters}
                                    handleSearchInputChange={this.handleSearchInputChange}
                                    handleInputSearch={this.handleInputSearch}/>
                        { charactersToRender }
                    </div>
                </div>
            </div>
        );
    }
}

export default RickyAndMorty;