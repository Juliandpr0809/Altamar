document.addEventListener('DOMContentLoaded', function() {
    // Datos de productos
    const productData = {
        "camiseta-basica-verde": {
            name: "CAMISETA BÁSICA VERDE",
            price: "$45.000",
            image: "https://via.placeholder.com/400x500/f5f5f5/333?text=Camiseta+1",
            description: "Camiseta básica de algodón en color verde. Corte regular que proporciona comodidad y libertad de movimiento."
        },
        "camiseta-grafica-blanca": {
            name: "CAMISETA GRÁFICA BLANCA",
            price: "$55.000",
            image: "https://via.placeholder.com/400x500/f5f5f5/333?text=Camiseta+2",
            description: "Camiseta gráfica con estampado frontal. Elaborada con algodón de alta calidad para mayor comodidad."
        },
        "camiseta-oversize-negra": {
            name: "CAMISETA OVERSIZE NEGRA",
            price: "$48.000",
            image: "https://via.placeholder.com/400x500/f5f5f5/333?text=Camiseta+3",
            description: "Camiseta oversize en color negro. Diseño amplio y cómodo, ideal para un look urbano y relajado."
        },
        "camiseta-manga-corta": {
            name: "CAMISETA MANGA CORTA",
            price: "$42.000",
            image: "https://via.placeholder.com/400x500/f5f5f5/333?text=Camiseta+4",
            description: "Camiseta de manga corta en algodón. Diseño minimalista perfecto para el día a día."
        }
    };

    // Navegación de categorías
    const categoryLinks = document.querySelectorAll('.category-link');
    const productSections = document.querySelectorAll('.product-section');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los links
            categoryLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Añadir clase active al link clickeado
            this.classList.add('active');
            
            // Ocultar todas las secciones
            productSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar la sección correspondiente
            const category = this.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });
    
    // Menú móvil
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    closeMenu.addEventListener('click', function() {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Categorías móviles
    const mobileCategoryLinks = document.querySelectorAll('.mobile-category-nav .category-link');
    
    mobileCategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            
            // Actualizar links activos en móvil y desktop
            categoryLinks.forEach(item => {
                if (item.getAttribute('data-category') === category) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // Ocultar todas las secciones
            productSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar la sección correspondiente
            document.getElementById(category).classList.add('active');
            
            // Cerrar menú móvil
            mobileMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Modal de producto
    const modal = document.getElementById('product-modal');
    const productCards = document.querySelectorAll('.product-card');
    const closeModal = document.querySelector('.close-modal');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // En un caso real, obtendríamos el ID del producto
            // Para este ejemplo, usamos el primer producto de los datos
            const productId = "camiseta-basica-verde";
            const product = productData[productId];
            
            // Llenar el modal con los datos del producto
            document.getElementById('modal-product-image').src = product.image;
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-price').textContent = product.price;
            
            // Mostrar el modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Funcionalidad de selección de tallas
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones de talla
            sizeButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
        });
    });
    
    // Funcionalidad de selección de colores
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones de color
            colorButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
        });
    });
    
    // Funcionalidad de control de cantidad
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity');
    
    decreaseBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
        }
    });
    
    // Validar entrada manual de cantidad
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 10) {
            this.value = 10;
        }
    });
    
    // Botón añadir al carrito
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        const productName = document.getElementById('modal-product-name').textContent;
        const quantity = document.getElementById('quantity').value;
        
        let selectedSize = "No seleccionada";
        sizeButtons.forEach(btn => {
            if (btn.classList.contains('active')) {
                selectedSize = btn.textContent;
            }
        });
        
        let selectedColor = "No seleccionado";
        colorButtons.forEach(btn => {
            if (btn.classList.contains('active')) {
                const style = window.getComputedStyle(btn);
                const bgColor = style.backgroundColor;
                
                // Convertir RGB a nombre de color (simplificado)
                if (bgColor === 'rgb(0, 0, 0)') {
                    selectedColor = 'Negro';
                } else if (bgColor === 'rgb(44, 72, 112)') {
                    selectedColor = 'Azul';
                } else if (bgColor === 'rgb(168, 60, 60)') {
                    selectedColor = 'Rojo';
                }
            }
        });
        
        alert(`Producto añadido al carrito:\n- ${productName}\n- Cantidad: ${quantity}\n- Talla: ${selectedSize}\n- Color: ${selectedColor}`);
        
        // Cerrar el modal después de añadir al carrito
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Botones de visualización
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    viewButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            viewButtons.forEach(button => {
                button.classList.remove('active');
            });
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Cambiar la visualización de la cuadrícula según el botón
            if (index === 0) { // 4 columnas
                productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
            } else if (index === 1) { // 3 columnas
                productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(400px, 1fr))';
            } else if (index === 2) { // 2 columnas
                productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(600px, 1fr))';
            }
        });
    });
});