import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service – Sara Foundation Africa</title>
        <meta name="description" content="Terms of service for Sara Foundation Africa's website and programs." />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">Last updated: March 2026</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the Sara Foundation Africa website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Use of Website</h2>
            <p>This website is provided for informational purposes about Sara Foundation Africa's programs and initiatives. You agree to use the website only for lawful purposes and in a manner that does not infringe on others' rights.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and graphics, is the property of Sara Foundation Africa and is protected by copyright and intellectual property laws.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. User Submissions</h2>
            <p>When you submit information through our contact forms or newsletter signup, you grant us permission to use that information as described in our Privacy Policy.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Donations</h2>
            <p>All donations made to Sara Foundation Africa are voluntary. We strive to use all donations in accordance with our stated mission and programs.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Limitation of Liability</h2>
            <p>Sara Foundation Africa shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. External Links</h2>
            <p>Our website may contain links to external sites. We are not responsible for the content or practices of these third-party websites.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">9. Contact</h2>
            <p>For questions about these terms, contact us at info@sarafoundationafrica.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
