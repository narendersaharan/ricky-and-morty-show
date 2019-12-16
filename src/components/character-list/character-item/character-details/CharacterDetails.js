import React from 'react';
import classes from './CharacterDetails.css';

function CharacterDetails(props){

    return(
        <div className={classes.CharacterDetails}>
            {
                props.characterDetails.map((detail, index) => {
                    return(
                        <div className={classes.Detail} key={index}>
                            <div className={classes.DetailName}>
                                {detail.name === 'location' ? 'LAST LOCATION' : detail.name.toUpperCase()
                            }</div>
                            <div className={classes.DetailContent}>{detail.content}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default CharacterDetails;