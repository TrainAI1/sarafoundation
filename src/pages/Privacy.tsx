import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy – Sara Foundation Africa</title>
        <meta name="description" content="Sara Foundation Africa's privacy policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">Last updated: March 2026</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly, including your name, email address, and any messages submitted through our contact forms. We also collect newsletter subscription emails when you opt in.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. How We Use Your Information</h2>
            <p>We use your information to respond to inquiries, send newsletters you've subscribed to, improve our programs and services, and communicate updates about Sara Foundation Africa's initiatives.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Data Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners who assist us in operating our website and programs, subject to confidentiality agreements.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Cookies</h2>
            <p>Our website may use cookies to enhance your browsing experience. You can configure your browser to refuse cookies, though this may limit some functionality.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You may unsubscribe from our newsletter at any time. To exercise these rights, contact us at info@sarafoundationafrica.com.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Contact Us</h2>
            <p>If you have questions about this privacy policy, please contact us at info@sarafoundationafrica.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
