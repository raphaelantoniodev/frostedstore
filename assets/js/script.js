document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.querySelector('.loader').style.opacity = '0';
    document.querySelector('.loader').style.visibility = 'hidden';

    const toggleButton = document.querySelector(".navbar-toggle");
    const navbarLinks = document.querySelector(".navbar-links");

    toggleButton.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
    });

    loadProducts();
    setupTabs();
    setupModal();
    setupFAQ();

  }, 2000);

  let progress = 0;
  const progressInterval = setInterval(function () {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
    }
    document.querySelector('.loader-progress').style.width = progress + '%';
  }, 100);
});

function loadProducts() {
  const products = [
    { name: 'Party Balloons', price: 'R$ 24,00', image: 'assets/images/Party Balloons.png' },
    { name: 'Pumpkin Slice', price: 'R$ 15,00', image: 'assets/images/Pumpkin Slice.png' },
    { name: 'Spooky Brew', price: 'R$ 15,00', image: 'assets/images/Spooky Brew.png' },
    { name: 'Lovesick', price: 'R$ 13,00', image: 'assets/images/Lovesick.png' },
    { name: 'Devilish', price: 'R$ 11,50', image: 'assets/images/Devilish.png' },
    { name: 'Pristine Chocolatery', price: 'R$ 10,00', image: 'assets/images/Pristine Chocolatery.png' },
    { name: 'Easter Chick', price: 'R$ 10,00', image: 'assets/images/Easter Chick.png' },
    { name: 'Gothic Bouquet', price: 'R$ 8,00', image: 'assets/images/Gothic Bouquet.png' },
    { name: 'Easter Basket', price: 'R$ 7,00', image: 'assets/images/Easter Basket.png' },
    { name: 'Cherry Blossom', price: 'R$ 6,00', image: 'assets/images/Cherry Blossom.png' },
    { name: 'Dark Bone', price: 'R$ 6,00', image: 'assets/images/Dark Bone.png' },
    { name: 'Devilborn', price: 'R$ 6,00', image: 'assets/images/Devilborn.png' },
    { name: 'Marine Anchor', price: 'R$ 5,50', image: 'assets/images/Marine Anchor.png' },
    { name: 'Phantom Light', price: 'R$ 5,00', image: 'assets/images/Phantom Light.png' },
    { name: 'Merry Music', price: 'R$ 4,50', image: 'assets/images/Merry Music.png' },
    { name: 'Classic', price: 'R$ 4,50', image: 'assets/images/Classic.png' },
    { name: 'Acidic Potions', price: 'R$ 4,00', image: 'assets/images/Acidic Potions.png' },
    { name: 'Pegasus', price: 'R$ 4,00', image: 'assets/images/Pegasus.png' },
    { name: 'Pot O Gold', price: 'R$ 4,00', image: 'assets/images/Pot O Gold.png' },
    { name: 'Blade of Thorns', price: 'R$ 3,50', image: 'assets/images/Blade of Thorns.png' },
    { name: 'Twisted Passion', price: 'R$ 3,50', image: 'assets/images/Twisted Passion.png' },
    { name: 'Fortune House', price: 'R$ 3,50', image: 'assets/images/Fortune House.png' },
    { name: 'Soulless Theater', price: 'R$ 3,50', image: 'assets/images/Soulless Theater.png' },
    { name: 'Dark Mansion', price: 'R$ 3,50', image: 'assets/images/Dark Mansion.png' },
    { name: 'Lunar', price: 'R$ 3,00', image: 'assets/images/Lunar.png' },
    { name: 'Yuletide', price: 'R$ 3,00', image: 'assets/images/Yuletide.png' },
    { name: 'Grim Galleon', price: 'R$ 3,00', image: 'assets/images/Grim Galleon.png' },
    { name: 'Scarecrow', price: 'R$ 3,00', image: 'assets/images/Scarecrow.png' },
    { name: 'Grandfather Clock', price: 'R$ 3,00', image: 'assets/images/Grandfather Clock.png' },
    { name: 'Strawberry', price: 'R$ 6,00', image: 'assets/images/Strawberry.png' },
    { name: 'Lemon', price: 'R$ 5,00', image: 'assets/images/Lemon.png' },
    { name: 'Blueberry', price: 'R$ 5,00', image: 'assets/images/Blueberry.png' },
    { name: 'Pinata', price: 'R$ 4,50', image: 'assets/images/Pinata.png' },
  ];

  const productsPerPage = 8;
  let currentPage = 1;

  function displayProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);
  
    const container = document.getElementById('setGrid');
    if (!container) {
      console.error("Container de produtos não encontrado!");
      return;
    }
  
    container.innerHTML = '';
  
    productsToShow.forEach(product => {
      const productEl = document.createElement('div');
      productEl.className = 'product-card';
  
      productEl.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">
            <span class="current-price">${product.price}</span>
          </div>
        </div>
        <div class="product-actions">
          <a href="https://discord.gg/seu-servidor" target="_blank" class="buy-now-btn">
            <i class="fas fa-shopping-cart"></i> Comprar
          </a>
        </div>
      `;
  
      container.appendChild(productEl);
    });
  
    updatePagination();
    setupFilters();
  }
  

  function updatePagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.getElementById(`page${i}`);
      if (!pageBtn) continue;

      pageBtn.classList.remove('active');
      if (i === currentPage) {
        pageBtn.classList.add('active');
      }
    }
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
  }

  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts();
    }
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts();
    }
  });

  for (let i = 1; i <= 3; i++) {
    document.getElementById(`page${i}`).addEventListener('click', () => {
      currentPage = i;
      displayProducts();
    });
  }

  displayProducts();
}

function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      contents[i].classList.add('active');
    });
  });
}

function setupModal() {
  const modal = document.querySelector('.modal');
  const openBtn = document.querySelector('.open-modal');
  const closeBtn = document.querySelector('.close-modal');

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }
}

function setupFilters() {
  const filterInputs = document.querySelectorAll('.filter-input');
  const productCards = document.querySelectorAll('.product-card');

  filterInputs.forEach(input => {
    input.addEventListener('input', () => {
      const query = input.value.toLowerCase();
      productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function setupFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      
      item.classList.toggle('active');
    });
  });
}