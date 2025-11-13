import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AirtimeForm from "@/components/AirtimeForm";
import DataBundles from "@/components/DataBundles";
import SimpleSteps from "@/components/SimpleSteps";
import SmsBundles from "@/components/SmsBundles";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProductOfTheDay from "@/components/ProductOfTheDay";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ProductOfTheDay />
      <FloatingWhatsApp />
      <main>
        <Hero />
        <Features />
        <AirtimeForm />
        <SimpleSteps />
        <DataBundles />
        <SmsBundles />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
