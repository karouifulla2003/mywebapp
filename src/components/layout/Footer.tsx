import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gradient-to-b from-gray-50 to-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24">
        {/* LEFT - BRAND SECTION */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#FDA210] via-[#3FA878] to-[#FF4E88] bg-clip-text text-transparent hover:opacity-90 transition-opacity">
              Revibe
            </span>
          </Link>
          <p className="text-gray-600 leading-relaxed">
          Revibe-Where second-hand finds a new spark. Shop smart, live stylish.
          </p>
          <Link href="mailto:hello@revibe.com" className="font-semibold text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-gray-500">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
            </svg>
            hello@revibe.com
          </Link>
          <Link href="tel:+10793231815" className="font-semibold text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-gray-500">
              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
            07-93-23-18-15
          </Link>
          <div className="flex gap-4 mt-2">
            <Link href="/facebook" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
              <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
            </Link>
            <Link href="/instagram" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
              <Image src="/instagram.png" alt="Instagram" width={20} height={20} />
            </Link>
            <Link href="/youtube" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
              <Image src="/youtube.png" alt="YouTube" width={20} height={20} />
            </Link>
            <Link href="/pinterest" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
              <Image src="/pinterest.png" alt="Pinterest" width={20} height={20} />
            </Link>
            <Link href="/twitter" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
              <Image src="/x.png" alt="X" width={20} height={20} />
            </Link>
          </div>
        </div>

        {/* CENTER - LINKS SECTIONS */}
        <div className="hidden lg:flex justify-between w-1/2">
          {/* COMPANY LINKS */}
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg text-gray-800 mb-1 uppercase">Company</h3>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              About Us
            </Link>
            <Link href="/careers" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Careers
            </Link>
            <Link href="/vision" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Our vision 
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Blog
            </Link>
            <Link href="/contact_us" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Contact Us
            </Link>
          </div>
          
          {/* SUPPORT LINKS */}
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg text-gray-800 mb-1 uppercase">Support</h3>
            <Link href="/faqs" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              FAQ
            </Link>
            <Link href="/rates" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Shipping
            </Link>
            <Link href="/returns" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Returns
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Terms of Service
            </Link>
          </div>
          
          {/* RESOURCES LINKS */}
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg text-gray-800 mb-1 uppercase">Resources</h3>
            <Link href="/style-guide" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Style Guide
            </Link>
            <Link href="/licensing" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Licensing
            </Link>
            <Link href="/changelog" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Changelog
            </Link>
            <Link href="/contributing" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              Contributing
            </Link>
            <Link href="/404" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
              404 Page
            </Link>
          </div>
        </div>

        {/* MOBILE ACCORDION NAVIGATION (visible on small screens) */}
        <div className="flex flex-col gap-6 lg:hidden">
          <details className="group border-b pb-2">
            <summary className="flex justify-between items-center cursor-pointer font-bold text-lg text-gray-800 uppercase">
              Company
              <span className="text-gray-500 group-open:rotate-180 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </span>
            </summary>
            <div className="mt-3 flex flex-col gap-3 pl-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">About Us</Link>
              <Link href="/careers" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Careers</Link>
              <Link href="/vision" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">vision</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Blog</Link>
              <Link href="/contact_us" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Contact Us</Link>
            </div>
          </details>
          
          <details className="group border-b pb-2">
            <summary className="flex justify-between items-center cursor-pointer font-bold text-lg text-gray-800 uppercase">
              Support
              <span className="text-gray-500 group-open:rotate-180 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </span>
            </summary>
            <div className="mt-3 flex flex-col gap-3 pl-4">
              <Link href="/faqs" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">FAQ</Link>
              <Link href="/rates" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Shipping</Link>
              <Link href="/returns" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Returns</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Terms of Service</Link>
            </div>
          </details>
          
          <details className="group border-b pb-2">
            <summary className="flex justify-between items-center cursor-pointer font-bold text-lg text-gray-800 uppercase">
              Resources
              <span className="text-gray-500 group-open:rotate-180 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </span>
            </summary>
            <div className="mt-3 flex flex-col gap-3 pl-4">
              <Link href="/style-guide" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Style Guide</Link>
              <Link href="/licensing" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Licensing</Link>
              <Link href="/changelog" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Changelog</Link>
              <Link href="/contributing" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">Contributing</Link>
              <Link href="/404" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">404 Page</Link>
            </div>
          </details>
        </div>

        {/* RIGHT - NEWSLETTER SECTION */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
          <h3 className="font-bold text-lg text-gray-800 uppercase">Subscribe</h3>
          <p className="text-gray-600 leading-relaxed">
            Stay updated with our latest products, offers, and news by joining our newsletter.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="p-3 flex-grow border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              required
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-[#FDA210] to-[#FF4E88] text-white font-medium py-3 px-6 rounded-r hover:opacity-90 transition-opacity">
              JOIN
            </button>
          </form>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-green-600">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z"/>
              </svg>
              Secure Payments
            </h4>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link href="/payment/discover" className="hover:opacity-80 transition-opacity">
                <Image src="/discover.png" alt="Discover" width={40} height={24} className="h-6 w-auto" />
              </Link>
              <Link href="/payment/skrill" className="hover:opacity-80 transition-opacity">
                <Image src="/skrill.png" alt="Skrill" width={40} height={24} className="h-6 w-auto" />
              </Link>
              <Link href="/payment/paypal" className="hover:opacity-80 transition-opacity">
                <Image src="/paypal.png" alt="PayPal" width={40} height={24} className="h-6 w-auto" />
              </Link>
              <Link href="/payment/mastercard" className="hover:opacity-80 transition-opacity">
                <Image src="/mastercard.png" alt="Mastercard" width={40} height={24} className="h-6 w-auto" />
              </Link>
              <Link href="/payment/visa" className="hover:opacity-80 transition-opacity">
                <Image src="/visa.png" alt="Visa" width={40} height={24} className="h-6 w-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM - COPYRIGHT SECTION */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Revibe. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-800 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-800 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-gray-800 transition-colors">Cookies</Link>
            <Link href="/sitemap" className="hover:text-gray-800 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;