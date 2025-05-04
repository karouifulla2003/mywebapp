"use client"
import Link from "next/link"
import Menu from "./Menu"
import NavIcons from "./NavIcons"
import SearchBar from "../filters/SearchBar"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { FaGlobe, FaChevronDown, FaCheck } from "react-icons/fa"

// تعريف نوع اللغة
interface Language {
  code: string
  name: string
}

const NavBar = () => {
  const pathname = usePathname()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>({ 
    code: "en", 
    name: "English"
  })
  
  // الروابط التي عند الضغط عليها سيتم إخفاء القسم السفلي
  const hideBottomSectionPaths = [
    "/offers",
    "/about",
    "/sell",
    "/help",
    "/contact"
  ]

  // تحديد ما إذا كان يجب إظهار القسم السفلي بناءً على المسار الحالي
  const shouldShowBottomSection = !hideBottomSectionPaths.includes(pathname)

  // قائمة جميع الروابط الرئيسية
  const mainLinks = [
    { name: "Home", path: "/", color: "#FDA210" },
    { name: "Explore", path: "/explore", color: "#3FA878" },
    { name: "Offers", path: "/offers", color: "#FF4E88" },
    { name: "About Us", path: "/about", color: "#3FA878" },
    { name: "Sell", path: "/sell", color: "#FF4E88" },
    { name: "Help", path: "/help", color: "#3FA878" },
    { name: "Contact", path: "/contact_us", color: "#FF4E88" }
  ]

  // قائمة اللغات المتاحة
  const languages: Language[] = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ru", name: "Русский" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "tr", name: "Türkçe" }
  ]

  // دالة لتبديل حالة قائمة اللغات
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  // دالة لتغيير اللغة المختارة
  const selectLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    setIsLanguageDropdownOpen(false)
    // هنا يمكنك إضافة منطق تغيير اللغة في التطبيق
  }

  return (
    <div className="w-full bg-white shadow-sm">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold bg-gradient-to-r from-[#FDA210] via-[#3FA878] to-[#FF4E88] bg-clip-text text-transparent">
              Revibe
            </span>
          </Link>
          <div className="p-2 rounded-full bg-gradient-to-r from-[#FDA210] to-[#3FA878]">
            <Menu />
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Top Section */}
        <div className="bg-white border-b border-gray-100 py-4">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-7">
              {/* Login and Language options - ON LEFT */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center pr-4 border-r border-gray-200">
                  <span className="text-gray-500 mr-1 text-xs font-semibold">Hi,</span>
                  <Link 
                    href="/auth/login" 
                    className="text-sm text-gray-700 font-medium hover:text-[#3FA878] transition-colors duration-200"
                  >
                    Log in
                  </Link>
                </div>
                
                {/* Language Dropdown */}
                <div className="relative">
                  <button 
                    onClick={toggleLanguageDropdown}
                    className="flex items-center text-gray-700 hover:text-[#3FA878] transition-colors duration-200"
                  >
                    <FaGlobe className="mr-2 text-[#3FA878]" />
                    <span className="text-sm">{currentLanguage.name}</span>
                    <FaChevronDown className="h-3 w-3 ml-1" />
                  </button>
                  
                  {isLanguageDropdownOpen && (
                    <div className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-md border border-gray-200 z-10 
                      transition-all duration-200 ease-out ${isLanguageDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                      <div className="py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => selectLanguage(lang)}
                            className={`flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150
                              ${currentLanguage.code === lang.code ? 'bg-gray-50 font-medium' : ''}`}
                          >
                            {lang.name}
                            {currentLanguage.code === lang.code && (
                              <FaCheck className="ml-auto text-[#3FA878]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Icons and Links - ON RIGHT */}
              <div className="flex items-center">
                <div className="flex space-x-6 ml-16">
                  {mainLinks.map((item) => (
                    <Link
                      href={item.path}
                      key={item.name}
                      className="relative px-2 py-1 group"
                      prefetch={false}
                    >
                      <span className={`text-sm font-medium group-hover:text-[#FDA210] transition-colors duration-200
                        ${pathname === item.path ? "font-bold text-[#FDA210]" : "text-gray-700"}`}>
                        {item.name}
                      </span>
                      <span
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-current transform -translate-x-1/2 group-hover:w-full transition-all duration-300"
                        style={{ color: item.color }}
                      ></span>
                    </Link>
                  ))}
                </div>
                <div className="pl-10 flex items-center ml-10">
                  <NavIcons />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - يظهر فقط إذا كان المسار الحالي ليس من ضمن المسارات المحددة */}
        {shouldShowBottomSection && (
          <div className="bg-white py-4">
            <div className="container mx-auto px-36 flex items-center justify-between">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FDA210] via-[#3FA878] to-[#FF4E88] bg-clip-text text-transparent">
                  Revibe
                </span>
              </Link>

              <div className="w-full max-w-2xl mx-8">
                <SearchBar />
              </div>

              <div className="flex-shrink-0 w-24"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar