class PotionCreator {
  constructor( {name, image, price, effect, ingredients }) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.effect = effect;
    this.ingredients = ingredients;     
  }
  
  createCard() {
    const potionsContainer = document.getElementById('potions-container');
    const potionCard = document.createElement('div');
    potionCard.classList.add('potion-card');

    potionCard.innerHTML = 
    `
    <img class ="potion-image" src="./src/products/${this.image}" alt="${this.name}">
    <div class="potions-card-info">
      <span class="potion-name">${this.name}</span>
      <span class="potion-price">$${this.price}</span>
    </div> 
    `
    potionsContainer.append(potionCard);

    const onClick = (element) => {

      element.addEventListener('click', (event) => {
        this.createLightbox()
        
    });
  }

  onClick(potionCard)

  }

   createLightbox() {
    let container = document.createElement('div');
    let body = document.body;

    let clickOut = () => {
      let triggeres = document.querySelectorAll('[data-modal]');
      triggeres.forEach(trigger => {
        addEventListener('click', (event) => {
          if (event.target === trigger) {
            container.classList.toggle('ativo');
          }
        })
      })
    }

    container.classList.add('lightbox-container');
    container.setAttribute('data-modal', '');

    container.innerHTML = 
     `
     <div class="lightbox">
       <div class="potion-image-container">
         <img class="image-lightbox" src="./src/products/${this.image}" alt=${this.name}>
       </div>
       <div class="potion-description">
         <span class="potion-name">${this.name}</span>
         <dl class="static-text">Use/Effect</dl>
         <dd class="potion-effect">${this.effect}</dd>
         <ul class="potion-ingredients">
           <span class="static-text">Ingredients :</span> 
           <span class="ingredients-list"> ${ this.ingredients.map(ingredient =>  `<li> ${ingredient} </li>` ).join('')}
            </span>        
         </ul>
         <span class="static-text">Price</span>
         <span class="potion-price"> $${this.price}</span>
         <input class="potion-buy-button" type="button" value="ADD  TO CART" >
       </div>
       <span class="close-lightbox" data-modal>X</span>
     </div>
     `
    body.append(container);
    container.classList.toggle('ativo');
    container.addEventListener('click', clickOut);
  }

}
async function fetchPotions(){
  try{
    const potions = await fetch('../quero-trabalhar-na-enext/assets/potions.json')
    .then(response => response.json())
    .then( potionsObject => potionsObject.potions);
    const potionsLength = Object.keys(potions).length;

    let teste = new PotionCreator(potions[1]);
    teste.createCard()
    var createdPotions = [];

    for( let i = 1; i < potionsLength; i++) {
    
      createdPotions[i] = new PotionCreator(potions[i]);
      createdPotions[i].createCard();    
    }
  }
  catch(error){
    console.log(error);
  }
}
fetchPotions()