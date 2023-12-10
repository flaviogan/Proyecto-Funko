const LicenceService = require('../services/licenceService');
const ItemsService = require('../services/itemServices');

module.exports = {
  homeView: async (req, res) => {
      
    const licences = await LicenceService.getAllItemsLicences();
    const items = await ItemsService.getAllItems();
    const { data: itemsData } = items;


    res.render( './home',{
    // return res.render('../views/home.ejs', {

      view: {
          title: "Home | Funkoshop"
      },
      collections: licences.data,
      sliderTitle: 'Ultimos lanzamientos',
      enableGlide: true,
      items: itemsData,
  });
  },


    // Definido items para la vista de los sliders

    sliderView: async (req, res) => {
      try {

          const items = await ItemsService.getAllItems();
          const { data } = items;

          // Renderizar la vista parcial del slider con los elementos dinámicos
          res.render('partials/sliders', {
              view: {},
              items: data
          });
      } catch (error) {
          console.error(error);
          res.status(500).send('Error al obtener elementos para el slider');
      }
  },



  // contactView:(req, res) => res.send('Contact View Route'),

  contactView: async (req, res) => {
   // const { data } = await ItemsService.getAllItems();
    res.render( './contact',
    {
      view: {
        title: ' Contact | Funkoshop'
      },
     // items: data
    });
  },

  aboutView:(req, res) => res.send('About View Route'),
  faqsView:(req, res) => res.send('FAQs View Route'),
};