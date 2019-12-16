import React from 'react';
import classes from './Character.css';

function Character(props){
    let createdYearsAgo = null;

    if(props.createdDate){
        let timeDiff = (new Date() - new Date(props.createdDate)) / 1000
        timeDiff /= (60 * 60 * 24);
        createdYearsAgo = Math.abs(Math.round(timeDiff / 365.25));
    }

    return(
        <div className={classes.Character}>
            <img src={props.imageUrl} className={classes.CharacterImage} alt="Not found"/>
            <div className={classes.CharacterName}>
                <h4>{props.characterName}</h4>
                <span>{props.characterId} - created {createdYearsAgo} years ago</span>
            </div>
        </div>
    );
}

export default Character;