'use client';

import React from 'react';
import { FileText, Download, Mail, CreditCard, Clock, Check, AlertCircle } from 'lucide-react';

const TranscriptOrder = ({ type, price, processingTime, description }) => (
  <div className="bg-white border border-yellow-200 rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <FileText className="text-yellow-500 w-6 h-6" />
        <h3 className="text-xl font-bold text-gray-800">{type}</h3>
      </div>
      <span className="text-lg font-bold text-gray-800">${price.toFixed(2)}</span>
    </div>
    <p className="text-gray-600 mb-2">{description}</p>
    <div className="flex items-center text-sm text-gray-600 mb-4">
      <Clock className="w-4 h-4 mr-1" />
      Processing Time: {processingTime}
    </div>
    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center">
      <CreditCard className="w-4 h-4 mr-2" /> Order Now
    </button>
  </div>
);

const PreviousOrder = ({ orderDate, type, status, trackingNumber }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div>
      <p className="font-medium text-gray-800">{type}</p>
      <p className="text-sm text-gray-600">Ordered: {orderDate}</p>
      {trackingNumber && (
        <p className="text-sm text-gray-600">Tracking: {trackingNumber}</p>
      )}
    </div>
    <div className="flex items-center">
      {status === 'completed' && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <Check className="w-4 h-4 mr-1" /> Completed
        </span>
      )}
      {status === 'processing' && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-4 h-4 mr-1" /> Processing
        </span>
      )}
    </div>
  </div>
);

const TranscriptPage = () => {
  const transcriptOptions = [
    {
      type: "Official Electronic Transcript",
      price: 10.00,
      processingTime: "1-2 business days",
      description: "PDF transcript delivered via secure email"
    },
    {
      type: "Official Paper Transcript",
      price: 15.00,
      processingTime: "3-5 business days",
      description: "Physical transcript sent via USPS mail"
    },
    {
      type: "Rush Processing",
      price: 25.00,
      processingTime: "Same business day",
      description: "Expedited processing and delivery available"
    }
  ];

  const previousOrders = [
    {
      orderDate: "Feb 28, 2025",
      type: "Official Electronic Transcript",
      status: "completed",
      trackingNumber: "TRX-2025-001"
    },
    {
      orderDate: "Mar 1, 2025",
      type: "Official Paper Transcript",
      status: "processing",
      trackingNumber: "TRX-2025-002"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transcript Requests</h1>
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-yellow-500 w-6 h-6" />
            <span className="text-sm text-gray-600">
              Unofficial transcripts are free in Student Center
            </span>
          </div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Current GPA</p>
              <p className="text-2xl font-bold text-gray-800">3.8</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Credit Hours</p>
              <p className="text-2xl font-bold text-green-600">72</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Academic Standing</p>
              <p className="text-2xl font-bold text-yellow-600">Good</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Transcripts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {transcriptOptions.map((option, index) => (
            <TranscriptOrder key={index} {...option} />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Previous Orders</h2>
        <div className="space-y-4">
          {previousOrders.map((order, index) => (
            <PreviousOrder key={index} {...order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranscriptPage;