import React from 'react';
import classes from './Filters.css';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange}) => (
    <input type={type} name={name} checked={checked} onChange={onChange}/>
);

function Filters(props) {

    let handleCheckboxChange = event => {
        props.handleCheckboxChange(event);
    }

    let filterTypes = Object.keys(props.createdFilters);
    let createdFilters = null;

    createdFilters = filterTypes.map(filterType => {
        return(
            <div className="row" key={filterType}>
                <div className="col-sm-12">
                    <div className={classes.Filter}>
                        <h4><b>{filterType}</b></h4>
                        {
                            props.createdFilters[filterType].map(filter => {
                                return(
                                    <div className="checkbox" key={filter.key}>
                                        <label><Checkbox name={filter.name} checked={props.selectedFilters.get(filter.name)} onChange={handleCheckboxChange}/>{filter.label}</label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    });

    return(
            <>
                <h1>Filters</h1>
                {createdFilters}
            </>
        );
}

export default Filters;