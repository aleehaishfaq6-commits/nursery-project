
  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount(){
    const countElement = document.querySelector(".count");
    if(countElement) {
      countElement.textContent = cart.reduce((sum,item)=>sum+item.qty,0);
    }
  }

  function addToCart(product){
    let existing = cart.find(item => item.name === product.name);
    if(existing){
      existing.qty++;
    } else {
      cart.push({...product, qty:1});
    }
    saveCart();
    updateCartCount();
  }

  // Add event listeners to all buttons
  document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      let product = {
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        img: btn.dataset.img
      };
      addToCart(product);
      btn.disabled = true;
      btn.textContent = "Added!";
      displayCart();
    });
  });

  function displayCart(){
    const container = document.querySelector(".cart-items");
    const totalElement = document.querySelector(".total-span");
    if(!container) return;
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item,index) => {
      total += item.price * item.qty;

      let div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" width="100">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <div class="quantity">
          <button class="dec">-</button>
          <span>${item.qty}</span>
          <button class="inc">+</button>
        </div>
        <p>Subtotal: $${item.price * item.qty}</p>
        <button class="remove">Remove</button>
      `;

      div.querySelector(".inc").addEventListener("click", () => {
        item.qty++;
        saveCart();
        displayCart();
      });

      div.querySelector(".dec").addEventListener("click", () => {
        if(item.qty > 1){
          item.qty--;
        } else {
          cart.splice(index,1);
        }
        saveCart();
        displayCart();
      });

      div.querySelector(".remove").addEventListener("click", () => {
        cart.splice(index,1);
        saveCart();
        displayCart();
      });

      container.appendChild(div);
    });

    // totalElement.textContent = total;
    updateCartCount();
  }

  // Initial display
  displayCart();
  updateCartCount();
