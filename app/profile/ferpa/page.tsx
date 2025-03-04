'use client';

import React from 'react';
import { Shield, Users, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import type { AuthorizedPerson } from '@/types/ferpa';

const mockData: AuthorizedPerson[] = [
  {
    id: '1',
    name: 'Martha Stewart',
    relation: 'Mother',
    email: 'martha@email.com',
    phone: '(407) 555-0123',
    permissions: {
      grades: true,
      financialAid: true,
      enrollmentStatus: true,
      classSchedule: false,
      academicStanding: true,
      disciplinaryRecords: false,
      healthRecords: false
    },
    lastUpdated: '2024-02-15',
    expirationDate: '2025-02-15'
  },
  {
    id: '2',
    name: 'Robert Stewart',
    relation: 'Father',
    email: 'robert@email.com',
    phone: '(407) 555-0124',
    permissions: {
      grades: true,
      financialAid: false,
      enrollmentStatus: true,
      classSchedule: true,
      academicStanding: true,
      disciplinaryRecords: false,
      healthRecords: false
    },
    lastUpdated: '2024-02-15',
    expirationDate: '2025-02-15'
  }
];

const AuthorizedPersonCard = ({ person }: { person: AuthorizedPerson }) => (
  <div className="bg-white border border-yellow-100 rounded-lg p-4 mb-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <p className="text-sm text-gray-600">{person.relation}</p>
        <p className="text-sm text-gray-500">{person.email}</p>
        <div className="mt-2 text-xs text-gray-500 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          Expires: {person.expirationDate}
        </div>
      </div>
      <Link 
        href={`/profile/ferpa/edit/${person.id}`}
        className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200"
      >
        Edit Access
      </Link>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2">
      {Object.entries(person.permissions).map(([key, value]) => (
        <div key={key} className="flex items-center text-sm">
          <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
        </div>
      ))}
    </div>
  </div>
);

const FERPAViewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FERPA Access Management</h1>
          <Link
            href="/profile/ferpa/add"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-lg font-semibold"
          >
            Add New Person
          </Link>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-600 w-5 h-5 mr-2 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800">Important Notice</h3>
              <p className="text-sm text-yellow-700">
                Authorized persons will have access to your selected educational records for one year.
                You can modify or revoke access at any time.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {mockData.map((person) => (
            <AuthorizedPersonCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FERPAViewPage;