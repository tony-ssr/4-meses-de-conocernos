/**
 * MAIN.JS - Funcionalidades principales de la página
 * Desarrollado con amor para Mariangel ♡
 * 
 * Funcionalidades incluidas:
 * - Navegación responsive
 * - Scroll suave entre secciones
 * - Efectos de parallax
 * - Manejo de errores
 * - Optimización de rendimiento
 */

// ===== VARIABLES GLOBALES =====
let isScrolling = false;
let currentSection = 'inicio';
let isMobile = window.innerWidth <= 768;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('🌸 Iniciando página para Mariangel...');
        
        // Inicializar componentes principales
        initNavigation();
        initScrollEffects();
        initParticles();
        initResponsiveHandlers();
        
        // Mostrar mensaje de bienvenida
        showWelcomeMessage();
        
        console.log('✨ Página cargada exitosamente');
    } catch (error) {
        console.error('❌ Error al inicializar la página:', error);
        showErrorMessage('Error al cargar la página. Por favor, recarga el navegador.');
    }
});

// ===== NAVEGACIÓN =====
function initNavigation() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!hamburger || !navMenu) {
            throw new Error('Elementos de navegación no encontrados');
        }
        
        // Toggle del menú móvil
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Navegación suave entre secciones
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Cerrar menú móvil si está abierto
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Scroll suave a la sección
                    smoothScrollTo(targetSection);
                    
                    // Actualizar enlace activo
                    updateActiveNavLink(this);
                } else {
                    console.warn(`⚠️ Sección ${targetId} no encontrada`);
                }
            });
        });
        
        console.log('✅ Navegación inicializada correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar navegación:', error);
    }
}

// ===== SCROLL SUAVE =====
function smoothScrollTo(element) {
    if (!element) return;
    
    try {
        const headerOffset = 80; // Altura del navbar fijo
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Actualizar sección actual
        currentSection = element.id;
        
    } catch (error) {
        console.error('❌ Error en scroll suave:', error);
        // Fallback a scroll normal
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    try {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        console.log('✅ Efectos de scroll inicializados');
    } catch (error) {
        console.error('❌ Error al inicializar efectos de scroll:', error);
    }
}

function handleScroll() {
    try {
        const scrollY = window.pageYOffset;
        
        // Efecto parallax en el hero
        updateParallaxEffect(scrollY);
        
        // Actualizar navegación activa
        updateActiveSection();
        
        // Animaciones de entrada para elementos
        animateElementsOnScroll();
        
        // Efecto en navbar
        updateNavbarOnScroll(scrollY);
        
    } catch (error) {
        console.error('❌ Error en manejo de scroll:', error);
    }
}

function updateParallaxEffect(scrollY) {
    try {
        // Efecto parallax deshabilitado para la imagen hero para evitar desajustes
        // La imagen hero ahora permanece fija en su posición
        
        // Si quieres aplicar parallax a otros elementos, puedes hacerlo aquí
        // Por ejemplo, para elementos de fondo o decorativos
        
    } catch (error) {
        console.error('❌ Error en efecto parallax:', error);
    }
}

function updateActiveSection() {
    try {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const sectionId = section.getAttribute('id');
                if (sectionId !== currentSection) {
                    currentSection = sectionId;
                    updateActiveNavLink(document.querySelector(`[href="#${sectionId}"]`));
                }
            }
        });
    } catch (error) {
        console.error('❌ Error al actualizar sección activa:', error);
    }
}

function updateActiveNavLink(activeLink) {
    try {
        // Remover clase active de todos los enlaces
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Agregar clase active al enlace actual
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } catch (error) {
        console.error('❌ Error al actualizar enlace activo:', error);
    }
}

function animateElementsOnScroll() {
    try {
        const elements = document.querySelectorAll('.galeria-item, .melody-item, .carta-paper');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-fade-up');
            }
        });
    } catch (error) {
        console.error('❌ Error en animaciones de scroll:', error);
    }
}

function updateNavbarOnScroll(scrollY) {
    try {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(227, 106, 165, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(227, 106, 165, 0.1)';
            }
        }
    } catch (error) {
        console.error('❌ Error al actualizar navbar:', error);
    }
}

// ===== PARTÍCULAS ANIMADAS =====
function initParticles() {
    try {
        const particlesContainer = document.getElementById('particles');
        
        if (!particlesContainer) {
            console.warn('⚠️ Contenedor de partículas no encontrado');
            return;
        }
        
        // Crear partículas solo si no es móvil (optimización)
        if (!isMobile) {
            createParticles(particlesContainer);
        }
        
        console.log('✅ Partículas inicializadas');
    } catch (error) {
        console.error('❌ Error al inicializar partículas:', error);
    }
}

function createParticles(container) {
    try {
        const particleCount = 20;
        const colors = ['#efafd8', '#f1bcd4', '#ffa0ce', '#f295be', '#e36aa5'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Propiedades aleatorias
            const size = Math.random() * 6 + 2;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = Math.random() * 3 + 3;
            const delay = Math.random() * 2;
            
            // Aplicar estilos
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.background = color;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            container.appendChild(particle);
        }
    } catch (error) {
        console.error('❌ Error al crear partículas:', error);
    }
}

// ===== RESPONSIVE HANDLERS =====
function initResponsiveHandlers() {
    try {
        window.addEventListener('resize', debounce(handleResize, 250));
        console.log('✅ Handlers responsive inicializados');
    } catch (error) {
        console.error('❌ Error al inicializar handlers responsive:', error);
    }
}

function handleResize() {
    try {
        const newIsMobile = window.innerWidth <= 768;
        
        // Si cambió el estado móvil/desktop
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            
            // Reinicializar partículas si es necesario
            const particlesContainer = document.getElementById('particles');
            if (particlesContainer) {
                particlesContainer.innerHTML = '';
                if (!isMobile) {
                    createParticles(particlesContainer);
                }
            }
            
            // Cerrar menú móvil si se cambió a desktop
            if (!isMobile) {
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        }
        
        console.log(`📱 Resize detectado - Móvil: ${isMobile}`);
    } catch (error) {
        console.error('❌ Error en manejo de resize:', error);
    }
}

// ===== UTILIDADES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showWelcomeMessage() {
    try {
        console.log(`
        🌸✨ ¡Bienvenida Mariangel! ✨🌸
        
        Esta página fue creada especialmente para ti
        con todo mi amor para celebrar nuestros
        4 meses juntos ♡
        
        15 de septiembre de 2025
        
        Con amor,
        Antony ♡
        `);
    } catch (error) {
        console.error('❌ Error al mostrar mensaje de bienvenida:', error);
    }
}

function showErrorMessage(message) {
    try {
        // Crear elemento de error si no existe
        let errorDiv = document.getElementById('error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'error-message';
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff6b6b;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                font-family: var(--font-primary);
                max-width: 300px;
                animation: slideInRight 0.5s ease;
            `;
            document.body.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            if (errorDiv) {
                errorDiv.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => {
                    if (errorDiv && errorDiv.parentNode) {
                        errorDiv.parentNode.removeChild(errorDiv);
                    }
                }, 500);
            }
        }, 5000);
        
    } catch (error) {
        console.error('❌ Error al mostrar mensaje de error:', error);
    }
}

// ===== FUNCIONES PÚBLICAS =====
window.MariangelPage = {
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            smoothScrollTo(section);
        }
    },
    
    getCurrentSection: function() {
        return currentSection;
    },
    
    isMobileDevice: function() {
        return isMobile;
    }
};

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener('error', function(e) {
    console.error('❌ Error global capturado:', e.error);
    showErrorMessage('Se produjo un error inesperado. La página seguirá funcionando.');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promesa rechazada no manejada:', e.reason);
    showErrorMessage('Error de conexión detectado. Algunas funciones pueden verse afectadas.');
});

// ===== OPTIMIZACIÓN DE RENDIMIENTO =====
// Precargar imágenes críticas
function preloadCriticalImages() {
    try {
        const criticalImages = [
            'Content/myMelody/15-my melody.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        console.log('✅ Imágenes críticas precargadas');
    } catch (error) {
        console.error('❌ Error al precargar imágenes:', error);
    }
}

// Ejecutar precarga cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalImages);
} else {
    preloadCriticalImages();
}