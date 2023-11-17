//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import * as characterData from '../data/characters.js';
import * as helpers from '../helpers.js'



router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    return res.render('home',{title: 'Marvel Character Search'})
  } catch (error) {
    return res.status(500).send(error.message)
    
  }
  
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //console.log('test')
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
   //searchCharacterByName
  
  let characterName = req.body.searchCharacterByName

  //console.log(characterName)
  try {
    characterName = helpers.checkstringtrim(characterName)
    const characters = await characterData.searchCharacterByName(characterName)
    if(characters.length > 0){
      return res.render('characterSearchResults', {characters:characters, searchCharacterByName: characterName})
    }else{
      return res.render('characterSearchResults', {message: "No Characters Found", searchCharacterByName: characterName})
    }
  } catch (error) {
    return res.status(400).render('error', {error: error})
  }

});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
  const characterId = req.params.id
  try {
    const characterDetails = await characterData.searchCharacterById(characterId)
    console.log(characterDetails)
    return res.render('characterById', {
      characterName: characterDetails[0].name,
      characterThumbnailPath: characterDetails[0].thumbnail.path,
      characterDescription: characterDetails[0].description,
      characterComics: characterDetails[0].comics.items
    })
  } catch (error) {
    console.log(error)

    return res.status(404).render('error', {error: error.message})
  }
});

//export router
export default router