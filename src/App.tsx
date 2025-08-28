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
import { 
  websiteSchema, 
  localBusinessSchema, 
  personSchema,
  professionalServiceSchema,
  generateBreadcrumbSchema 
} from './utils/schemas';

function App() {
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
  )
}

export default App
