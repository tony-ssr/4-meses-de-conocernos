/**
 * SISTEMA INTERACTIVO DE CARTA EN SOBRE
 * ====================================
 * 
 * Este archivo maneja la funcionalidad interactiva del sobre y la carta.
 * Incluye transiciones suaves, animaciones y control de estados.
 * 
 * Funcionalidades principales:
 * - Abrir sobre al hacer clic
 * - Mostrar carta con transición elegante
 * - Cerrar carta y volver al sobre
 * - Animaciones fluidas sin efectos de sonido
 */

// ===== VARIABLES GLOBALES =====
let isLetterOpen = false; // Estado actual de la carta
const envelope = document.getElementById('envelope');
const cartaContent = document.getElementById('carta-content');
const closeLetterBtn = document.getElementById('close-letter');

// ===== FUNCIÓN PRINCIPAL DE INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎀 Sistema de carta interactiva inicializado');
    
    // Configurar eventos de interacción
    setupEventListeners();
    
    // Configurar estado inicial
    initializeLetterState();
});

// ===== CONFIGURACIÓN DE EVENTOS =====
function setupEventListeners() {
    // Evento para abrir la carta al hacer clic en el sobre
    if (envelope) {
        envelope.addEventListener('click', openLetter);
        console.log('📮 Evento de apertura configurado en el sobre');
    }
    
    // Evento para cerrar la carta
    if (closeLetterBtn) {
        closeLetterBtn.addEventListener('click', closeLetter);
        console.log('❌ Evento de cierre configurado en el botón');
    }
    
    // Prevenir propagación de eventos en el contenido de la carta
    if (cartaContent) {
        cartaContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// ===== CONFIGURACIÓN DEL ESTADO INICIAL =====
function initializeLetterState() {
    // Asegurar que la carta esté oculta inicialmente
    if (cartaContent) {
        cartaContent.style.display = 'none';
        cartaContent.style.opacity = '0';
        cartaContent.style.transform = 'translateY(30px)';
    }
    
    // Asegurar que el sobre esté visible
    if (envelope) {
        envelope.style.display = 'block';
        envelope.style.opacity = '1';
    }
    
    isLetterOpen = false;
    console.log('🎯 Estado inicial configurado: sobre cerrado');
}

// ===== FUNCIÓN PARA ABRIR LA CARTA =====
function openLetter() {
    if (isLetterOpen) return; // Prevenir múltiples aperturas
    
    console.log('📖 Abriendo carta...');
    isLetterOpen = true;
    
    // Fase 1: Ocultar el sobre con transición elegante
    envelope.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    envelope.style.transform = 'translateY(-20px) scale(0.95)';
    envelope.style.opacity = '0';
    
    // Fase 2: Mostrar la carta después de que el sobre desaparezca
    setTimeout(() => {
        // Ocultar completamente el sobre
        envelope.style.display = 'none';
        
        // Preparar la carta para la animación de entrada
        cartaContent.style.display = 'block';
        cartaContent.style.opacity = '0';
        cartaContent.style.transform = 'translateY(50px) scale(0.9)';
        
        // Animar la entrada de la carta
        setTimeout(() => {
            cartaContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            cartaContent.style.opacity = '1';
            cartaContent.style.transform = 'translateY(0) scale(1)';
            
            console.log('✨ Carta abierta con éxito');
            
            // Scroll suave hacia la carta
            setTimeout(() => {
                cartaContent.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 300);
            
        }, 100);
    }, 600);
}

// ===== FUNCIÓN PARA CERRAR LA CARTA =====
function closeLetter() {
    if (!isLetterOpen) return; // Prevenir múltiples cierres
    
    console.log('📪 Cerrando carta...');
    isLetterOpen = false;
    
    // Fase 1: Ocultar la carta con transición elegante
    cartaContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    cartaContent.style.transform = 'translateY(30px) scale(0.9)';
    cartaContent.style.opacity = '0';
    
    // Fase 2: Mostrar el sobre después de que la carta desaparezca
    setTimeout(() => {
        // Ocultar completamente la carta
        cartaContent.style.display = 'none';
        
        // Preparar el sobre para la animación de entrada
        envelope.style.display = 'block';
        envelope.style.opacity = '0';
        envelope.style.transform = 'translateY(20px) scale(0.95)';
        
        // Animar la entrada del sobre
        setTimeout(() => {
            envelope.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            envelope.style.opacity = '1';
            envelope.style.transform = 'translateY(0) scale(1)';
            
            console.log('📮 Sobre restaurado con éxito');
            
            // Scroll suave hacia el sobre
            setTimeout(() => {
                envelope.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
            
        }, 100);
    }, 600);
}

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Función para reiniciar el estado de la carta
 * Útil para debugging o reset manual
 */
function resetLetterState() {
    console.log('🔄 Reiniciando estado de la carta...');
    isLetterOpen = false;
    
    // Resetear estilos del sobre
    envelope.style.display = 'block';
    envelope.style.opacity = '1';
    envelope.style.transform = 'translateY(0) scale(1)';
    envelope.style.transition = '';
    
    // Resetear estilos de la carta
    cartaContent.style.display = 'none';
    cartaContent.style.opacity = '0';
    cartaContent.style.transform = 'translateY(30px)';
    cartaContent.style.transition = '';
    
    console.log('✅ Estado reiniciado correctamente');
}

/**
 * Función para verificar el estado actual
 * Útil para debugging
 */
function getLetterState() {
    return {
        isOpen: isLetterOpen,
        envelopeVisible: envelope.style.display !== 'none',
        cartaVisible: cartaContent.style.display !== 'none'
    };
}

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
// Hacer las funciones disponibles globalmente para debugging
window.letterSystem = {
    open: openLetter,
    close: closeLetter,
    reset: resetLetterState,
    getState: getLetterState
};

console.log('💕 Sistema de carta interactiva cargado completamente');