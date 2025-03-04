'use client';

import React from 'react';
import { FileText, Download, Mail, Check, Clock } from 'lucide-react';

const VerificationCard = ({ title, description, icon: Icon, status }) => (
  <div className="bg-white border border-yellow-200 rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Icon className="text-yellow-500 w-6 h-6" />
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      {status === 'ready' && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <Check className="w-4 h-4 mr-1" /> Ready
        </span>
      )}
      {status === 'processing' && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-4 h-4 mr-1" /> Processing
        </span>
      )}
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex space-x-3">
      <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
        <Download className="w-4 h-4 mr-2" /> Download PDF
      </button>
      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
        <Mail className="w-4 h-4 mr-2" /> Email Copy
      </button>
    </div>
  </div>
);

const EnrollmentVerification = () => {
  const verifications = [
    {
      title: "Current Enrollment",
      description: "Verification of your current semester enrollment status and credit hours.",
      status: "ready",
      icon: FileText,
      lastUpdated: "March 1, 2025"
    },
    {
      title: "Degree Verification",
      description: "Confirmation of your degree program and expected graduation date.",
      status: "ready",
      icon: FileText,
      lastUpdated: "March 1, 2025"
    },
    {
      title: "Good Standing Letter",
      description: "Verification of your academic standing and GPA.",
      status: "processing",
      icon: FileText,
      lastUpdated: "Processing"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Enrollment Verification</h1>
          <div className="text-sm text-gray-600">
            Last Updated: March 4, 2025
          </div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Enrollment Status</p>
              <p className="text-2xl font-bold text-green-600">Full Time</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Credit Hours</p>
              <p className="text-2xl font-bold text-gray-800">15</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Term</p>
              <p className="text-2xl font-bold text-yellow-600">Spring 2025</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {verifications.map((verification, index) => (
            <VerificationCard key={index} {...verification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentVerification;