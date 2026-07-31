import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#041334] text-slate-300 py-12 border-t border-[#92a417]/20 z-50">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Brand<span className="text-[#92a417]">Name</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Providing premium services and seamless experiences for all our customers and providers.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-slate-400 hover:text-[#92a417] transition-colors flex items-center gap-1 text-sm font-medium">
                <Globe className="h-4 w-4" /> Socials
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#92a417] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#92a417] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#92a417] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#92a417] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-[#92a417] transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#92a417] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#92a417] transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[#92a417]" />
                <span>123 Business Avenue, Tech City, 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#92a417]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#92a417]" />
                <span>support@brandname.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
