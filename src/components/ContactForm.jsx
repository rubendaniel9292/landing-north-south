import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Turnstile from 'react-turnstile';

const ContactForm = () => {
    // Configuración de Turnstile
    const siteKey = import.meta.env.VITE_REACT_APP_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

    // Debug: verificar que la sitekey se está cargando
    console.log('Turnstile Site Key:', siteKey);

    const [formData, setFormData] = useState({
        'Nombre completo': '',
        'Correo electrónico': '',
        'Teléfono': '',
        'Tipo de seguro': '',
        'Mensaje adicional': ''
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false,
        message: ''
    });

    const [turnstileToken, setTurnstileToken] = useState('');
    const [consentimiento, setConsentimiento] = useState(false);

    // Configurar Axios
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que el consentimiento esté marcado
        if (!consentimiento) {
            Swal.fire({
                title: 'Consentimiento requerido',
                text: 'Debes autorizar el tratamiento de tus datos personales para continuar.',
                icon: 'warning',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#f59e0b'
            });
            return;
        }

        // Validar que Turnstile esté verificado
        if (!turnstileToken) {
            Swal.fire({
                title: 'Verificación requerida',
                text: 'Por favor completa la verificación de seguridad antes de enviar el formulario.',
                icon: 'warning',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#f59e0b'
            });
            return;
        }

        setStatus({ loading: true, success: false, error: false, message: '' });

        try {
            const response = await axios.post('https://formsubmit.co/ajax/rubenrivas_17@hotmail.com', {
                ...formData,
                '_subject': 'Nueva cotización de seguro desde tu landing',
                '_captcha': 'false',
                '_template': 'table',
                'turnstile-token': turnstileToken // Enviar el token de verificación
            });

            console.log('Response:', response);

            setStatus({
                loading: false,
                success: true,
                error: false,
                message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
            });

            // Mostrar SweetAlert de éxito
            Swal.fire({
                title: '¡Éxito!',
                text: 'Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.',
                icon: 'success',
                confirmButtonText: 'Perfecto',
                confirmButtonColor: '#f59e0b',
                timer: 5000,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });

            // Limpiar formulario después de 5 segundos
            setTimeout(() => {
                setFormData({
                    'Nombre completo': '',
                    'Correo electrónico': '',
                    'Teléfono': '',
                    'Tipo de seguro': '',
                    'Mensaje adicional': ''
                });
                setStatus({ loading: false, success: false, error: false, message: '' });
                setTurnstileToken(''); // Limpiar token de Turnstile
                setConsentimiento(false); // Limpiar consentimiento
            }, 5000);

        } catch (error) {
            console.error('Error:', error);
            setStatus({
                loading: false,
                success: false,
                error: true,
                message: 'Error al enviar el mensaje. Por favor intenta nuevamente.'
            });

            // Mostrar SweetAlert de error
            Swal.fire({
                title: 'Error',
                text: 'No se pudo enviar tu mensaje. Por favor verifica tu conexión e intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                confirmButtonColor: '#ef4444',
                timer: 5000,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        }
    };

    // Iconos como componentes JSX
    const CheckIcon = () => (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
    );

    const ArrowIcon = () => (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L19.69 12 12.97 5.28a.75.75 0 010-1.06zm-4.5 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L15.19 12 8.47 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-3xl blur-2xl"></div>

            <form
                className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl space-y-6"
                onSubmit={handleSubmit}
            >
                {/* Mensaje de estado */}
                {status.message && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${status.success
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                        {status.success && <CheckIcon />}
                        <span className="font-medium">{status.message}</span>
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        name="Nombre completo"
                        type="text"
                        placeholder="Juan Pérez"
                        value={formData['Nombre completo']}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        required
                        disabled={status.loading}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="Correo electrónico"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData['Correo electrónico']}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        required
                        disabled={status.loading}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Teléfono
                    </label>
                    <input
                        id="phone"
                        name="Teléfono"
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        value={formData['Teléfono']}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        required
                        disabled={status.loading}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="insurance-type" className="block text-sm font-medium text-gray-700">
                        Tipo de seguro
                    </label>
                    <select
                        id="insurance-type"
                        name="Tipo de seguro"
                        value={formData['Tipo de seguro']}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
                        required
                        disabled={status.loading}
                    >
                        <option value selected disabled>Selecciona un tipo</option>
                        <option value="vida">Seguro de Vida</option>
                        <option value="salud">Seguro de Salud</option>
                        <option value="vehiculo">Seguro Vehicular</option>
                        <option value="ahorro">Seguro de Ahorro</option>
                        <option value="hogar">Seguro de Hogar</option>
                        <option value="empresarial">Seguro Empresarial</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Mensaje adicional (opcional)
                    </label>
                    <textarea
                        id="message"
                        name="Mensaje adicional"
                        rows="4"
                        placeholder="Compártenos detalles adicionales sobre tus necesidades..."
                        value={formData['Mensaje adicional']}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                        disabled={status.loading}
                    />
                </div>

                {/* Checkbox de Consentimiento */}
                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        id="consentimiento"
                        name="consentimiento"
                        checked={consentimiento}
                        onChange={(e) => setConsentimiento(e.target.checked)}
                        className="mt-1 h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        required
                        disabled={status.loading}
                    />
                    <label htmlFor="consentimiento" className="text-sm text-gray-700 leading-relaxed">
                        Autorizo el tratamiento de mis datos personales para fines de contacto y asesoría en seguros,
                        conforme a la <a href="/politica-privacidad" target="_blank" className="text-amber-600 hover:text-amber-800 underline">Política de Privacidad</a>.
                    </label>
                </div>

                {/* Turnstile Security Verification */}
                <div id="turnstile-container" className="my-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Verificación de seguridad
                    </label>
                    <Turnstile
                        sitekey={siteKey}
                        onVerify={(token) => setTurnstileToken(token)}
                        onExpire={() => setTurnstileToken("")}
                        onError={() => setTurnstileToken("")}
                        theme="light"
                        size="normal"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status.loading || !turnstileToken || !consentimiento}
                    className={`w-full h-12 border-0 text-base rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${status.loading || !turnstileToken || !consentimiento
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'gradient-gold text-white hover:shadow-lg'
                        }`}
                >
                    {status.loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Enviando...
                        </>
                    ) : (
                        <>
                            Obtener Cotización
                            <div className="w-7 h-7 text-white group-hover:translate-x-1 transition-transform">
                                <ArrowIcon />
                            </div>
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-gray-500">
                    Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.
                </p>
            </form>
        </div>
    );
};

export default ContactForm;