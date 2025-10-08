import { useState } from "react";

// Función para scroll suave personalizado con animación más lenta
const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId.replace('#', ''));
    if (element) {
        const navHeight = 80; // Altura del navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        const duration = 1200; // Duración en milisegundos (más lento)
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Función de easing para suavizar la animación
            const easeInOutCubic = progress => progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
            
            const run = startPosition + distance * easeInOutCubic(progress);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
};

// Componentes de iconos
const BarsIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
        <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
    </svg>
);

const XIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
        <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z" />
    </svg>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // 📋 Opciones de menú en formato de objeto
    const menuItems = [
        { href: "#home", label: "Inicio" },
        { href: "#insurance", label: "Seguros" },
        { href: "#companies", label: "Compañías" },
        //{ href: "/about", label: "Nosotros" },
        { href: "#contact", label: "Contacto" },

    ];

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                            <img
                                src="/images/logonorthsouth.jpg"
                                alt="National North South"
                                className="h-full w-full object-contain rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-title text-base sm:text-lg font-bold text-gray-800 leading-tight">
                                National North South
                            </span>
                            <span className="font-body text-xs sm:text-sm text-gray-600 leading-tight">
                                Asesora de seguros
                            </span>
                        </div>
                    </div>


                    <nav className="hidden md:flex items-center gap-6">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    smoothScrollTo(item.href);
                                }}
                                className="font-subtitle text-lg font-bold hover:text-amber-600 transition-colors cursor-pointer bg-transparent border-none"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                smoothScrollTo('#contact');
                            }}
                            className="hidden sm:inline-flex gradient-gold text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors font-subtitle font-semibold cursor-pointer border-none"
                        >
                            Cotizar ahora
                        </button>
                        <button
                            className="md:hidden text-gray-700 p-3 rounded-md hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <XIcon /> : <BarsIcon />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} border-t border-gray-200 py-4`}>
                    <div className="space-y-2">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    smoothScrollTo(item.href);
                                    setIsOpen(false);
                                }}
                                className="block w-full text-center text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md transition-colors cursor-pointer bg-transparent border-none font-subtitle"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                smoothScrollTo('#contact');
                                setIsOpen(false);
                            }}
                            className="w-full mt-4 gradient-gold text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors font-subtitle font-semibold cursor-pointer border-none"
                        >
                            Cotizar ahora
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;