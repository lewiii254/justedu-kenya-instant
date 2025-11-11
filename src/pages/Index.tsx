import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AirtimeForm from "@/components/AirtimeForm";
import DataBundles from "@/components/DataBundles";
import SmsBundles from "@/components/SmsBundles";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AirtimeForm />
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
