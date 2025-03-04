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

export default EventCard;