'use client';

import React from 'react';
import Link from 'next/link';
import { User, Shield, Key, FileText, Users, Settings } from 'lucide-react';

interface ProfileSection {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const sections: ProfileSection[] = [
  {
    title: 'Personal Information',
    description: 'Update your contact details, addresses, and basic information',
    icon: User,
    href: '/profile/personal',
    color: 'text-blue-500'
  },
  {
    title: 'FERPA Settings',
    description: 'Manage who can access your educational records',
    icon: Shield,
    href: '/profile/ferpa',
    color: 'text-green-500'
  },
  {
    title: 'Account Security',
    description: 'Change your password and manage two-factor authentication',
    icon: Key,
    href: '/profile/login',
    color: 'text-red-500'
  }
];

const ProfileCard = ({ section }: { section: ProfileSection }) => (
  <Link 
    href={section.href}
    className="block bg-white border border-yellow-200 rounded-xl shadow-lg overflow-hidden 
              hover:shadow-xl transition-all duration-200 group"
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <section.icon className={`w-8 h-8 ${section.color} mr-3 
          group-hover:scale-110 transition-transform duration-200`} />
        <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
      </div>
      <p className="text-gray-600">{section.description}</p>
    </div>
  </Link>
);

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile Settings</h1>
          <p className="text-lg text-gray-600">
            Manage your UCF account settings and preferences
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <Settings className="text-yellow-600 w-5 h-5 mr-2 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800">Profile Management</h3>
              <p className="text-sm text-yellow-700">
                Click on any section below to view and update your information. 
                Some changes may require additional verification.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ProfileCard key={section.title} section={section} />
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Need help? Contact UCF IT Support at 407-823-5117</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;