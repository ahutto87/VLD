import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from './SEOHead';

const TermsOfService: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <>
      <SEOHead pageKey="terms" />
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
              {isSpanish ? 'Términos de Servicio' : 'Terms of Service'}
            </h1>

            <p className="text-sm text-gray-500 mb-8">
              {isSpanish ? 'Última actualización: 21 de enero de 2026' : 'Last Updated: January 21, 2026'}
            </p>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '1. Aceptación de los Términos' : '1. Acceptance of Terms'}
                </h2>
                <p>
                  {isSpanish
                    ? 'Este sitio web es propiedad y está operado por Vida Buena Vibra LLC, operando como Vio La Doula. Al acceder a este sitio web, usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables.'
                    : 'This website is owned and operated by Vida Buena Vibra LLC, doing business as Vio La Doula. By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.'}
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '2. Alcance de los Servicios' : '2. Scope of Services'}
                </h2>
                <p>
                  {isSpanish
                    ? 'La información proporcionada en este sitio web es con fines educativos e informativos relacionados con el apoyo de doula e instrucción de HypnoBirthing.'
                    : 'The information provided on this website is for educational and informational purposes regarding doula support and hypnobirthing instruction.'}
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '3. Sin Asesoramiento Médico' : '3. No Medical Advice'}
                </h2>
                <p>
                  {isSpanish
                    ? 'Vio La Doula proporciona apoyo físico, emocional e informativo no médico. Los servicios y contenidos proporcionados no sustituyen el asesoramiento médico profesional, el diagnóstico o el tratamiento. Siempre busque el consejo de su médico u otro proveedor de salud calificado con cualquier pregunta relacionada con una condición médica o embarazo.'
                    : 'Vio La Doula provides non-medical physical, emotional, and informational support. The services and content provided are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition or pregnancy.'}
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '4. Limitación de Responsabilidad' : '4. Limitation of Liability'}
                </h2>
                <p>
                  {isSpanish
                    ? 'En la máxima medida permitida por la ley, Vida Buena Vibra LLC no será responsable de ningún daño indirecto, incidental o consecuente que surja de su uso del sitio web o los servicios.'
                    : 'To the fullest extent permitted by law, Vida Buena Vibra LLC shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the website or services.'}
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {isSpanish ? '5. Propiedad Intelectual' : '5. Intellectual Property'}
                </h2>
                <p>
                  {isSpanish
                    ? 'Todo el contenido, incluyendo logotipos, texto e imágenes, es propiedad de Vida Buena Vibra LLC y no puede ser reproducido sin consentimiento expreso por escrito.'
                    : 'All content, including logos, text, and images, is the property of Vida Buena Vibra LLC and may not be reproduced without express written consent.'}
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

export default TermsOfService;
