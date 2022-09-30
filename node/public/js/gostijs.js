var br = 0;

fetch('http://localhost:3001/cjenovnik')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
  });

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready(){

    accordionMenu()

    const param = new URLSearchParams(window.location.search)
    document.getElementById("stol").value = param.get('brs')

    var removeItem = document.getElementsByClassName('btn-danger')
    console.log(removeItem)
    for(var i = 0; i < removeItem.length ; i++){
        var button = removeItem[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)


}

function purchaseClicked(){
    alert('Hvala!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0 || input.value >= 100){
        input.value = 1
    }
    document.getElementById("kol" + input.id).value = input.value;
    updateTotal()
}

function addToCartClicked(event){
    event.preventDefault()
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(title,price)
    updateTotal()
}

function addItemToCart(title, price){
  console.log(br);
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var hiddenInput = document.createElement(null)
    var hiddenItems = document.getElementsByClassName('forma')[0]
    var hiddenItemsNames = hiddenItems.getElementsByClassName('skriveni')
    for (var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('Vec postoji')
            return 
        }
    }
    for (var i = 0; i < hiddenItemsNames.length; i++){
      if(hiddenItemsNames[i].innerText == title){
          alert('Vec postoji')
          return 
      }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" id="${br}">
            <button class="btn btn-danger" type="button">UKLONI</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
    var amount = document.getElementById(`${br}`).value;
    var hiddenRowContents = `
        <input type="hidden" name="naslov" value="${title}">
        <input type="hidden" name="cijena" value="${price}">
        <input type="hidden" name="kolicina" id="kol${br}" value="${amount}">`
        hiddenInput.innerHTML = hiddenRowContents
        hiddenItems.append(hiddenInput)
    br++;
}

function updateTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0; i < cartRows.length ; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total.toFixed(2) + 'KM'
}

var coll = document.getElementsByClassName("collapsible")

for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
    this.classList.toggle("active")
    var content = this.nextElementSibling
    if (content.style.display === "block") {
      content.style.display = "none"
    } else {
      content.style.display = "block"
    }
  })
}

function accordionMenu() {

    if (!Element.prototype.closest) {
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      Element.prototype.closest = function (s) {
        var el = this;
        var ancestor = this;
        if (!document.documentElement.contains(el)) return null;
        do {
          if (ancestor.matches(s)) return ancestor;
          ancestor = ancestor.parentElement;
        } while (ancestor !== null);
        return null;
      };
    }
    // Listen for click on the document
    // Accordiom menu functionality
    document.addEventListener('click', function (event) {
      // Bail if our clicked element doesn't match
      var trigger = event.target.closest('[data-accordion-menu]');
      if (!trigger) return;
      // Get the target content
      var target = document.querySelector(trigger.hash);
      if (!target) return;
      // Prevent default link behavior
      event.preventDefault();
      // Toggle our content
      target.classList.toggle('accordion-menu--hidden');
      // Toggle trigger class
      trigger.classList.toggle('accordion-menu--active');
    });
    // Listen for click on the document
    // Accordion parent menu functionality
    document.addEventListener('click', function (event) {
      // Bail if our clicked element doesn't match
      var trigger = event.target.closest('[data-accordion-menu-nav]');
      if (!trigger) return;
      // Get the target content
      var target = document.querySelector(trigger.hash);
      if (!target) return;
      // Prevent default link behavior
      event.preventDefault();
      // If the content is already expanded, collapse it and quit
      if (target.classList.contains('active')) {
        target.classList.remove('active');
        return;
      }
      // Get all open accordion content, loop through it, and close it
      var accordions = document.querySelectorAll('[data-accordion-wrapper]');
      for (var i = 0; i < accordions.length; i++) {
        accordions[i].classList.remove('active');
      }
      // Toggle our content
      target.classList.toggle('active');
    });

    var mainBckg = ['img/kafa.jpg','img/sok.jpg','img/alkohol.jpg','img/hrana.jpg','img/special.jpg']
    var containerMB = document.getElementsByClassName('accordion-menu__link');
    for(var i = 0; i < containerMB.length; i++){
        var containerC = containerMB[i]
        containerC.style.backgroundImage = "url('"+mainBckg[i]+"')"
        containerC.style.backgroundRepeat = "no-repeat"
        containerC.style.backgroundSize = "cover"
    }

    var subBckg = ['img/sendvic.jpg','img/meso.jpg','img/palacinci.jpg','img/dodaci.jpg']
    var containerSB = document.getElementsByClassName('accordion-menu__link2');
    for(var i = 0; i < containerSB.length; i++){
        var containerC = containerSB[i]
        containerC.style.backgroundImage = "url('"+subBckg[i]+"')"
        containerC.style.backgroundRepeat = "no-repeat"
        containerC.style.backgroundSize = "cover"
    }
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function getMenu() {
  console.log(br);
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('Vec postoji')
            return 
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" id="${br}">
            <button class="btn btn-danger" type="button">UKLONI</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}