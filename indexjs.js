    document.addEventListener('DOMContentLoaded', function() {
  // ========== Global Variables ==========
  const cartItems = [];
  const cartBadge = document.querySelector('.cart-badge');
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.createElement('div');
  
  // ========== Cart Modal Functions ==========
  function createCartModal() {
    cartModal.id = 'cart-modal';
    cartModal.style.display = 'none';
    cartModal.style.position = 'fixed';
    cartModal.style.top = '50%';
    cartModal.style.left = '50%';
    cartModal.style.transform = 'translate(-50%, -50%)';
    cartModal.style.width = '90%';
    cartModal.style.maxWidth = '600px';
    cartModal.style.backgroundColor = 'white';
    cartModal.style.padding = '25px';
    cartModal.style.borderRadius = '15px';
    cartModal.style.boxShadow = '0 5px 25px rgba(0,0,0,0.2)';
    cartModal.style.zIndex = '10000';
    cartModal.style.maxHeight = '80vh';
    cartModal.style.overflowY = 'auto';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '15px';
    closeBtn.style.right = '15px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#666';
    closeBtn.onclick = () => cartModal.style.display = 'none';

    // Title
    const title = document.createElement('h2');
    title.textContent = 'ទំនិញក្នុងកន្ត្រក';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.color = '#e63946';

    // Items container
    const itemsContainer = document.createElement('div');
    itemsContainer.id = 'cart-items-container';
    itemsContainer.style.marginBottom = '30px';

    // Total section
    const totalDiv = document.createElement('div');
    totalDiv.id = 'cart-total';
    totalDiv.style.fontWeight = 'bold';
    totalDiv.style.margin = '20px 0';
    totalDiv.style.textAlign = 'right';
    totalDiv.style.fontSize = '18px';
    totalDiv.style.paddingTop = '15px';
    totalDiv.style.borderTop = '2px solid #eee';

    // Payment section
    const paymentSection = document.createElement('div');
    paymentSection.style.marginTop = '30px';
    paymentSection.style.paddingTop = '20px';
    paymentSection.style.borderTop = '2px dashed #eee';

    const paymentTitle = document.createElement('h3');
    paymentTitle.textContent = 'ជម្រើសទូរទាត់';
    paymentTitle.style.marginBottom = '20px';
    paymentTitle.style.textAlign = 'center';
    paymentTitle.style.color = '#333';

    const paymentOptions = document.createElement('div');
    paymentOptions.style.display = 'flex';
    paymentOptions.style.flexDirection = 'column';
    paymentOptions.style.gap = '15px';

    // QR Payment Option
    const qrPayment = createPaymentOption(
      'qr-code', 
      'ទូរទាត់តាម QR Code',
      'ស្កេនកូដខាងក្រោមដើម្បីបង់ប្រាក់',
      true
    );
    
    // Telegram Payment Option
    const telegramPayment = createPaymentOption(
      'fab fa-telegram', 
      'ទូរទាត់តាម Telegram',
      'ផ្ញើសារមកយើងខ្ញុំតាម Telegram',
      false,
      'https://t.me/som_chanchav'
    );
    
    // Phone Payment Option
    const callPayment = createPaymentOption(
      'fas fa-phone-alt', 
      'ទូរទាត់តាមទូរស័ព្ទ',
      'ហៅយើងខ្ញុំតាមលេខទូរស័ព្ទ',
      false,
      'tel:+0888319665'
    );

    paymentOptions.appendChild(qrPayment);
    paymentOptions.appendChild(telegramPayment);
    paymentOptions.appendChild(callPayment);
    
    paymentSection.appendChild(paymentTitle);
    paymentSection.appendChild(paymentOptions);

    // Assemble modal
    cartModal.appendChild(closeBtn);
    cartModal.appendChild(title);
    cartModal.appendChild(itemsContainer);
    cartModal.appendChild(totalDiv);
    cartModal.appendChild(paymentSection);
    document.body.appendChild(cartModal);
  }

  function createPaymentOption(icon, title, description, isQR, link = '#') {
    const option = document.createElement('div');
    option.style.display = 'flex';
    option.style.alignItems = 'center';
    option.style.gap = '15px';
    option.style.padding = '15px';
    option.style.backgroundColor = '#f9f9f9';
    option.style.borderRadius = '10px';
    option.style.transition = 'all 0.3s ease';
    
    option.onmouseenter = () => {
      option.style.transform = 'translateY(-3px)';
      option.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    };
    
    option.onmouseleave = () => {
      option.style.transform = 'none';
      option.style.boxShadow = 'none';
    };

    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.style.width = '50px';
    iconDiv.style.height = '50px';
    iconDiv.style.background = 'linear-gradient(135deg, #e63946, #ff6b6b)';
    iconDiv.style.color = 'white';
    iconDiv.style.borderRadius = '50%';
    iconDiv.style.display = 'flex';
    iconDiv.style.alignItems = 'center';
    iconDiv.style.justifyContent = 'center';
    iconDiv.style.fontSize = '20px';
    
    if (icon.startsWith('fa')) {
      const iconElement = document.createElement('i');
      iconElement.className = icon;
      iconDiv.appendChild(iconElement);
    } else {
      iconDiv.innerHTML = `<i class="fas ${icon}"></i>`;
    }

    // Content
    const contentDiv = document.createElement('div');
    contentDiv.style.flex = '1';
    
    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
    titleElement.style.margin = '0 0 5px 0';
    titleElement.style.color = '#333';
    
    const descElement = document.createElement('p');
    descElement.textContent = description;
    descElement.style.margin = '0';
    descElement.style.color = '#666';
    descElement.style.fontSize = '14px';
    
    contentDiv.appendChild(titleElement);
    contentDiv.appendChild(descElement);
    
if (isQR) {
  // ផ្នែករូបភាពជំនួស QR Code
  const qrContainer = document.createElement('div');
  qrContainer.style.display = 'flex';
  qrContainer.style.gap = '15px';
  qrContainer.style.marginTop = '10px';
  qrContainer.style.alignItems = 'center';
  
  // ផ្លាស់ប្តូរទីនេះជាប់ភ្ជាប់រូបភាពថ្មីរបស់អ្នក
  const customImage = document.createElement('img');
  customImage.src = 'qr.jpg'; // ✅ forward slash
  customImage.alt = 'Custom Image';
  customImage.style.width = '100px';
  customImage.style.height = '100px';
  customImage.style.border = '1px solid #ddd';
  customImage.style.padding = '5px';
  customImage.style.background = 'white';
  customImage.style.borderRadius = '8px'; // optional style
  customImage.style.objectFit = 'cover';
  
  const bankInfo = document.createElement('div');
  bankInfo.innerHTML = `
    <p style="margin:5px 0;font-size:13px;"><strong>ធនាគា៖</strong> Wink Bank (QR ដុល្លា)</p>
    <p style="margin:5px 0;font-size:13px;"><strong>លេខគណនី៖</strong> 123 456 789</p>
    <p style="margin:5px 0;font-size:13px;"><strong>ឈ្មោះ៖</strong> som chanchav</p>
  `;
  
  qrContainer.appendChild(customImage); // ប្រើរូបថ្មីជំនួស qrImage
  qrContainer.appendChild(bankInfo);
  contentDiv.appendChild(qrContainer);
}else {
      // Link button
      const linkBtn = document.createElement('a');
      linkBtn.href = link;
      linkBtn.target = '_blank';
      linkBtn.style.display = 'inline-flex';
      linkBtn.style.alignItems = 'center';
      linkBtn.style.gap = '5px';
      linkBtn.style.padding = '8px 15px';
      linkBtn.style.background = '#e63946';
      linkBtn.style.color = 'white';
      linkBtn.style.borderRadius = '5px';
      linkBtn.style.textDecoration = 'none';
      linkBtn.style.marginTop = '10px';
      linkBtn.style.fontSize = '14px';
      linkBtn.style.transition = 'all 0.2s ease';
      
      linkBtn.innerHTML = `
        <i class="fas fa-arrow-right"></i>
        <span>បន្តទៅទូរទាត់</span>
      `;
      
      linkBtn.onmouseenter = () => {
        linkBtn.style.background = '#d62c3a';
        linkBtn.style.transform = 'translateX(5px)';
      };
      
      linkBtn.onmouseleave = () => {
        linkBtn.style.transform = 'none';
      };
      
      contentDiv.appendChild(linkBtn);
    }
    
    option.appendChild(iconDiv);
    option.appendChild(contentDiv);
    
    return option;
  }

  // ========== Cart Operations ==========
  function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    if (cartItems.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 0;color:#666;">
          <i class="fas fa-shopping-cart" style="font-size:40px;margin-bottom:15px;opacity:0.3;"></i>
          <p>មិនមានទំនិញក្នុងកន្ត្រក</p>
        </div>
      `;
      document.getElementById('cart-total').textContent = '';
      return;
    }

    cartItems.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.style.display = 'flex';
      itemDiv.style.alignItems = 'center';
      itemDiv.style.marginBottom = '20px';
      itemDiv.style.paddingBottom = '20px';
      itemDiv.style.borderBottom = '1px solid #eee';

      const img = document.createElement('img');
      img.src = item.image || 'chang.png.PNG';
      img.style.width = '70px';
      img.style.height = '70px';
      img.style.objectFit = 'cover';
      img.style.marginRight = '20px';
      img.style.borderRadius = '8px';
      img.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

      const infoDiv = document.createElement('div');
      infoDiv.style.flex = '1';

      const name = document.createElement('div');
      name.textContent = item.name;
      name.style.fontWeight = 'bold';
      name.style.fontSize = '16px';
      name.style.marginBottom = '5px';

      const price = document.createElement('div');
      price.textContent = `$${item.price.toFixed(2)}`;
      price.style.color = '#e63946';
      price.style.fontWeight = '600';
      price.style.marginBottom = '10px';

      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '<i class="fas fa-trash"></i> លុបចេញ';
      removeBtn.style.background = '#ff4757';
      removeBtn.style.color = 'white';
      removeBtn.style.border = 'none';
      removeBtn.style.padding = '8px 15px';
      removeBtn.style.borderRadius = '5px';
      removeBtn.style.cursor = 'pointer';
      removeBtn.style.display = 'flex';
      removeBtn.style.alignItems = 'center';
      removeBtn.style.gap = '5px';
      removeBtn.style.transition = 'all 0.2s ease';
      removeBtn.onclick = () => removeFromCart(index);
      
      removeBtn.onmouseenter = () => {
        removeBtn.style.background = '#ff6b81';
      };
      
      removeBtn.onmouseleave = () => {
        removeBtn.style.background = '#ff4757';
      };

      infoDiv.appendChild(name);
      infoDiv.appendChild(price);
      infoDiv.appendChild(removeBtn);

      itemDiv.appendChild(img);
      itemDiv.appendChild(infoDiv);

      container.appendChild(itemDiv);
    });

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerHTML = `
      <div style="margin-bottom:10px;">ចំនួនទំនិញ៖ ${cartItems.length}</div>
      <div style="font-size:20px;color:#e63946;">សរុប៖ $${total.toFixed(2)}</div>
    `;
  }

  function addToCart(product) {
    cartItems.push(product);
    updateCartBadge();
    renderCartItems();
    showNotification(`"${product.name}" ត្រូវបានបន្ថែមទៅកន្ត្រក`);
  }

  function removeFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    updateCartBadge();
    renderCartItems();
    showNotification(`"${removedItem.name}" ត្រូវបានលុបចេញពីកន្ត្រក`, 'error');
  }

  // ========== UI Helpers ==========
  function updateCartBadge() {
    cartBadge.textContent = cartItems.length;
    cartBadge.style.display = cartItems.length > 0 ? 'flex' : 'none';
    
    // Animation
    if (cartItems.length > 0) {
      cartBadge.classList.add('bounce');
      setTimeout(() => cartBadge.classList.remove('bounce'), 300);
    }
  }

  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      ${message}
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  function createFlyingImage(imageElement, targetElement) {
    const flyingImage = imageElement.cloneNode();
    const rect = imageElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    
    flyingImage.style.position = 'fixed';
    flyingImage.style.width = '50px';
    flyingImage.style.height = '50px';
    flyingImage.style.borderRadius = '50%';
    flyingImage.style.objectFit = 'cover';
    flyingImage.style.zIndex = '10000';
    flyingImage.style.left = `${rect.left}px`;
    flyingImage.style.top = `${rect.top}px`;
    flyingImage.style.transition = 'all 0.5s cubic-bezier(0.42, 0, 0.58, 1)';
    
    document.body.appendChild(flyingImage);
    
    setTimeout(() => {
      flyingImage.style.left = `${targetRect.left}px`;
      flyingImage.style.top = `${targetRect.top}px`;
      flyingImage.style.width = '20px';
      flyingImage.style.height = '20px';
      flyingImage.style.opacity = '0.5';
    }, 10);
    
    setTimeout(() => {
      flyingImage.remove();
    }, 600);
  }

  // ========== Event Handlers ==========
  function setupCartIcon() {
    cartIcon.style.cursor = 'pointer';
    cartIcon.onclick = () => {
      cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    };
  }

  function setupBuyButtons() {
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-buy')) {
        const productCard = e.target.closest('.product-card');
        const product = {
          name: productCard.querySelector('.product-name').textContent,
          price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')),
          image: productCard.querySelector('.product-image').src
        };

        addToCart(product);
        createFlyingImage(productCard.querySelector('.product-image'), cartIcon);
      }
    });
  }

  // ========== Initialization ==========
  createCartModal();
  setupCartIcon();
  setupBuyButtons();
});
document.addEventListener('DOMContentLoaded', function() {
  // ========== Global Variables ==========
  const cartItems = [];
  const cartBadge = document.querySelector('.cart-badge');
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.createElement('div');
  let isLoggedIn = false;

  // Login elements
  const loginBtn = document.getElementById('loginBtn');
  const loginText = document.getElementById('loginText');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const loginForm = document.getElementById('loginForm');

  // ========== Login Functions ==========
  function openLoginModal() {
    loginModal.style.display = 'flex';
    setTimeout(() => {
      loginModal.classList.add('active');
    }, 10);
  }

  function closeLoginModalFunc() {
    loginModal.classList.remove('active');
    setTimeout(() => {
      loginModal.style.display = 'none';
    }, 300);
  }

  function setupLogin() {
    loginBtn.addEventListener('click', function() {
      if (!isLoggedIn) {
        openLoginModal();
      } else {
        // Logout
        isLoggedIn = false;
        loginText.textContent = 'Sign In';
        showNotification('អ្នកបានចាកចេញហើយ');
      }
    });

    closeLoginModal.addEventListener('click', closeLoginModalFunc);
    
    loginModal.addEventListener('click', function(e) {
      if (e.target === loginModal) {
        closeLoginModalFunc();
      }
    });

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (email && password) {
        // Simple validation - in real app you would call API
        isLoggedIn = true;
        loginText.textContent = 'Logout';
        closeLoginModalFunc();
        showNotification('ចូលប្រព័ន្ធបានជោគជ័យ!');
      } else {
        showNotification('សូមបំពេញអ៊ីមែល និងពាក្យសម្ងាត់', 'error');
      }
    });
  }

  // ========== Cart Modal Functions ==========
  function createCartModal() {
    // ... (keep existing cart modal code)
  }

  // ========== Cart Operations ==========
  function renderCartItems() {
    // ... (keep existing render cart items code)
  }

  function addToCart(product) {
    if (!isLoggedIn) {
      showNotification('សូមចូលប្រព័ន្ធដោយមុនដើម្បីបន្ថែមទំនិញ', 'error');
      openLoginModal();
      return;
    }
    cartItems.push(product);
    updateCartBadge();
    renderCartItems();
    showNotification(`"${product.name}" ត្រូវបានបន្ថែមទៅកន្ត្រក`);
  }

  function removeFromCart(index) {
    // ... (keep existing remove from cart code)
  }

  // ========== UI Helpers ==========
  function updateCartBadge() {
    // ... (keep existing update badge code)
  }

  function showNotification(message, type = 'success') {
    // ... (keep existing notification code)
  }

  function createFlyingImage(imageElement, targetElement) {
    // ... (keep existing flying image code)
  }

  // ========== Event Handlers ==========
  function setupCartIcon() {
    // ... (keep existing cart icon setup)
  }

  function setupBuyButtons() {
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-buy')) {
        if (!isLoggedIn) {
          showNotification('សូមចូលប្រព័ន្ធដោយមុនដើម្បីទិញ', 'error');
          openLoginModal();
          return;
        }
        
        const productCard = e.target.closest('.product-card');
        const product = {
          name: productCard.querySelector('.product-name').textContent,
          price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')),
          image: productCard.querySelector('.product-image').src
        };

        addToCart(product);
        createFlyingImage(productCard.querySelector('.product-image'), cartIcon);
      }
    });
  }

  // ========== Initialization ==========
  createCartModal();
  setupLogin();
  setupCartIcon();
  setupBuyButtons();
});

document.addEventListener('DOMContentLoaded', function () {
  // បង្កើតទិន្នន័យផលិតផលសម្រាប់គ្រប់ផលិតផល
  const products = {};
  
  // បំពេញទិន្នន័យសម្រាប់ផលិតផលទាំងអស់ (1 ដល់ 39)
  for (let i = 1; i <= 39; i++) {
    products[i] = {
      title: document.querySelector(`.btn-cart[data-id="${i}"]`)?.closest('.product-card')?.querySelector('.product-name')?.textContent || "Product " + i,
      price: document.querySelector(`.btn-cart[data-id="${i}"]`)?.closest('.product-card')?.querySelector('.product-price')?.textContent || "$0.00",
      order: document.querySelector(`.btn-cart[data-id="${i}"]`)?.closest('.product-card')?.querySelector('.product-order')?.textContent || "Min. order: 1 unit",
      image: document.querySelector(`.btn-cart[data-id="${i}"]`)?.closest('.product-card')?.querySelector('.product-image')?.src || "",
      description: "This is a detailed description for product " + i,
      material: "Standard Material",
      dimensions: "Various Sizes",
      weight: "Varies",
      warranty: "1 Year"
    };
  }

  // ធាតុ DOM
  const productModal = document.getElementById('productModal');
  const closeModal = document.getElementById('closeModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalOrder = document.getElementById('modalOrder');
  const modalDescription = document.getElementById('modalDescription');
  const specMaterial = document.getElementById('specMaterial');
  const specDimensions = document.getElementById('specDimensions');
  const specWeight = document.getElementById('specWeight');
  const specWarranty = document.getElementById('specWarranty');
  const modalAddCart = document.getElementById('modalAddCart');
  const modalBuyNow = document.getElementById('modalBuyNow');
  const cartBadge = document.querySelector('.cart-badge');
  
  // ចាប់ផ្តើមកន្ត្រក
  let cartItems = [];
  
  // បន្ថែមព្រឹត្តិការណ៍ចុចសម្រាប់ប៊ូតុង "Add to Cart" ទាំងអស់
  document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.getAttribute('data-id');
      const product = products[productId];
      
      // បំពេញ modal ដោយទិន្នន័យផលិតផល
      modalImage.src = product.image;
      modalTitle.textContent = product.title;
      modalPrice.textContent = product.price;
      modalOrder.textContent = product.order;
      modalDescription.textContent = product.description;
      specMaterial.textContent = product.material;
      specDimensions.textContent = product.dimensions;
      specWeight.textContent = product.weight;
      specWarranty.textContent = product.warranty;
      
      // កំណត់ ID ផលិតផលទៅប៊ូតុង modal
      modalAddCart.setAttribute('data-id', productId);
      modalBuyNow.setAttribute('data-id', productId);
      
      // បង្ហាញ modal
      productModal.style.display = 'flex';
    });
  });
  
  // បិទ modal
  closeModal.addEventListener('click', function() {
    productModal.style.display = 'none';
  });
  
  // បិទ modal នៅពេលចុចខាងក្រៅ
  productModal.addEventListener('click', function(e) {
    if (e.target === productModal) {
      productModal.style.display = 'none';
    }
  });
  
  // បន្ថែមទៅកន្ត្រកពី modal
  modalAddCart.addEventListener('click', function() {
    const productId = this.getAttribute('data-id');
    const product = products[productId];
    
    // បន្ថែមទៅកន្ត្រក
    cartItems.push(product);
    updateCartBadge();
    
    // បង្ហាញការបញ្ជាក់
    alert(`បានបន្ថែម ${product.title} ទៅកន្ត្រក!`);
    productModal.style.display = 'none';
  });
  
  // ទិញឥឡូវនេះពី modal
  modalBuyNow.addEventListener('click', function() {
    const productId = this.getAttribute('data-id');
    const product = products[productId];
    
    // បន្ថែមទៅកន្ត្រក
    cartItems.push(product);
    updateCartBadge();
    
    // បង្ហាញសារបញ្ជាទិញ
    alert(`បន្តទៅការបញ្ជាទិញសម្រាប់ ${product.title}!`);
    productModal.style.display = 'none';
  });
  
  // ធ្វើបច្ចុប្បន្នភាពសញ្ញាកន្ត្រក
  function updateCartBadge() {
    cartBadge.textContent = cartItems.length;
    cartBadge.style.display = cartItems.length > 0 ? 'block' : 'none';
    
    // បន្ថែមចលនារម្លោក
    cartBadge.classList.add('bounce-effect');
    setTimeout(() => {
      cartBadge.classList.remove('bounce-effect');
    }, 500);
  }
  
  // ចាប់ផ្តើមសញ្ញាកន្ត្រក
  updateCartBadge();
});

const loadingStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    transition: opacity 0.5s ease;
  }
  
  .loading-spinner {
    width: 80px;
    height: 80px;
    border: 5px solid rgba(255, 255, 255, 0.1);
    border-top: 5px solid #e94560;
    border-bottom: 5px solid #e94560;
    border-radius: 50%;
    animation: spin 1s linear infinite, pulse 2s ease infinite;
    margin-bottom: 25px;
    box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
  }
  
  .loading-text {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    margin-top: 15px;
    text-align: center;
    font-family: 'Koulen', sans-serif;
    letter-spacing: 1px;
    animation: float 3s ease infinite;
    text-shadow: 0 0 10px rgba(255,255,255,0.3);
  }
  
  .loading-logo {
    width: 120px;
    margin-bottom: 30px;
    filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
    animation: float 4s ease infinite;
  }
  
  .loading-progress-container {
    width: 300px;
    margin-top: 30px;
  }
  
  .loading-progress-text {
    color: #fff;
    text-align: right;
    margin-bottom: 5px;
    font-size: 14px;
  }
  
  .loading-progress {
    width: 100%;
    height: 6px;
    background: rgba(255,255,255,0.1);
    border-radius: 3px;
    overflow: hidden;
  }
  
  .loading-progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #e94560 0%, #ff7b8d 100%);
    transition: width 0.4s ease;
    box-shadow: 0 0 10px rgba(233, 69, 96, 0.5);
  }
  
  .loading-dots {
    display: flex;
    gap: 8px;
    margin-top: 20px;
  }
  
  .loading-dot {
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    animation: float 1.5s ease infinite;
  }
  
  .loading-dot:nth-child(1) { animation-delay: 0s; }
  .loading-dot:nth-child(2) { animation-delay: 0.2s; }
  .loading-dot:nth-child(3) { animation-delay: 0.4s; }
`;

document.addEventListener('DOMContentLoaded', function() {
  // បង្កើតស្ទាយ
  const styleElement = document.createElement('style');
  styleElement.innerHTML = loadingStyle;
  document.head.appendChild(styleElement);
  
  // បង្កើតធាតុ loading
  const loadingHTML = `
    <div class="loading-overlay">
      <img src="https://img.freepik.com/premium-vector/beautiful-unique-logo-design-ecommerce-retail-company_1253202-137882.jpg" class="loading-logo" alt="Shop Logo">
      <div class="loading-spinner"></div>
      <div class="loading-text">Please remember....</div>
      
      <div class="loading-progress-container">
        <div class="loading-progress-text">0%</div>
        <div class="loading-progress">
          <div class="loading-progress-bar"></div>
        </div>
      </div>
      
      <div class="loading-dots">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('afterbegin', loadingHTML);
  
  // កំណត់ការផ្ទុក
  const progressBar = document.querySelector('.loading-progress-bar');
  const progressText = document.querySelector('.loading-progress-text');
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // បិទ loading ដោយស្រស់ស្អាត
      setTimeout(() => {
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(() => {
          document.querySelector('.loading-overlay').remove();
        }, 500);
      }, 500);
    }
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.min(progress, 100)}%`;
  }, 300);
  
});
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    showNotification('សូមបំពេញអ៊ីមែល និងពាក្យសម្ងាត់', 'error');
    return;
  }

  // Validate email ត្រូវមាន @gmail.com តែប៉ុណ្ណោះ
  if (!email.endsWith('@gmail.com')) {
    showNotification('សូមបញ្ចូលអ៊ីមែល @gmail.com តែប៉ុណ្ណោះ', 'error');
    return;
  }

  if (password.length < 8) {
    showNotification('ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៨ តួរ', 'error');
    return;
  }

  isLoggedIn = true;
  loginText.textContent = 'Logout';
  closeLoginModalFunc();
  showNotification('🐵 ចូលប្រព័ន្ធបានជោគជ័យ!');
});

function showNotification(text, type = 'info') {
  const notif = document.createElement('div');
  notif.textContent = text;
  notif.style.position = 'fixed';
  notif.style.bottom = '20px';
  notif.style.left = '50%';
  notif.style.transform = 'translateX(-50%)';
  notif.style.padding = '15px 30px';
  notif.style.borderRadius = '50px';
  notif.style.fontSize = '14px';
  notif.style.background = type === 'error' ? '#ef4444' : '#0ea5e9';
  notif.style.color = '#fff';
  notif.style.boxShadow = type === 'error' ? '0 0 15px #f87171' : '0 0 15px #38bdf8';
  notif.style.zIndex = 99999;
  notif.style.animation = 'floatNotif 2s ease';

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 2000);
}

 const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    let currentIndex = 0;

    function showSlide(index) {
      slides.style.transform = `translateX(-${index * (100/totalSlides)}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      showSlide(currentIndex);
    }

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);














// ===== Products Data =====
// ===== Products Array =====
const products = [
  {id:1, name:"Commercial Refrigerator", price:"$800-$1,200", location:"Phnom Penh", discount:"10% off", img:"https://ext.same-assets.com/120203203/1808919011.jpeg", badge:"Limited Stock"},
  {id:2, name:"Industrial Oven", price:"$1,500-$2,000", location:"Siem Reap", discount:"5% off", img:"https://ext.same-assets.com/120203203/1242352767.jpeg", badge:"New"},
  {id:3, name:"Commercial Freezer", price:"$900-$1,300", location:"Battambang", discount:"No discount", img:"https://s.alicdn.com/@sc04/kf/H2f0ce3fe5dda4438a51e09759432a20e5.jpg_250x250xz.jpg", badge:"Hot"},
  {id:4, name:"Ice Cream Machine", price:"$1,200-$1,800", location:"Phnom Penh", discount:"15% off", img:"https://s.alicdn.com/@sc04/kf/Hc61708e808bd4378aa421daca46a1fc4L.jpg_250x250xz.jpg", badge:"Limited Stock"},
  {id:5, name:"Industrial Mixer", price:"$700-$1,100", location:"Siem Reap", discount:"No discount", img:"https://ext.same-assets.com/120203203/1273577494.jpeg", badge:"New"}
];

// ===== DOM Elements =====
const chatBox = document.getElementById('chatBox');
const chatHeader = document.getElementById('chatHeader');
const chatBody = document.getElementById('chatBody');
const chatFooter = document.getElementById('chatFooter');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// ===== Expand/Collapse =====
chatHeader.addEventListener('click', e=>{
  e.stopPropagation();
  chatBox.classList.toggle('expanded');
  if(chatBox.classList.contains('expanded')){
    chatBody.style.display='block';
    chatFooter.style.display='flex';
  } else {
    chatBody.style.display='none';
    chatFooter.style.display='none';
  }
});

document.addEventListener('click', e=>{
  if(!chatBox.contains(e.target) && chatBox.classList.contains('expanded')){
    chatBox.classList.remove('expanded');
    chatBody.style.display='none';
    chatFooter.style.display='none';
  }
});

// ===== Add Message =====
function addMessage(text,sender='user'){
  const msgDiv=document.createElement('div');
  msgDiv.classList.add('chat-message',sender);

  if(sender==='bot' && text.startsWith('product:')){
    const prodId = parseInt(text.split(':')[1]);
    const prod = products.find(p=>p.id===prodId);
    if(prod){
      msgDiv.innerHTML = `
        <div class="product-card">
          <img src="${prod.img}">
          <div>
            <div><b>${prod.name}</b></div>
            <div style="color:#ff6a00">${prod.price}</div>
            <div>Location: ${prod.location}</div>
            <div style="color:green">Discount: ${prod.discount}</div>
          </div>
        </div>`;
    } else {
      msgDiv.textContent = "Product not found!";
    }
  } else {
    const textDiv=document.createElement('div');
    textDiv.classList.add('message-text');
    textDiv.textContent=text;
    msgDiv.appendChild(textDiv);
  }

  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// ===== Send Message =====
function processMessage(msg){
  const text = msg.toLowerCase().trim();
  // Check if user asks about keywords
  let responseProducts = [];

  if(text.includes("តម្លៃ") || text.includes("price")){
    responseProducts = products; // return all for demo
    responseProducts.forEach(p=>{
      addMessage('product:'+p.id,'bot');
      addMessage(`តម្លៃ: ${p.price}`,'bot');
    });
    return;
  }

  if(text.includes("នៅណា") || text.includes("where")){
    responseProducts = products;
    responseProducts.forEach(p=>{
      addMessage('product:'+p.id,'bot');
      addMessage(`ទីតាំង: ${p.location}`,'bot');
    });
    return;
  }

  if(text.includes("discount") || text.includes("តម្លៃខ្លះ")){
    responseProducts = products;
    responseProducts.forEach(p=>{
      addMessage('product:'+p.id,'bot');
      addMessage(`Discount: ${p.discount}`,'bot');
    });
    return;
  }

  // Otherwise, search by product name
  responseProducts = products.filter(p => p.name.toLowerCase().includes(text));
  if(responseProducts.length>0){
    responseProducts.forEach(p=>{
      addMessage('product:'+p.id,'bot');
      addMessage(`Product info: ${p.name} - ${p.price} - ${p.location} - ${p.discount}`,'bot');
    });
  } else {
    addMessage("សុំទោស! មិនមានផលិតផលនេះទេ.",'bot');
  }
}

// ===== Event Listeners =====
sendBtn.addEventListener('click', ()=>{
  const msg = chatInput.value.trim();
  if(!msg) return;
  addMessage(msg,'user');
  chatInput.value='';
  setTimeout(()=>processMessage(msg), 300);
});

chatInput.addEventListener('keypress', e=>{
  if(e.key==='Enter') sendBtn.click();
});
