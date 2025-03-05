'use client';

import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue';
}

const mockTodos: Todo[] = [
  {
    id: 'TD-2025-001',
    title: 'Submit Housing Application',
    description: 'Complete and submit housing application for Fall 2025',
    dueDate: '2025-03-15',
    category: 'Housing',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'TD-2025-002',
    title: 'Pay Tuition Balance',
    description: 'Clear remaining balance for Spring 2025 semester',
    dueDate: '2025-03-10',
    category: 'Financial',
    priority: 'high',
    status: 'overdue'
  },
  {
    id: 'TD-2025-003',
    title: 'Update Emergency Contact',
    description: 'Review and update emergency contact information',
    dueDate: '2025-03-20',
    category: 'Administrative',
    priority: 'low',
    status: 'completed'
  }
];

const StatusBadge = ({ status }: { status: Todo['status'] }) => {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700',
    completed: 'bg-green-50 text-green-700',
    overdue: 'bg-red-50 text-red-700'
  };

  const icons = {
    pending: <Clock className="w-4 h-4 mr-1" />,
    completed: <CheckCircle2 className="w-4 h-4 mr-1" />,
    overdue: <AlertCircle className="w-4 h-4 mr-1" />
  };

  return (
    <span className={`${styles[status]} px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const TodoCard = ({ todo }: { todo: Todo }) => (
  <div className="bg-white border border-gray-100 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
        <p className="text-sm text-gray-500">{todo.category}</p>
      </div>
      <StatusBadge status={todo.status} />
    </div>
    
    <div className="space-y-4">
      <p className="text-sm text-gray-600">{todo.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </div>
        
        <Link 
          href="#"
          className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
        >
          View Details <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  </div>
);

export default function TodosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">To-Do List</h1>
          <div className="flex gap-4">
            <select className="rounded-md border-gray-300 text-sm">
              <option>All Categories</option>
              <option>Housing</option>
              <option>Financial</option>
              <option>Administrative</option>
            </select>
            <select className="rounded-md border-gray-300 text-sm">
              <option>All Status</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {mockTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}