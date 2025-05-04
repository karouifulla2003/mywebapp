"use client"
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaClock, FaBuilding, FaSearch, FaFilter } from 'react-icons/fa';
import { useState } from 'react';

// Job openings data
const jobOpenings = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    description: "We're looking for a skilled React/Next.js developer to join our team.",
    postedDate: "April 15, 2025"
  },
  {
    id: 2,
    title: "UX Designer",
    type: "Part-time",
    location: "Cairo, Egypt",
    department: "Design",
    description: "Join our design team to create beautiful user experiences for our marketplace platform.",
    postedDate: "April 10, 2025"
  },
  {
    id: 3,
    title: "Backend Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    description: "Looking for a Node.js developer with experience in databases and payment systems.",
    postedDate: "April 20, 2025"
  },
  {
    id: 4,
    title: "Product Manager",
    type: "Full-time",
    location: "Dubai, UAE",
    department: "Product",
    description: "Help shape the future of our e-commerce platform with your product expertise.",
    postedDate: "April 5, 2025"
  },
  {
    id: 5,
    title: "Customer Support Specialist",
    type: "Full-time",
    location: "Remote",
    department: "Customer Success",
    description: "Provide excellent support to our global sellers and buyers community.",
    postedDate: "April 22, 2025"
  }
];

// Filter options
const departments = ["All Departments", "Engineering", "Design", "Product", "Marketing", "Customer Success"];
const locations = [
    "All Wilayas",
    "01 - Adrar",
    "02 - Chlef",
    "03 - Laghouat",
    "04 - Oum El Bouaghi",
    "05 - Batna",
    "06 - Béjaïa",
    "07 - Biskra",
    "08 - Béchar",
    "09 - Blida",
    "10 - Bouira",
    "11 - Tamanrasset",
    "12 - Tébessa",
    "13 - Tlemcen",
    "14 - Tiaret",
    "15 - Tizi Ouzou",
    "16 - Algiers",
    "17 - Djelfa",
    "18 - Jijel",
    "19 - Sétif",
    "20 - Saïda",
    "21 - Skikda",
    "22 - Sidi Bel Abbès",
    "23 - Annaba",
    "24 - Guelma",
    "25 - Constantine",
    "26 - Médéa",
    "27 - Mostaganem",
    "28 - M'Sila",
    "29 - Mascara",
    "30 - Ouargla",
    "31 - Oran",
    "32 - El Bayadh",
    "33 - Illizi",
    "34 - Bordj Bou Arréridj",
    "35 - Boumerdès",
    "36 - El Tarf",
    "37 - Tindouf",
    "38 - Tissemsilt",
    "39 - El Oued",
    "40 - Khenchela",
    "41 - Souk Ahras",
    "42 - Tipaza",
    "43 - Mila",
    "44 - Aïn Defla",
    "45 - Naâma",
    "46 - Aïn Témouchent",
    "47 - Ghardaïa",
    "48 - Relizane",
    "49 - Timimoun",
    "50 - Bordj Badji Mokhtar",
    "51 - Ouled Djellal",
    "52 - Béni Abbès",
    "53 - In Salah",
    "54 - In Guezzam",
    "55 - Touggourt",
    "56 - Djanet",
    "57 - El M'Ghair",
    "58 - El Menia"
  ];
  

// Main accent color
const accentColor = "#FDA619";

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  // Filter jobs
  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All Departments" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with background image */}
      <section className="relative bg-cover bg-center h-96">
        <Image 
          src="/hero-bg.jpg" 
          alt="Careers at Revibe"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-amber-500 opacity-90"></div>
        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Join the Revibe Team</h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto drop-shadow">
            Help us build the future of e-commerce and connect millions of buyers and sellers worldwide
          </p>
          <div className="max-w-3xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for job openings..."
              className="w-full px-12 py-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters section */}
        <section className="mb-12 bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center">
              <FaFilter className="mr-2 text-amber-500" />
              <span className="font-medium">Filter by:</span>
            </div>
            
            <div className="flex-1">
              <select 
                className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <select 
                className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-shrink-0">
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("All Departments");
                  setSelectedLocation("All Locations");
                }}
                className="px-4 py-2 border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-50 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        {/* Job count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'} Available
          </h2>
        </div>

        {/* Job listings */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white border rounded-xl p-6 hover:shadow-xl transition-shadow flex flex-col h-full"
                style={{ borderLeft: `4px solid ${accentColor}` }}
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 text-white bg-gradient-to-r from-[#FDA619] to-[#3FA878]">
                  {job.department}
                </span>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">{job.title}</h2>
                
                <div className="space-y-2 mb-4 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-amber-500" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-amber-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="mr-2 text-amber-500" />
                    <span>{job.department}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 flex-grow">{job.description}</p>
                
                <div className="mt-auto">
                  <div className="mb-4 text-sm text-gray-500">Posted: {job.postedDate}</div>
                  <Link
                    href={`/careers/apply/${job.id}`}
                    className="inline-block w-full text-center font-medium py-3 rounded-lg transition-colors text-white bg-amber-500"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-xl text-gray-500">No job openings match your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("All Departments");
                  setSelectedLocation("All Wilayas");
                }}
                className="mt-4 px-4 py-2 border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-50 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Company culture section with image */}
        <section className="mt-20 rounded-xl overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image 
                src="/culture.jpg" 
                alt="Company Culture"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 bg-gray-800">
              <h2 className="text-3xl font-bold mb-6 text-white">Our Company Culture</h2>
              <p className="text-white mb-6">
                At Revibe, we believe in creating an environment where everyone can thrive, innovate and grow. 
                Our values of collaboration, integrity, and customer focus drive everything we do.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 p-4 rounded-lg text-white">
                  <h3 className="font-semibold mb-2">Innovation</h3>
                  <p className="text-sm">We encourage new ideas and approaches to challenges</p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg text-white">
                  <h3 className="font-semibold mb-2">Diversity</h3>
                  <p className="text-sm">We thrive on different perspectives and backgrounds</p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg text-white">
                  <h3 className="font-semibold mb-2">Growth</h3>
                  <p className="text-sm">We support continuous personal and professional development</p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg text-white">
                  <h3 className="font-semibold mb-2">Balance</h3>
                  <p className="text-sm">We value work-life balance and wellbeing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="mt-20 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Why Work With <span className="text-amber-500">Revibe</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-white bg-amber-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Global Impact</h3>
              <p className="text-gray-600">Help millions of buyers and sellers connect worldwide</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-white bg-amber-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Flexible Work</h3>
              <p className="text-gray-600">Remote-friendly with flexible hours</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-white bg-amber-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Competitive Pay</h3>
              <p className="text-gray-600">Salary packages at the top of the market</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-white bg-amber-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Career Growth</h3>
              <p className="text-gray-600">Continuous learning and advancement opportunities</p>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full relative overflow-hidden mr-4">
                  <Image 
                    src="/employee2.jpg" 
                    alt="Sarah Johnson" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                  <p className="text-gray-600">Product Manager, 2 years at Revibe</p>
                </div>
              </div>
              <p className="text-gray-700 italic p-4 rounded-lg bg-gray-100">
                "Working at Revibe has been the highlight of my career. The team is incredibly talented and supportive, and I love how we're making a real difference in how people buy and sell online."
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full relative overflow-hidden mr-4">
                  <Image 
                    src="/employee1.jpg" 
                    alt="Ahmed Hassan" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Ahmed Hassan</h3>
                  <p className="text-gray-600">Senior Developer, 3 years at Revibe</p>
                </div>
              </div>
              <p className="text-gray-700 italic p-4 rounded-lg bg-gray-100">
                "The technical challenges we solve every day are fascinating, and I've grown so much as a developer. Plus, our remote-first approach means I can work from anywhere while still feeling connected to the team."
              </p>
            </div>
          </div>
        </section>

     
        {/* CTA section */}
        <section className="mt-20 text-center py-16 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0">

            <div className="absolute inset-0 bg-black opacity-70"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Don't See the Right Role?</h2>
            <p className="text-white text-xl mb-8">
              We're always looking for talented people to join our team.
            </p>
            <Link
              href="/careers/general-application"
              className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              Submit a General Application
            </Link>
          </div>
        </section>
      </div>

      {/* Simple FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-2">What is the interview process like?</h3>
              <p className="text-gray-700">Our interview process typically consists of an initial screening, a technical or skills assessment, and final interviews with the team. The entire process usually takes 2-3 weeks.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-2">Do you offer relocation assistance?</h3>
              <p className="text-gray-700">Yes, for certain roles we offer relocation packages. This will be discussed during the interview process.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-2">Do you hire internationally?</h3>
              <p className="text-gray-700">Yes! We're a global company and have team members across multiple countries. We can hire in most countries either as employees or contractors.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}