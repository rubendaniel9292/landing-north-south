import { useState, useEffect, useRef } from 'react';

// 🎨 SISTEMA DE ICONOS INTEGRADO
// Objeto que contiene todos los iconos SVG disponibles para los contadores
// Cada icono es una función que retorna un elemento SVG con estilos consistentes
const IconComponents = {
    shield: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className="w-full h-full">
            <path d="M320 64C324.6 64 329.2 65 333.4 66.9L521.8 146.8C543.8 156.1 560.2 177.8 560.1 204C559.6 303.2 518.8 484.7 346.5 567.2C329.8 575.2 310.4 575.2 293.7 567.2C121.3 484.7 80.6 303.2 80.1 204C80 177.8 96.4 156.1 118.4 146.8L306.7 66.9C310.9 65 315.4 64 320 64z" />
        </svg>
    ),
    users: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className="w-full h-full">
            <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
        </svg>
    ),
    trending: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className="w-full h-full">
            <path d="M416 224C398.3 224 384 209.7 384 192C384 174.3 398.3 160 416 160L576 160C593.7 160 608 174.3 608 192L608 352C608 369.7 593.7 384 576 384C558.3 384 544 369.7 544 352L544 269.3L374.6 438.7C362.1 451.2 341.8 451.2 329.3 438.7L224 333.3L86.6 470.6C74.1 483.1 53.8 483.1 41.3 470.6C28.8 458.1 28.8 437.8 41.3 425.3L201.3 265.3C213.8 252.8 234.1 252.8 246.6 265.3L352 370.7L498.7 224L416 224z" />
        </svg>
    ),
    award: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className="w-full h-full">
            <path d="M341.9 38.1C328.5 29.9 311.6 29.9 298.2 38.1C273.8 53 258.7 57 230.1 56.4C214.4 56 199.8 64.5 192.2 78.3C178.5 103.4 167.4 114.5 142.3 128.2C128.5 135.7 120.1 150.4 120.4 166.1C121.1 194.7 117 209.8 102.1 234.2C93.9 247.6 93.9 264.5 102.1 277.9C117 302.3 121 317.4 120.4 346C120 361.7 128.5 376.3 142.3 383.9C164.4 396 175.6 406 187.4 425.4L138.7 522.5C132.8 534.4 137.6 548.8 149.4 554.7L235.4 597.7C246.9 603.4 260.9 599.1 267.1 587.9L319.9 492.8L372.7 587.9C378.9 599.1 392.9 603.5 404.4 597.7L490.4 554.7C502.3 548.8 507.1 534.4 501.1 522.5L452.5 425.3C464.2 405.9 475.5 395.9 497.6 383.8C511.4 376.3 519.8 361.6 519.5 345.9C518.8 317.3 522.9 302.2 537.8 277.8C546 264.4 546 247.5 537.8 234.1C522.9 209.7 518.9 194.6 519.5 166C519.9 150.3 511.4 135.7 497.6 128.1C472.5 114.4 461.4 103.3 447.7 78.2C440.2 64.4 425.5 56 409.8 56.3C381.2 57 366.1 52.9 341.7 38zM320 160C373 160 416 203 416 256C416 309 373 352 320 352C267 352 224 309 224 256C224 203 267 160 320 160z" />
        </svg>
    )
};

// 🎯 COMPONENTE PRINCIPAL: CONTADOR ANIMADO
// Parámetros:
// - icon: string que identifica qué icono usar (shield, users, trending, award)
// - targetValue: número final al que debe llegar el contador
// - suffix: texto que se añade al final del número (ej: "+", "%")
// - label: texto descriptivo que aparece debajo del número
// - duration: tiempo en milisegundos que tarda la animación (default: 2000ms = 2s)
const CounterCard = ({ icon, targetValue, suffix = '', label, duration = 2000 }) => {
    
    // 📊 ESTADOS DEL COMPONENTE
    const [count, setCount] = useState(0);           // Número actual que se muestra
    const [isVisible, setIsVisible] = useState(false); // Si el componente está visible en pantalla
    const cardRef = useRef(null);                    // Referencia al elemento DOM para detectar visibilidad

    // 🔍 SELECCIÓN DEL ICONO
    // Busca el icono correspondiente en IconComponents o usa 'shield' como fallback
    const IconComponent = IconComponents[icon] || IconComponents.shield;

    // 👁️ EFECTO 1: INTERSECTION OBSERVER
    // Este efecto detecta cuando el componente entra en la pantalla del usuario
    // Solo ejecuta la animación cuando el usuario puede ver el contador
    useEffect(() => {
        // Crea un observador que vigila si el elemento está visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Si el elemento está visible Y no hemos iniciado la animación
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true); // Inicia la animación
                    }
                });
            },
            { threshold: 0.3 } // Se activa cuando el 30% del elemento es visible
        );

        // Comenzar a observar el elemento
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        // Cleanup: detener observación al desmontar componente
        return () => observer.disconnect();
    }, [isVisible]);

    // 🎬 EFECTO 2: ANIMACIÓN DEL CONTADOR
    // Este efecto maneja la animación suave del número de 0 al valor objetivo
    useEffect(() => {
        // Si el componente no es visible, no hacer nada
        if (!isVisible) return;

        // Variables para la animación
        let startTime = null;        // Momento en que inicia la animación
        const startValue = 0;        // Valor inicial (siempre 0)
        const endValue = targetValue; // Valor final (prop recibida)

        // 📈 FUNCIÓN DE EASING: easeOutQuart
        // Crea una animación que empieza rápido y se desacelera al final
        // Fórmula matemática que hace que la animación se vea más natural
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        // 🔄 FUNCIÓN DE ANIMACIÓN PRINCIPAL
        // Esta función se ejecuta en cada frame de la animación
        const animate = (currentTime) => {
            // Primera vez: establecer tiempo de inicio
            if (startTime === null) startTime = currentTime;
            
            // Calcular cuánto tiempo ha pasado
            const timeElapsed = currentTime - startTime;
            
            // Calcular progreso de la animación (0 a 1)
            const progress = Math.min(timeElapsed / duration, 1);

            // Aplicar función de easing para suavizar la animación
            const easedProgress = easeOutQuart(progress);
            
            // Calcular el valor actual del contador basado en el progreso
            const currentCount = Math.floor(startValue + (endValue - startValue) * easedProgress);

            // Actualizar el estado con el nuevo valor
            setCount(currentCount);

            // Si la animación no ha terminado, continuar con el siguiente frame
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        // Iniciar la animación
        requestAnimationFrame(animate);
    }, [isVisible, targetValue, duration]); // Se re-ejecuta si cambian estos valores

    // 🎨 RENDERIZADO DEL COMPONENTE
    return (
        <div
            ref={cardRef} // Referencia para el Intersection Observer
            className="flex flex-col items-center text-center space-y-4 p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
        >
            {/* 🎯 CONTENEDOR DEL ICONO */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 text-white">
                    <IconComponent />
                </div>
            </div>
            
            {/* 📊 CONTENEDOR DEL CONTADOR Y LABEL */}
            <div className="space-y-1">
                {/* NÚMERO ANIMADO */}
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    {count.toLocaleString()}{suffix}
                    {/* toLocaleString() añade comas para separar miles (ej: 10,000) */}
                </div>
                
                {/* TEXTO DESCRIPTIVO */}
                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                    {label}
                </div>
            </div>
        </div>
    );
};

export default CounterCard;