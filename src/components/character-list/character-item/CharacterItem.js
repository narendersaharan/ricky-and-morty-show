import React from 'react';
import classes from './CharacterItem.css';
import Character from './character/Character';
import CharacterDetails from './character-details/CharacterDetails';

function CharacterItem(props){

    return(
        <div className={classes.CharacterItem}>
            <Character characterName={props.characterName} 
                        characterId={props.characterId} 
                        imageUrl={props.imageUrl}
                        createdDate={props.createdDate}/>
            <CharacterDetails characterDetails={props.characterDetails}/>
        </div>
    );
}

export default CharacterItem;