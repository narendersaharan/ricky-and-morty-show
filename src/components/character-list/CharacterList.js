import React from 'react';
import classes from './CharacterList.css';
import CharacterItem from './character-item/CharacterItem';
import NoCharacter from '../no-characters/NoCharacters';

function CharacterList(props){
    const details = ['status', 'species', 'gender', 'origin', 'location'];
    let updatedCharacterDetails = null;

    let chractersList = null;

    if(props.characterList && props.characterList.length > 0){
        chractersList = <div className={classes.CharacterList}>
            {
                props.characterList.map(character => {
                    let characterKeys = Object.keys(character);
                    updatedCharacterDetails = characterKeys.reduce((prev, item) =>{
                        if(details.includes(item)){
                            if(item === 'origin' || item === 'location'){
                                prev.push({
                                    name: item,
                                    content: character[item].name
                                });
                            }else{
                                prev.push({
                                    name: item,
                                    content: character[item]
                                });
                            }
                        }
                        return prev;
                    }, []);
        
                    return(
                        <CharacterItem key={character.id} characterName={character.name}
                                    characterId={character.id}
                                    imageUrl={character.image}
                                    createdDate={character.created}
                                    characterDetails={updatedCharacterDetails}/>
                    )
                })
            }
        </div>
    }else{
        chractersList = <NoCharacter />
    }

    return(
        <div className={"row"}>
            <div className="col-sm-12" style={{padding: '10px'}}>
               { chractersList }
            </div>
        </div>
    );
}

export default CharacterList;