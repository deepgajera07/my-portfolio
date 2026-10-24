import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutJourney from "./components/AboutJourney/AboutJourney";
import Skills from "./components/Skills/Skills";
import OurWork from "./components/OurWork/OurWork";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import BackToTop from "./components/BackToTop/BackToTop";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <div className="portfolio-app">
      <Preloader />
      <Header
        activeSection={activeSection}
        onSectionChange={(section) => setActiveSection(section)}
      />
      <main>
        <Hero />
        <AboutJourney />
        <Skills />
        <OurWork />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

export default App;
