import React from 'react';
import classes from './SearchSort.css';

function SearchSort(props){
    let handleCharactersSorting = event =>{
        props.handleCharactersSorting(event);
    }
    
    let handleSearchInputChange = event =>{
        props.handleSearchInputChange(event);
    }

    let handleInputSearch = event =>{
        props.handleInputSearch(event);
    }

    
    return(
        <div className={"row " + classes.SearchSort}>
                <div className="col-sm-7">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="usr" className={classes.SearchLabel}>Search By Name:</label>
                            <div className="clearfix">
                                <div className={"col-sm-10 " + classes.NoPadding}>
                                    <input type="text" className="form-control input-form-control" name="searchText" value={props.searchText}
                                            id="searchText" autoComplete="off" onChange={handleSearchInputChange} onKeyPress={handleInputSearch}/>
                                </div>
                                <div className={"col-sm-2 " + classes.NoPadding + " " + classes.SearchButton}>
                                    <button className="btn btn-primary" onClick={handleInputSearch}>Search</button>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="col-sm-5">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="sortCharacters" className={classes.SearchLabel}>&nbsp;</label>
                            <select className="form-control" value={props.sortCharacters} 
                                    name="sortCharacters" id="sortCharacters" onChange={handleCharactersSorting}>
                                <option value="">Sort By ID</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default SearchSort;