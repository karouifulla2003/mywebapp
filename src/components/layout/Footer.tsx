import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
          <span className=" text-2xl font-bold bg-gradient-to-r from-[#FDA210] via-[#3FA878] to-[#FF4E88] bg-clip-text text-transparent">
              Revibe
            </span>
          </Link>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore architecto optio provident.
          </p>
          <span className="font-semibold text-gray-800">heeo@com</span>
          <span className="font-semibold text-gray-800">0793231815</span>
          <div className="flex gap-6">
            <Image
              src="/facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              className="hover:opacity-70 transition-opacity"
            />
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={20}
              height={20}
              className="hover:opacity-70 transition-opacity"
            />
            <Image
              src="/youtube.png"
              alt="YouTube"
              width={20}
              height={20}
              className="hover:opacity-70 transition-opacity"
            />
            <Image
              src="/pinterest.png"
              alt="Pinterest"
              width={20}
              height={20}
              className="hover:opacity-70 transition-opacity"
            />
            <Image
              src="/x.png"
              alt="X"
              width={20}
              height={20}
              className="hover:opacity-70 transition-opacity"
            />
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg text-gray-800">COMPANY</h1>
            <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
              About Us
            </Link>
            <Link href="/careers" className="text-gray-600 hover:text-gray-800 transition-colors">
              Careers
            </Link>
            <Link href="/affiliates" className="text-gray-600 hover:text-gray-800 transition-colors">
              Affiliates
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-800 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg text-gray-800">SUPPORT</h1>
            <Link href="/faq" className="text-gray-600 hover:text-gray-800 transition-colors">
              FAQ
            </Link>
            <Link href="/shipping" className="text-gray-600 hover:text-gray-800 transition-colors">
              Shipping
            </Link>
            <Link href="/returns" className="text-gray-600 hover:text-gray-800 transition-colors">
              Returns
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-800 transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg text-gray-800">RESOURCES</h1>
            <Link href="/style-guide" className="text-gray-600 hover:text-gray-800 transition-colors">
              Style Guide
            </Link>
            <Link href="/licensing" className="text-gray-600 hover:text-gray-800 transition-colors">
              Licensing
            </Link>
            <Link href="/changelog" className="text-gray-600 hover:text-gray-800 transition-colors">
              Changelog
            </Link>
            <Link href="/contributing" className="text-gray-600 hover:text-gray-800 transition-colors">
              Contributing
            </Link>
            <Link href="/404" className="text-gray-600 hover:text-gray-800 transition-colors">
              404 Page
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg text-gray-800">SUBSCRIBE</h1>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis.
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4 border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
            />
            <button className="w-1/4 bg-Revibe text-white hover:bg-orange-600 transition-colors">
              JOIN
            </button>
          </div>
          <span className="font-semibold text-gray-800">Secure Payments</span>
          <div className="flex justify-between">
            <Image src="/discover.png" alt="Discover" width={40} height={20} />
            <Image src="/skrill.png" alt="Skrill" width={40} height={20} />
            <Image src="/paypal.png" alt="PayPal" width={40} height={20} />
            <Image src="/mastercard.png" alt="Mastercard" width={40} height={20} />
            <Image src="/visa.png" alt="Visa" width={40} height={20} />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-16 border-t border-gray-200 pt-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Revibe. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;