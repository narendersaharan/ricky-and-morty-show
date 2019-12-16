import React from 'react';
import classes from './SelectedFilters.css';

function SelectedFilters(props){

        let btnClass = "btn " + classes.SelectedFilter;
        let renderedFilters = null;

        let onButtonClickHandler = event => {
            if(event.target.tagName === 'BUTTON'){
                props.handleFilterRemove(event.target.textContent.trim())
            }
            
            if(event.target.tagName === 'SPAN'){
                props.handleFilterRemove(event.target.parentElement.textContent.trim());
            }
        }

        if(props.selectedFilters.length > 0){
            renderedFilters = props.selectedFilters.map(filter => {
                return (
                    <button className={btnClass} key={filter} onClick={onButtonClickHandler}>
                        {filter} <span className="glyphicon glyphicon-remove"></span>
                    </button>
                );
            });
        }

        return(
            <div className="row">
                <div className="col-sm-12">
                    <h1>Selected Filters</h1>
                    {renderedFilters}
                </div>
            </div>
        );
}

export default SelectedFilters;