import { Routes, Route } from 'react-router-dom';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import HypnobirthingForm from './components/HypnobirthingForm';
import Coaching from './components/Coaching';
import DueDateCalculator from './components/DueDateCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import SubscribePage from './components/SubscribePage';
import HypnobirthingClassPage from './components/HypnobirthingClassPage';
import { pagePaths } from './utils/seo';

// Homepage component with all sections
function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Structured data (JSON-LD) for the homepage lives in index.html */}
      <SEOHead pageKey="home" />

      <Header />
      <Hero />
      <About />
      <Services />
      <HypnobirthingForm />
      <Coaching />
      <Testimonials />
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
      <Route path={pagePaths.home} element={<HomePage />} />
      <Route path={pagePaths.terms} element={<TermsOfService />} />
      <Route path={pagePaths.privacy} element={<PrivacyPolicy />} />
      <Route path={pagePaths.subscribe} element={<SubscribePage />} />
      <Route path={pagePaths['hypnobirthing-class']} element={<HypnobirthingClassPage />} />
    </Routes>
  );
}

export default App
