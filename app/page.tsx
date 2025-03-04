import React from 'react';
import { Calendar, UserCircle, CreditCard, BellRing, InfoIcon } from 'lucide-react';

const EventCard = ({ title, date, time }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 hover:bg-yellow-100 transition-colors duration-300 ease-in-out">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <Calendar className="text-yellow-500 w-5 h-5" />
    </div>
    <div className="mt-2 text-sm text-gray-600">
      <p>{date}</p>
      <p>{time}</p>
    </div>
  </div>
);

const Events = () => (
  <div className="bg-white border border-yellow-200 rounded-xl shadow-lg overflow-hidden">
    <div className="bg-yellow-100 px-6 py-4 border-b border-yellow-200 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
      <Calendar className="text-yellow-500 w-6 h-6" />
    </div>
    <div className="divide-y divide-yellow-100">
      <EventCard title="Unregistered Penguin Therapy" date="3/1/2025" time="9am-10am" />
      <EventCard title="Student Government Elections" date="3/7/2025" time="9am-5pm" />
      <EventCard title="Chess Club" date="3/10/2025" time="2pm-3pm" />
    </div>
    <button className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-3 transition-colors duration-300">
      See More Events
    </button>
  </div>
);

const Academics = () => (
  <div className="bg-white border border-yellow-200 rounded-xl shadow-lg overflow-hidden">
    <div className="bg-yellow-100 px-6 py-4 border-b border-yellow-200 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">Academics</h2>
      <UserCircle className="text-yellow-500 w-6 h-6" />
    </div>
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors duration-300">
          My Degree
        </button>
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors duration-300">
          My Advisor
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold flex items-center">
          <InfoIcon className="mr-2 w-5 h-5 text-yellow-500" />
          John Grouse
        </p>
        <p className="text-sm text-gray-600">800-567-7777</p>
        <p className="text-sm text-gray-600">johngrouse@ucf.edu</p>
      </div>
    </div>
  </div>
);

const Finances = () => (
  <div className="bg-white border border-yellow-200 rounded-xl shadow-lg overflow-hidden">
    <div className="bg-yellow-100 px-6 py-4 border-b border-yellow-200 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">Financial Overview</h2>
      <CreditCard className="text-yellow-500 w-6 h-6" />
    </div>
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors duration-300">
          Financial Aid
        </button>
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors duration-300">
          Student Bill
        </button>
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors duration-300">
          UCF ID Card
        </button>
      </div>
      <div className="space-y-4">
        <p className="text-lg text-gray-800">
          Total Due: <span className="font-bold text-red-600">$7,032.41</span>
        </p>
        <p className="text-sm text-gray-600">
          FAFSA SAI: <span className="font-semibold">2019</span>
        </p>
      </div>
      <button className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 rounded-lg transition-colors duration-300">
        Pay Now
      </button>
    </div>
  </div>
);

const Announcements = () => (
  <div className="bg-white border border-yellow-200 rounded-xl shadow-lg overflow-hidden">
    <div className="bg-yellow-100 px-6 py-4 border-b border-yellow-200 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">Latest Announcements</h2>
      <BellRing className="text-yellow-500 w-6 h-6" />
    </div>
    <div className="divide-y divide-yellow-100">
      {[
        {
          title: "myUCF Updated!",
          description: "New updates have been made to myUCF to take advantage of new features.",
        },
        {
          title: "John Grouse Won!",
          description: "Student Government elections have been completed, and the winner is John Grouse!",
        },
        {
          title: "Penguin Takeover!",
          description: "Penguins have taken over Classroom Building 2.",
        }
      ].map((announcement, index) => (
        <div key={index} className="p-4 hover:bg-yellow-50 transition-colors duration-300">
          <p className="font-semibold text-gray-800 mb-1">{announcement.title}</p>
          <p className="text-sm text-gray-600">{announcement.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Welcome to myUCF, John
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Events />
        <div className="space-y-8">
          <Academics />
          <Finances />
        </div>
        <Announcements />
      </div>
    </div>
  </div>
);

export default Dashboard;