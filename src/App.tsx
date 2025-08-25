import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HypnobirthingForm from './components/HypnobirthingForm';
import Coaching from './components/Coaching';
import DueDateCalculator from './components/DueDateCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
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
