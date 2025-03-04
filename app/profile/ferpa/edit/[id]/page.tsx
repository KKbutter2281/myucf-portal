'use client';

import React from 'react';
import { Shield, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import type { AuthorizedPerson, PermissionType } from '@/types/ferpa';

const EditFERPAPage = () => {
  const params = useParams();
  const router = useRouter();
  const [person, setPerson] = React.useState<AuthorizedPerson | null>(null);

  const handleTogglePermission = (key: keyof PermissionType) => {
    if (!person) return;
    setPerson({
      ...person,
      permissions: {
        ...person.permissions,
        [key]: !person.permissions[key]
      }
    });
  };

  const handleSave = () => {
    // In a real app, this would save to an API
    console.log('Saving changes:', person);
    router.push('/profile/ferpa');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/profile/ferpa" className="flex items-center text-yellow-600 hover:text-yellow-700">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to FERPA Management
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Access Permissions
          </h1>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={person?.name || ''}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relation</label>
                <input
                  type="text"
                  value={person?.relation || ''}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  disabled
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Access Permissions</h2>
              <div className="grid grid-cols-1 gap-4">
                {person && Object.entries(person.permissions).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <button
                      onClick={() => handleTogglePermission(key as keyof PermissionType)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                        value ? 'bg-yellow-400' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Link
                href="/profile/ferpa"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md font-semibold"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFERPAPage;