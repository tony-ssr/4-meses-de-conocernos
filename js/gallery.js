/**
 * GALLERY.JS - Funcionalidades de galería de imágenes
 * Desarrollado con amor para Mariangel ♡
 * 
 * Funcionalidades incluidas:
 * - Carga dinámica de imágenes
 * - Modal con navegación
 * - Lazy loading para optimización
 * - Efectos de transición suaves
 * - Manejo de errores robusto
 */

// ===== VARIABLES GLOBALES =====
let currentImageIndex = 0;
let currentGalleryType = 'galeria'; // 'galeria' o 'melody'
let galleryImages = [];
let melodyImages = [];
let isModalOpen = false;
let personalMessages = []; // Array para almacenar los mensajes personalizados

// ===== CONFIGURACIÓN DE IMÁGENES =====
const imageConfig = {
    galeria: {
        path: 'Content/fotos - ella/',
        count: 15,
        extension: 'jpg',
        container: 'galeriaGrid',
        className: 'galeria-item'
    },
    melody: {
        path: 'Content/myMelody/',
        count: 16,
        files: [
            '1-.jpg',
            '2-My Melody and Kuromi.jpg',
            '3-My melody cone.jpg',
            '4-my melodyy.webp',
            '5-.jpg',
            '6-.jpg',
            '7-ll.jpg',
            '8-.jpg',
            '9-daily sanrio  daiIysanrio on X.jpg',
            '11-y elody.jpg',
            '12-Loving my melody  animal crossing 3.jpg',
            '13-.jpg',
            '14-.jpg',
            '15-my melody.jpg',
            '16-.jpg'
        ],
        container: 'melodyGrid',
        className: 'melody-item'
    }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎀 Inicializando galería de Mariangel...');
    
    // Cargar mensajes personalizados primero
    loadPersonalMessages().then(() => {
        // Inicializar galerías después de cargar los mensajes
        initGallery();
        initMelodyGallery();
        initModal();
    }).catch(error => {
        console.error('❌ Error al cargar mensajes:', error);
        // Inicializar galerías sin mensajes si hay error
        initGallery();
        initMelodyGallery();
        initModal();
    });
});

// ===== CARGA DE MENSAJES PERSONALIZADOS =====
async function loadPersonalMessages() {
    try {
        console.log('📝 Cargando mensajes personalizados...');
        
        // Cargar el archivo de mensajes
        const response = await fetch('Content/mensajes 15 fotos/mensajes para cada foto de ella.txt');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const text = await response.text();
        
        // Procesar el texto línea por línea
        personalMessages = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => {
                // Remover el número al inicio si existe (ej: "1. Mensaje" -> "Mensaje")
                return line.replace(/^\d+\.\s*/, '');
            });
        
        console.log(`✨ ${personalMessages.length} mensajes cargados correctamente`);
        return personalMessages;
        
    } catch (error) {
        console.error('❌ Error al cargar mensajes personalizados:', error);
        // Mensajes de respaldo en caso de error
        personalMessages = [
            'Mi niña hermosa ♡',
            'Eres increíble, mi amor',
            'Tu sonrisa ilumina mi día',
            'Contigo todo es mejor',
            'Eres mi persona favorita',
            'Tu belleza es única',
            'Me haces muy feliz',
            'Eres perfecta como eres',
            'Mi corazón es tuyo',
            'Eres mi inspiración',
            'Te quiero muchísimo',
            'Eres mi tesoro',
            'Mi amor por ti crece cada día',
            'Eres mi mundo entero',
            'Te amo, Mariangel ♡'
        ];
        return personalMessages;
    }
}

// ===== INICIALIZACIÓN DE GALERÍA PRINCIPAL =====
function initGallery() {
    try {
        const container = document.getElementById(imageConfig.galeria.container);
        
        if (!container) {
            throw new Error('Contenedor de galería no encontrado');
        }
        
        // Generar array de imágenes de la galería
        galleryImages = [];
        for (let i = 1; i <= imageConfig.galeria.count; i++) {
            const imagePath = `${imageConfig.galeria.path}${i}.${imageConfig.galeria.extension}`;
            galleryImages.push({
                src: imagePath,
                alt: `Foto ${i} de Mariangel`,
                index: i - 1
            });
        }
        
        // Crear elementos de la galería
        createGalleryItems(container, galleryImages, 'galeria');
        
        console.log(`✅ Galería principal cargada con ${galleryImages.length} imágenes`);
    } catch (error) {
        console.error('❌ Error al inicializar galería principal:', error);
        showGalleryError('Error al cargar la galería de fotos');
    }
}

// ===== INICIALIZACIÓN DE GALERÍA MY MELODY =====
function initMelodyGallery() {
    try {
        const container = document.getElementById(imageConfig.melody.container);
        
        if (!container) {
            throw new Error('Contenedor de My Melody no encontrado');
        }
        
        // Generar array de imágenes de My Melody
        melodyImages = [];
        imageConfig.melody.files.forEach((filename, index) => {
            const imagePath = `${imageConfig.melody.path}${filename}`;
            melodyImages.push({
                src: imagePath,
                alt: `My Melody ${index + 1}`,
                index: index
            });
        });
        
        // Crear elementos de la galería My Melody
        createGalleryItems(container, melodyImages, 'melody');
        
        console.log(`✅ Galería My Melody cargada con ${melodyImages.length} imágenes`);
    } catch (error) {
        console.error('❌ Error al inicializar galería My Melody:', error);
        showGalleryError('Error al cargar la galería de My Melody');
    }
}

// ===== CREACIÓN DE ELEMENTOS DE GALERÍA =====
function createGalleryItems(container, images, type) {
    try {
        const config = imageConfig[type];
        
        images.forEach((imageData, index) => {
            // Crear contenedor del item
            const item = document.createElement('div');
            item.className = config.className;
            item.setAttribute('data-index', index);
            item.setAttribute('data-type', type);
            
            // Crear imagen con lazy loading
            const img = document.createElement('img');
            img.setAttribute('data-src', imageData.src);
            img.alt = imageData.alt;
            img.className = 'lazy-image';
            img.loading = 'lazy';
            
            // Crear overlay para hover con mensaje personalizado (solo para galería principal)
            const overlay = document.createElement('div');
            overlay.className = type === 'galeria' ? 'galeria-overlay' : 'melody-overlay';
            
            // Agregar mensaje personalizado si es la galería principal y hay mensajes disponibles
            if (type === 'galeria' && personalMessages && personalMessages[index]) {
                const messageElement = document.createElement('div');
                messageElement.className = 'galeria-message';
                messageElement.textContent = personalMessages[index];
                overlay.appendChild(messageElement);
                
                // Agregar corazón decorativo
                const heartElement = document.createElement('div');
                heartElement.className = 'galeria-heart';
                heartElement.innerHTML = '♡';
                overlay.appendChild(heartElement);
            } else if (type === 'melody') {
                // Para My Melody, mantener el corazón original
                overlay.innerHTML = '';
            }
            
            // Agregar evento de click
            item.addEventListener('click', function() {
                openModal(index, type);
            });
            
            // Agregar elementos al contenedor
            item.appendChild(img);
            item.appendChild(overlay);
            container.appendChild(item);
            
            // Configurar lazy loading
            setupLazyLoading(img);
        });
        
    } catch (error) {
        console.error(`❌ Error al crear elementos de galería ${type}:`, error);
    }
}

// ===== LAZY LOADING =====
function setupLazyLoading(img) {
    try {
        // Usar Intersection Observer para lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    const src = lazyImage.getAttribute('data-src');
                    
                    if (src) {
                        // Crear imagen temporal para precargar
                        const tempImg = new Image();
                        
                        tempImg.onload = function() {
                            lazyImage.src = src;
                            lazyImage.classList.add('loaded');
                            lazyImage.classList.remove('lazy-image');
                        };
                        
                        tempImg.onerror = function() {
                            console.warn(`⚠️ Error al cargar imagen: ${src}`);
                            lazyImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWZhZmQ4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
                            lazyImage.classList.add('loaded');
                            lazyImage.classList.remove('lazy-image');
                        };
                        
                        tempImg.src = src;
                    }
                    
                    observer.unobserve(lazyImage);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        imageObserver.observe(img);
        
    } catch (error) {
        console.error('❌ Error en lazy loading:', error);
        // Fallback: cargar imagen directamente
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.classList.add('loaded');
        }
    }
}

// ===== MODAL =====
function initModal() {
    try {
        const modal = document.getElementById('imageModal');
        const modalClose = document.querySelector('.modal-close');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        
        if (!modal || !modalClose || !modalPrev || !modalNext) {
            throw new Error('Elementos del modal no encontrados');
        }
        
        // Cerrar modal
        modalClose.addEventListener('click', closeModal);
        
        // Cerrar modal al hacer click fuera de la imagen
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Navegación del modal
        modalPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateModal(-1);
        });
        
        modalNext.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateModal(1);
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (isModalOpen) {
                switch(e.key) {
                    case 'Escape':
                        closeModal();
                        break;
                    case 'ArrowLeft':
                        navigateModal(-1);
                        break;
                    case 'ArrowRight':
                        navigateModal(1);
                        break;
                }
            }
        });
        
        console.log('✅ Modal inicializado correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar modal:', error);
    }
}

function openModal(index, type) {
    try {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        
        if (!modal || !modalImage) {
            throw new Error('Elementos del modal no encontrados');
        }
        
        currentImageIndex = index;
        currentGalleryType = type;
        
        const images = type === 'galeria' ? galleryImages : melodyImages;
        const imageData = images[index];
        
        if (!imageData) {
            throw new Error(`Imagen no encontrada en índice ${index}`);
        }
        
        // Configurar imagen del modal
        modalImage.src = imageData.src;
        modalImage.alt = imageData.alt;
        
        // Mostrar modal
        modal.style.display = 'block';
        isModalOpen = true;
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Agregar clase de animación
        setTimeout(() => {
            modal.classList.add('modal-open');
        }, 10);
        
        console.log(`🖼️ Modal abierto - Imagen ${index + 1} de ${type}`);
    } catch (error) {
        console.error('❌ Error al abrir modal:', error);
        showGalleryError('Error al mostrar la imagen');
    }
}

function closeModal() {
    try {
        const modal = document.getElementById('imageModal');
        
        if (!modal) return;
        
        // Animación de cierre
        modal.classList.remove('modal-open');
        
        setTimeout(() => {
            modal.style.display = 'none';
            isModalOpen = false;
            
            // Restaurar scroll del body
            document.body.style.overflow = 'auto';
        }, 300);
        
        console.log('🖼️ Modal cerrado');
    } catch (error) {
        console.error('❌ Error al cerrar modal:', error);
    }
}

function navigateModal(direction) {
    try {
        const images = currentGalleryType === 'galeria' ? galleryImages : melodyImages;
        const totalImages = images.length;
        
        // Calcular nuevo índice
        let newIndex = currentImageIndex + direction;
        
        // Manejar límites (navegación circular)
        if (newIndex < 0) {
            newIndex = totalImages - 1;
        } else if (newIndex >= totalImages) {
            newIndex = 0;
        }
        
        // Actualizar imagen
        const modalImage = document.getElementById('modalImage');
        const imageData = images[newIndex];
        
        if (modalImage && imageData) {
            // Efecto de transición
            modalImage.style.opacity = '0.5';
            
            setTimeout(() => {
                modalImage.src = imageData.src;
                modalImage.alt = imageData.alt;
                modalImage.style.opacity = '1';
                currentImageIndex = newIndex;
            }, 150);
        }
        
        console.log(`🖼️ Navegación modal - Imagen ${newIndex + 1}/${totalImages}`);
    } catch (error) {
        console.error('❌ Error en navegación del modal:', error);
    }
}

// ===== FUNCIONES DE UTILIDAD =====
function showGalleryError(message) {
    try {
        console.error(`❌ Error de galería: ${message}`);
        
        // Mostrar mensaje de error en la interfaz
        const errorDiv = document.createElement('div');
        errorDiv.className = 'gallery-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-button">Reintentar</button>
            </div>
        `;
        
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            text-align: center;
            max-width: 300px;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remover después de 10 segundos
        setTimeout(() => {
            if (errorDiv && errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 10000);
        
    } catch (error) {
        console.error('❌ Error al mostrar mensaje de error de galería:', error);
    }
}

// ===== FUNCIONES PÚBLICAS =====
window.GalleryManager = {
    openImage: function(index, type = 'galeria') {
        openModal(index, type);
    },
    
    closeModal: closeModal,
    
    getCurrentImage: function() {
        return {
            index: currentImageIndex,
            type: currentGalleryType,
            total: currentGalleryType === 'galeria' ? galleryImages.length : melodyImages.length
        };
    },
    
    preloadImages: function() {
        try {
            // Precargar las primeras imágenes de cada galería
            const imagesToPreload = [
                ...galleryImages.slice(0, 3),
                ...melodyImages.slice(0, 3)
            ];
            
            imagesToPreload.forEach(imageData => {
                const img = new Image();
                img.src = imageData.src;
            });
            
            console.log('✅ Imágenes precargadas');
        } catch (error) {
            console.error('❌ Error al precargar imágenes:', error);
        }
    }
};

// ===== OPTIMIZACIÓN DE RENDIMIENTO =====
// Precargar imágenes cuando la página esté completamente cargada
window.addEventListener('load', function() {
    setTimeout(() => {
        if (window.GalleryManager) {
            window.GalleryManager.preloadImages();
        }
    }, 2000);
});

// ===== MANEJO DE ERRORES ESPECÍFICOS DE GALERÍA =====
window.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'IMG') {
        console.warn(`⚠️ Error al cargar imagen: ${e.target.src}`);
        
        // Reemplazar con imagen placeholder
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWZhZmQ4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        e.target.classList.add('error-image');
    }
}, true);