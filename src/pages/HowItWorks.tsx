
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import CallToAction from '@/components/CallToAction';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">How WorkZap Works</h1>
            <p className="text-gray-600">
              Discover how our platform connects workers with recruiters and makes finding or posting jobs simple and efficient.
            </p>
          </div>
          
          <div className="mb-20">
            <HowItWorks />
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:gap-8">
              {[
                {
                  question: "How do I get paid for jobs on WorkZap?",
                  answer: "WorkZap doesn't process payments directly. Recruiters and workers agree on payment terms and methods. You can accept various payment methods including cash, digital transfers, or checks depending on what you arrange with the other party."
                },
                {
                  question: "Is WorkZap available in my area?",
                  answer: "WorkZap is available nationwide. Our location-based matching system helps you find opportunities or workers specifically in your geographical area."
                },
                {
                  question: "How does the 'Available Now' feature work?",
                  answer: "When you toggle 'Available Now' as a worker, you appear in recruiters' immediate hiring searches. This increases your visibility to recruiters looking to fill positions quickly in your area."
                },
                {
                  question: "Can I use WorkZap for volunteering?",
                  answer: "Yes! WorkZap includes a dedicated volunteer section where organizations can post volunteer opportunities and individuals can find meaningful ways to contribute to their communities."
                },
                {
                  question: "How does the rating system work?",
                  answer: "After completing jobs, both workers and recruiters can rate and review each other. These ratings help build trust and reputation within the WorkZap community."
                },
                {
                  question: "Is there a fee to use WorkZap?",
                  answer: "Basic features on WorkZap are free to use. We may offer premium features in the future with subscription options for enhanced functionality."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Platform Benefits</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-workzap-light-blue rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-workzap-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quick & Efficient</h3>
                <p className="text-gray-600">Find jobs or workers in minutes, not days. Our platform streamlines the hiring process.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-workzap-light-blue rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-workzap-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Location-Based</h3>
                <p className="text-gray-600">Find opportunities in your area, reducing commute times and connecting local communities.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-workzap-light-blue rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-workzap-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Trust & Safety</h3>
                <p className="text-gray-600">Our rating system and verification processes help ensure quality interactions and safety.</p>
              </div>
            </div>
          </div>
        </div>
        
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
