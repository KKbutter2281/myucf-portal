'use client';

import React from 'react';
import { User, Mail, Phone, Home, Globe, Shield, Save } from 'lucide-react';

interface PersonalInfo {
  name: string;
  pid: string;
  email: {
    ucf: string;
    personal: string;
  };
  phone: {
    mobile: string;
    emergency: string;
  };
  address: {
    current: string;
    permanent: string;
  };
  citizenship: string;
  pronouns: string;
  preferredName: string;
}

const mockData: PersonalInfo = {
  name: "John Smith",
  pid: "1234567",
  email: {
    ucf: "john.smith@ucf.edu",
    personal: "john.smith@email.com"
  },
  phone: {
    mobile: "(407) 555-0123",
    emergency: "(407) 555-0124"
  },
  address: {
    current: "4000 Central Florida Blvd, Orlando, FL 32816",
    permanent: "123 Home Street, Tampa, FL 33601"
  },
  citizenship: "United States",
  pronouns: "He/Him",
  preferredName: "Johnny"
};

const PersonalInfoCard = ({ title, icon: Icon, children }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-yellow-200 rounded-xl shadow-lg overflow-hidden mb-6">
    <div className="bg-yellow-100 px-6 py-4 border-b border-yellow-200 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <Icon className="text-yellow-500 w-6 h-6" />
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const PersonalPage = () => {
  const [info, setInfo] = React.useState(mockData);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to an API
    console.log('Saving changes:', info);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Personal Information</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-lg font-semibold"
            >
              Edit Information
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-lg font-semibold flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          )}
        </div>

        <PersonalInfoCard title="Basic Information" icon={User}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={info.name}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                onChange={(e) => setInfo({...info, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">PID</label>
              <input
                type="text"
                value={info.pid}
                disabled={true}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Name</label>
              <input
                type="text"
                value={info.preferredName}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                onChange={(e) => setInfo({...info, preferredName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pronouns</label>
              <input
                type="text"
                value={info.pronouns}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                onChange={(e) => setInfo({...info, pronouns: e.target.value})}
              />
            </div>
          </div>
        </PersonalInfoCard>

        <PersonalInfoCard title="Contact Information" icon={Mail}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">UCF Email</label>
              <input
                type="email"
                value={info.email.ucf}
                disabled={true}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Personal Email</label>
              <input
                type="email"
                value={info.email.personal}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                onChange={(e) => setInfo({...info, email: {...info.email, personal: e.target.value}})}
              />
            </div>
          </div>
        </PersonalInfoCard>

        <PersonalInfoCard title="Phone Numbers" icon={Phone}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Phone</label>
              <input
                type="tel"
                value={info.phone.mobile}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                onChange={(e) => setInfo({...info, phone: {...info.phone, mobile: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                type="tel"
                value={info.phone.emergency}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                onChange={(e) => setInfo({...info, phone: {...info.phone, emergency: e.target.value}})}
              />
            </div>
          </div>
        </PersonalInfoCard>

        <PersonalInfoCard title="Addresses" icon={Home}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Address</label>
              <input
                type="text"
                value={info.address.current}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                onChange={(e) => setInfo({...info, address: {...info.address, current: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
              <input
                type="text"
                value={info.address.permanent}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                onChange={(e) => setInfo({...info, address: {...info.address, permanent: e.target.value}})}
              />
            </div>
          </div>
        </PersonalInfoCard>

        <PersonalInfoCard title="Citizenship" icon={Globe}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country of Citizenship</label>
            <input
              type="text"
              value={info.citizenship}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              onChange={(e) => setInfo({...info, citizenship: e.target.value})}
            />
          </div>
        </PersonalInfoCard>
      </div>
    </div>
  );
};

export default PersonalPage;