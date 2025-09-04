import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChoose from '../components/WhyChoose';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

export default function Portal() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <CTA />
      <Footer />
      <ChatBot />
    </div>
  );
}
