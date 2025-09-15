/**
 * ANIMATIONS.JS - Animaciones y efectos visuales avanzados
 * Desarrollado con amor para Mariangel ♡
 * 
 * Funcionalidades incluidas:
 * - Animaciones de entrada y salida
 * - Efectos de partículas avanzados
 * - Transiciones suaves entre secciones
 * - Animaciones de texto y elementos
 * - Efectos de hover mejorados
 */

// ===== VARIABLES GLOBALES =====
let animationFrameId = null;
let particleSystem = null;
let isAnimationEnabled = true;
let performanceMode = 'auto'; // 'high', 'medium', 'low', 'auto'

// ===== CONFIGURACIÓN DE ANIMACIONES =====
const animationConfig = {
    particles: {
        count: 25,
        maxCount: 50,
        colors: ['#efafd8', '#f1bcd4', '#ffa0ce', '#f295be', '#e36aa5'],
        shapes: ['circle', 'heart', 'star'],
        speed: {
            min: 0.5,
            max: 2
        },
        size: {
            min: 2,
            max: 8
        }
    },
    text: {
        typewriterSpeed: 50,
        fadeInDuration: 800,
        slideInDuration: 600
    },
    elements: {
        hoverScale: 1.05,
        hoverDuration: 300,
        bounceHeight: 10
    }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('✨ Inicializando sistema de animaciones...');
        
        // Detectar capacidades del dispositivo
        detectPerformanceCapabilities();
        
        // Inicializar sistemas de animación
        initAdvancedParticleSystem();
        initTextAnimations();
        initElementAnimations();
        initScrollAnimations();
        initHoverEffects();
        
        console.log(`🎭 Sistema de animaciones inicializado - Modo: ${performanceMode}`);
    } catch (error) {
        console.error('❌ Error al inicializar animaciones:', error);
        isAnimationEnabled = false;
    }
});

// ===== DETECCIÓN DE RENDIMIENTO =====
function detectPerformanceCapabilities() {
    try {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (hasReducedMotion) {
            performanceMode = 'low';
            isAnimationEnabled = false;
        } else if (isMobile || isLowEnd) {
            performanceMode = 'medium';
            animationConfig.particles.count = 15;
        } else {
            performanceMode = 'high';
        }
        
        console.log(`📊 Capacidades detectadas - Móvil: ${isMobile}, Bajo rendimiento: ${isLowEnd}, Movimiento reducido: ${hasReducedMotion}`);
    } catch (error) {
        console.error('❌ Error al detectar capacidades:', error);
        performanceMode = 'medium';
    }
}

// ===== SISTEMA DE PARTÍCULAS AVANZADO =====
function initAdvancedParticleSystem() {
    if (!isAnimationEnabled || performanceMode === 'low') return;
    
    try {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(canvas);
        
        particleSystem = new AdvancedParticleSystem(canvas);
        particleSystem.start();
        
        console.log('✅ Sistema de partículas avanzado inicializado');
    } catch (error) {
        console.error('❌ Error al inicializar sistema de partículas:', error);
    }
}

class AdvancedParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isRunning = false;
        
        this.setupCanvas();
        this.setupMouseTracking();
        this.createParticles();
    }
    
    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    createParticles() {
        const count = animationConfig.particles.count;
        
        for (let i = 0; i < count; i++) {
            this.particles.push(new AnimatedParticle(this.canvas));
        }
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Actualizar y dibujar partículas
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });
        
        animationFrameId = requestAnimationFrame(() => this.animate());
    }
}

class AnimatedParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.setupProperties();
    }
    
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
    }
    
    setupProperties() {
        const config = animationConfig.particles;
        
        this.size = Math.random() * (config.size.max - config.size.min) + config.size.min;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        this.shape = config.shapes[Math.floor(Math.random() * config.shapes.length)];
        this.speed = Math.random() * (config.speed.max - config.speed.min) + config.speed.min;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update(mouse) {
        // Movimiento base
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
        this.rotation += this.rotationSpeed;
        
        // Interacción con el mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            this.vx += (dx / distance) * force * 0.01;
            this.vy += (dy / distance) * force * 0.01;
        }
        
        // Límites del canvas
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
        
        // Mantener dentro del canvas
        this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        switch (this.shape) {
            case 'circle':
                this.drawCircle(ctx);
                break;
            case 'heart':
                this.drawHeart(ctx);
                break;
            case 'star':
                this.drawStar(ctx);
                break;
        }
        
        ctx.restore();
    }
    
    drawCircle(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawHeart(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const size = this.size;
        ctx.moveTo(0, size / 4);
        ctx.bezierCurveTo(-size, -size / 2, -size, size / 2, 0, size);
        ctx.bezierCurveTo(size, size / 2, size, -size / 2, 0, size / 4);
        ctx.fill();
    }
    
    drawStar(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const size = this.size;
        const spikes = 5;
        
        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes;
            const radius = i % 2 === 0 ? size : size / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
    }
}

// ===== ANIMACIONES DE TEXTO =====
function initTextAnimations() {
    try {
        // Efecto typewriter para el título principal
        const heroTitle = document.querySelector('.title-name');
        if (heroTitle && performanceMode !== 'low') {
            typewriterEffect(heroTitle);
        }
        
        // Animaciones de fade-in para párrafos
        const paragraphs = document.querySelectorAll('.carta-paragraph');
        paragraphs.forEach((p, index) => {
            if (performanceMode !== 'low') {
                animateOnScroll(p, 'fadeInUp', index * 200);
            }
        });
        
        console.log('✅ Animaciones de texto inicializadas');
    } catch (error) {
        console.error('❌ Error al inicializar animaciones de texto:', error);
    }
}

function typewriterEffect(element) {
    if (!element) return;
    
    try {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #e36aa5';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Efecto de cursor parpadeante
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, animationConfig.text.typewriterSpeed);
        
    } catch (error) {
        console.error('❌ Error en efecto typewriter:', error);
        element.textContent = element.textContent || element.getAttribute('data-text');
    }
}

// ===== ANIMACIONES DE ELEMENTOS =====
function initElementAnimations() {
    try {
        // Animación de entrada para las tarjetas
        const cards = document.querySelectorAll('.galeria-item, .melody-item');
        cards.forEach((card, index) => {
            if (performanceMode !== 'low') {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
        
        // Animación flotante para corazones
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach((heart, index) => {
            if (performanceMode !== 'low') {
                animateFloatingHeart(heart, index);
            }
        });
        
        console.log('✅ Animaciones de elementos inicializadas');
    } catch (error) {
        console.error('❌ Error al inicializar animaciones de elementos:', error);
    }
}

function animateFloatingHeart(heart, index) {
    try {
        const baseDelay = index * 500;
        const duration = 2000 + Math.random() * 1000;
        
        function animate() {
            heart.style.animation = `
                bounce ${duration}ms ease-in-out infinite,
                glow 3s ease-in-out infinite alternate
            `;
            heart.style.animationDelay = `${baseDelay}ms`;
        }
        
        animate();
        
        // Cambiar patrón ocasionalmente
        setInterval(() => {
            if (Math.random() > 0.7) {
                heart.style.transform = `scale(${1 + Math.random() * 0.3})`;
                setTimeout(() => {
                    heart.style.transform = 'scale(1)';
                }, 500);
            }
        }, 5000);
        
    } catch (error) {
        console.error('❌ Error en animación de corazón flotante:', error);
    }
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    if (performanceMode === 'low') return;
    
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-animation') || 'fadeInUp';
                    
                    element.classList.add('animate-' + animationType);
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar elementos animables
        const animatableElements = document.querySelectorAll('.section-title, .carta-paper, .galeria-item, .melody-item');
        animatableElements.forEach(el => {
            observer.observe(el);
        });
        
        console.log('✅ Animaciones de scroll inicializadas');
    } catch (error) {
        console.error('❌ Error al inicializar animaciones de scroll:', error);
    }
}

function animateOnScroll(element, animationType, delay = 0) {
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-' + animationType);
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    } catch (error) {
        console.error('❌ Error en animación de scroll:', error);
    }
}

// ===== EFECTOS DE HOVER MEJORADOS =====
function initHoverEffects() {
    try {
        // Efecto de brillo en botones y enlaces
        const interactiveElements = document.querySelectorAll('.nav-link, .galeria-item, .melody-item');
        
        interactiveElements.forEach(element => {
            if (performanceMode !== 'low') {
                addAdvancedHoverEffect(element);
            }
        });
        
        // Efecto de ondas en clicks
        document.addEventListener('click', createRippleEffect);
        
        console.log('✅ Efectos de hover inicializados');
    } catch (error) {
        console.error('❌ Error al inicializar efectos de hover:', error);
    }
}

function addAdvancedHoverEffect(element) {
    try {
        element.addEventListener('mouseenter', function(e) {
            // Efecto de elevación
            this.style.transform = `translateY(-${animationConfig.elements.bounceHeight}px) scale(${animationConfig.elements.hoverScale})`;
            this.style.transition = `all ${animationConfig.elements.hoverDuration}ms ease`;
            
            // Efecto de brillo
            if (performanceMode === 'high') {
                this.style.boxShadow = '0 15px 35px rgba(227, 106, 165, 0.3)';
            }
        });
        
        element.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
    } catch (error) {
        console.error('❌ Error en efecto de hover avanzado:', error);
    }
}

function createRippleEffect(e) {
    if (performanceMode === 'low') return;
    
    try {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const size = 100;
        ripple.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(239, 175, 216, 0.6) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - size/2}px;
            top: ${e.clientY - size/2}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
        
    } catch (error) {
        console.error('❌ Error en efecto de ondas:', error);
    }
}

// ===== ANIMACIONES CSS DINÁMICAS =====
function addDynamicCSS() {
    try {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes shimmer {
                0% { background-position: -200px 0; }
                100% { background-position: calc(200px + 100%) 0; }
            }
            
            .shimmer-effect {
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                background-size: 200px 100%;
                animation: shimmer 2s infinite;
            }
            
            .pulse-glow {
                animation: pulse-glow 2s ease-in-out infinite alternate;
            }
            
            @keyframes pulse-glow {
                from { box-shadow: 0 0 5px rgba(239, 175, 216, 0.5); }
                to { box-shadow: 0 0 20px rgba(239, 175, 216, 0.8), 0 0 30px rgba(239, 175, 216, 0.6); }
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ CSS dinámico agregado');
    } catch (error) {
        console.error('❌ Error al agregar CSS dinámico:', error);
    }
}

// ===== FUNCIONES PÚBLICAS =====
window.AnimationManager = {
    setPerformanceMode: function(mode) {
        performanceMode = mode;
        console.log(`🎭 Modo de rendimiento cambiado a: ${mode}`);
    },
    
    toggleAnimations: function() {
        isAnimationEnabled = !isAnimationEnabled;
        
        if (isAnimationEnabled && particleSystem) {
            particleSystem.start();
        } else if (particleSystem) {
            particleSystem.stop();
        }
        
        console.log(`🎭 Animaciones ${isAnimationEnabled ? 'activadas' : 'desactivadas'}`);
    },
    
    createCustomAnimation: function(element, keyframes, options) {
        try {
            if (!element || performanceMode === 'low') return;
            
            const animation = element.animate(keyframes, options);
            return animation;
        } catch (error) {
            console.error('❌ Error al crear animación personalizada:', error);
        }
    }
};

// ===== INICIALIZACIÓN FINAL =====
// Agregar CSS dinámico cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDynamicCSS);
} else {
    addDynamicCSS();
}

// Limpiar recursos al cerrar la página
window.addEventListener('beforeunload', function() {
    if (particleSystem) {
        particleSystem.stop();
    }
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});

// Pausar animaciones cuando la pestaña no está visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (particleSystem) particleSystem.stop();
    } else {
        if (particleSystem && isAnimationEnabled) particleSystem.start();
    }
});