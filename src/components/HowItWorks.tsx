
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up and create your worker or recruiter profile with skills, experience, and location.',
    forWorker: true,
    forRecruiter: true
  },
  {
    number: '02',
    title: 'Post or Find Jobs',
    description: 'Recruiters post jobs with details while workers search for relevant opportunities.',
    forWorker: true,
    forRecruiter: true
  },
  {
    number: '03',
    title: 'Connect & Communicate',
    description: 'Use the in-app messaging to discuss details, negotiate terms, and confirm arrangements.',
    forWorker: true,
    forRecruiter: true
  },
  {
    number: '04',
    title: 'Complete Work & Get Paid',
    description: 'Finish the job and receive payment directly from the recruiter.',
    forWorker: true,
    forRecruiter: false
  },
  {
    number: '04',
    title: 'Review & Pay Worker',
    description: 'Review worker performance and make direct payment for completed work.',
    forWorker: false,
    forRecruiter: true
  },
  {
    number: '05',
    title: 'Rate Your Experience',
    description: 'Leave ratings and reviews to build community trust and improve future matches.',
    forWorker: true,
    forRecruiter: true
  }
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = React.useState('worker');
  
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">How WorkZap Works</h2>
          <p className="text-gray-600">
            Whether you're looking for work or hiring talent, our platform makes the process simple and efficient.
          </p>
          
          <div className="flex justify-center mt-8 bg-workzap-light-gray rounded-full p-1 max-w-md mx-auto">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-1 ${
                activeTab === 'worker' 
                  ? 'bg-white text-workzap-blue shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('worker')}
            >
              For Workers
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-1 ${
                activeTab === 'recruiter' 
                  ? 'bg-white text-workzap-blue shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('recruiter')}
            >
              For Recruiters
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {steps
            .filter(step => 
              (activeTab === 'worker' && step.forWorker) || 
              (activeTab === 'recruiter' && step.forRecruiter)
            )
            .map((step, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="text-sm font-semibold text-workzap-blue mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-workzap-blue hover:bg-workzap-blue/90" size="lg" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
