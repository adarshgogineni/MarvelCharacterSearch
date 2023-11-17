//Here you will import route files and export them as used in previous labs
import CharacterRoutes from './characters.js';



const constructorMethod = (app) => {
    app.use('/', CharacterRoutes);

    app.use('*', (req, res) => {
        return res.status(404).json({error: 'Page Not found'});
      });
  };
 
  export default constructorMethod;