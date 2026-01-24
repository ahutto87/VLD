import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from './SEOHead';

const PrivacyPolicy: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <>
      <SEOHead pageKey="privacy" />
      <div className="min-h-screen" style={{ backgroundColor: '#FAF3E3' }}>
        {/* Header */}
        <header className="py-6 px-4" style={{ backgroundColor: '#FBEBD2' }}>
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-gray-700 hover:text-coral-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isSpanish ? 'Volver al Inicio' : 'Back to Home'}</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="card">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
            </h1>

            <p className="text-sm text-gray-500 mb-8">
              {isSpanish ? 'Última actualización: 21 de enero de 2026' : 'Last Updated: January 21, 2026'}
            </p>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '1. Información que Recopilamos' : '1. Information We Collect'}
                </h2>
                <p>
                  {isSpanish
                    ? 'Vida Buena Vibra LLC ("nosotros" o "nuestro"), operando como Vio La Doula, recopila información que usted nos proporciona directamente, como su nombre, dirección de correo electrónico y número de teléfono cuando completa un formulario de contacto o se inscribe en clases de HypnoBirthing.'
                    : 'Vida Buena Vibra LLC ("we," "us," or "our"), operating as Vio La Doula, collects information you provide directly to us, such as your name, email address, and phone number when you fill out a contact form or sign up for hypnobirthing classes.'}
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '2. Cómo Usamos su Información' : '2. How We Use Your Information'}
                </h2>
                <p className="mb-3">
                  {isSpanish
                    ? 'Usamos la información recopilada para:'
                    : 'We use the information collected to:'}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    {isSpanish
                      ? 'Responder a consultas sobre servicios de doula.'
                      : 'Respond to inquiries about doula services.'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Coordinar inscripciones y horarios de clases.'
                      : 'Coordinate class registrations and schedules.'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Enviar actualizaciones comerciales ocasionales o contenido educativo (si ha optado por recibirlos).'
                      : 'Send occasional business updates or educational content (if opted-in).'}
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '3. Protección de Datos' : '3. Data Protection'}
                </h2>
                <p>
                  {isSpanish
                    ? 'Tomamos medidas razonables para proteger su información personal contra acceso o divulgación no autorizados. No vendemos ni alquilamos sus datos personales a terceros.'
                    : 'We take reasonable measures to protect your personal information from unauthorized access or disclosure. We do not sell or rent your personal data to third parties.'}
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '4. Servicios de Terceros' : '4. Third-Party Services'}
                </h2>
                <p>
                  {isSpanish
                    ? 'Podemos utilizar proveedores de servicios de terceros (como alojamiento web o procesadores de pagos) para ayudar a operar nuestro negocio. Estos proveedores tienen acceso a su información solo para realizar tareas específicas en nuestro nombre y están obligados a no divulgarla.'
                    : 'We may use third-party service providers (such as website hosting or payment processors) to help operate our business. These providers have access to your info only to perform specific tasks on our behalf and are obligated not to disclose it.'}
                </p>
              </section>

              {/* Section 5 - Contact */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '5. Contáctenos' : '5. Contact Us'}
                </h2>
                <p>
                  {isSpanish
                    ? 'Si tiene preguntas sobre esta política, por favor contáctenos en violadoula@gmail.com'
                    : 'If you have questions regarding this policy, please contact us at violadoula@gmail.com'}
                </p>
              </section>

              {/* Contact Information */}
              <section className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {isSpanish ? 'Información de Contacto' : 'Contact Information'}
                </h2>
                <p>
                  <strong>Vida Buena Vibra LLC</strong><br />
                  dba Vio La Doula<br />
                  {isSpanish ? 'Correo electrónico' : 'Email'}: violadoula@gmail.com<br />
                  {isSpanish ? 'Teléfono' : 'Phone'}: (346) 380-8476
                </p>
              </section>
            </div>
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="py-6 px-4 text-center" style={{ backgroundColor: '#D17D44', color: '#FAF3E3' }}>
          <p className="text-sm">
            {t('footer.copyright')}
          </p>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;
