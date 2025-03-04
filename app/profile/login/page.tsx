'use client';

import React from 'react';
import { Key, Shield, Smartphone, User, AlertTriangle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SecurityInfo {
  ucfid: string;
  netid: string;
  lastPasswordChange: string;
  twoFactorEnabled: boolean;
  twoFactorMethods: {
    authenticator: boolean;
    sms: boolean;
    email: boolean;
  };
  recoveryEmail: string;
  lastLogin: string;
}

const mockData: SecurityInfo = {
  ucfid: "1234567",
  netid: "jo123456",
  lastPasswordChange: "2024-01-15",
  twoFactorEnabled: true,
  twoFactorMethods: {
    authenticator: true,
    sms: true,
    email: false
  },
  recoveryEmail: "john.smith@email.com",
  lastLogin: "2024-03-04 09:30 AM"
};

const SecurityCard = ({ title, icon: Icon, children }: {
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

const LoginManagementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Security</h1>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-600 w-5 h-5 mr-2 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800">Security Notice</h3>
              <p className="text-sm text-yellow-700">
                Keep your account secure by regularly updating your password and maintaining current recovery information.
              </p>
            </div>
          </div>
        </div>

        <SecurityCard title="UCF Identifiers" icon={User}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">UCF ID</label>
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  value={mockData.ucfid}
                  disabled
                  className="block w-full rounded-md border-gray-300 bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">NID</label>
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  value={mockData.netid}
                  disabled
                  className="block w-full rounded-md border-gray-300 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </SecurityCard>

        <SecurityCard title="Password Management" icon={Key}>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Last password change: {mockData.lastPasswordChange}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://mynid.ucf.edu"
                target="_blank"
                className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                Change Password
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="https://mynid.ucf.edu/reset"
                target="_blank"
                className="flex items-center text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-300 transition-colors duration-200"
              >
                Forgot Password?
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </SecurityCard>

        <SecurityCard title="Two-Factor Authentication" icon={Shield}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Status</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                mockData.twoFactorEnabled 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
              }`}>
                {mockData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Verification Methods</h3>
              <div className="space-y-2">
                {Object.entries(mockData.twoFactorMethods).map(([method, enabled]) => (
                  <div key={method} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{method}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="https://mynid.ucf.edu/2fa"
              target="_blank"
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700"
            >
              Manage 2FA Settings
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </SecurityCard>

        <SecurityCard title="Account Recovery" icon={Smartphone}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Recovery Email</label>
              <input
                type="email"
                value={mockData.recoveryEmail}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
              />
            </div>
            <Link
              href="https://mynid.ucf.edu/recovery"
              target="_blank"
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700"
            >
              Update Recovery Information
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </SecurityCard>

        <div className="text-sm text-gray-500 text-center mt-8">
          Last login: {mockData.lastLogin}
        </div>
      </div>
    </div>
  );
};

export default LoginManagementPage;