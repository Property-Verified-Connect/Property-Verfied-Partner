"use client"
import Nav from '@/components/layout/nav';
import { Button } from '@/components/ui/button';
import inter from '@/lib/font/Inter';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function TermsAndConditionsPage() {
  const [termsData, setTermsData] = useState({
    lastUpdated: 'December 28, 2025',
    version: '1.0'
  });

  useEffect(() => {
    const storedTerms = localStorage.getItem('termsData');
    if (storedTerms) {
      try {
        setTermsData(JSON.parse(storedTerms));
      } catch (error) {
        console.error('Error parsing stored terms:', error);
      }
    }
  }, []);

  return (
    <>
      <Nav/>
      <div className={`min-h-screen w-full bg-[#CDE4F9] flex items-center justify-center p-4 ${inter.className}`}>
        <div className="bg-white rounded-lg shadow-xl mt-10 p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center whitespace-nowrap flex items-center justify-center gap-2">About Property <CircleCheck color='#2396C6'/></h2>
          <p className="text-sm text-gray-500 text-center mb-6">

          </p>
          
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">
             Property Verified is your trusted platform for comprehensive property verification and documentation services. We help buyers, sellers, and investors make informed decisions by providing accurate property records, legal verification, and detailed history reports.  Our mission is to bring transparency to property transactions and ensure that every property deal is backed by verified information and legal compliance.  
              </p>
            </section>

         <hr />

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h3>
              <p className="text-gray-700 leading-relaxed">
             Contact Us 📧 Email: upport@propertyverify.com <br /> 📞 Phone: +91 1234567890 <br />  🏢 Address: Pune, Maharashtra, India
              </p>
            </section>
          </div>

          <Link href={"/dashboard/partner"}>
            <Button className='mt-6 w-full' variant={"selectdashed"}>Go Back</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditionsPage;