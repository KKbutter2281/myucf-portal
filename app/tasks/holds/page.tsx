'use client';

import React from 'react';
import { AlertTriangle, ExternalLink, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Hold {
  id: string;
  type: string;
  department: string;
  dateAdded: string;
  description: string;
  impact: string[];
  resolution: string;
}

const mockHolds: Hold[] = [
  {
    id: 'HD-2025-001',
    type: 'Academic Advising Hold',
    department: 'College of Sciences',
    dateAdded: '2025-02-28',
    description: 'Required academic advising session before registration',
    impact: ['Course Registration', 'Transcript Requests'],
    resolution: 'Schedule an appointment with your academic advisor'
  },
  {
    id: 'HD-2025-002',
    type: 'Financial Hold',
    department: 'Student Accounts',
    dateAdded: '2025-03-01',
    description: 'Outstanding balance on student account',
    impact: ['Course Registration', 'Graduation', 'Transcript Requests'],
    resolution: 'Pay outstanding balance or set up payment plan'
  }
];

const HoldCard = ({ hold }: { hold: Hold }) => (
  <div className="bg-white border border-yellow-100 rounded-lg p-6 mb-4">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{hold.type}</h3>
        <p className="text-sm text-gray-500">{hold.department}</p>
        <p className="text-xs text-gray-400 mt-1">Added: {hold.dateAdded}</p>
      </div>
      <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
        Active Hold
      </span>
    </div>
    
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
        <p className="text-sm text-gray-600">{hold.description}</p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-1">Impacts</h4>
        <div className="flex flex-wrap gap-2">
          {hold.impact.map((item) => (
            <span 
              key={item}
              className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-1">Resolution</h4>
        <p className="text-sm text-gray-600">{hold.resolution}</p>
      </div>

      <Link 
        href="#"
        className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
      >
        Resolve Hold <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  </div>
);

export default function HoldsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Holds</h1>
          <Link
            href="#"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-700"
          >
            View Hold History <ExternalLink className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-600 w-5 h-5 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800">Important Information</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Holds may prevent you from accessing certain university services. 
                Address them promptly to avoid disruption to your academic progress.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {mockHolds.map((hold) => (
            <HoldCard key={hold.id} hold={hold} />
          ))}
        </div>
      </div>
    </div>
  );
}