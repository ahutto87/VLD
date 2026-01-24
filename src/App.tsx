import { Routes, Route } from 'react-router-dom';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HypnobirthingForm from './components/HypnobirthingForm';
import Coaching from './components/Coaching';
import DueDateCalculator from './components/DueDateCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import {
  websiteSchema,
  localBusinessSchema,
  personSchema,
  professionalServiceSchema,
  generateBreadcrumbSchema
} from './utils/schemas';

// Homepage component with all sections
function HomePage() {
  // Generate structured data for the homepage
  const structuredData = [
    websiteSchema,
    localBusinessSchema,
    personSchema,
    professionalServiceSchema,
    generateBreadcrumbSchema(['home'], 'en') // Will be dynamic with routing
  ];

  return (
    <div className="min-h-screen">
      {/* SEO Head with structured data for homepage */}
      <SEOHead
        pageKey="home"
        structuredData={structuredData}
      />

      <Header />
      <Hero />
      <About />
      <Services />
      <HypnobirthingForm />
      <Coaching />
      <DueDateCalculator />
      <Contact />
      <Footer />
      {/* Additional sections: Blog will be added next */}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App
