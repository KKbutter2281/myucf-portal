'use client';

import React from 'react';
import { BookOpen, Check, AlertCircle, Clock } from 'lucide-react';

interface Course {
  code: string;
  name: string;
  credits: number;
  status: 'completed' | 'in-progress' | 'pending';
}

interface RequirementBlockProps {
  title: string;
  credits: number;
  completed: number;
  courses: Course[];
}

const RequirementBlock: React.FC<RequirementBlockProps> = ({ title, credits, completed, courses }) => (
  <div className="bg-white border border-yellow-200 rounded-lg p-6 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-600">
          {completed}/{credits} Credits
        </span>
        {completed === credits ? (
          <Check className="ml-2 text-green-500 w-5 h-5" />
        ) : (
          <Clock className="ml-2 text-yellow-500 w-5 h-5" />
        )}
      </div>
    </div>
    <div className="space-y-3">
      {courses.map((course, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">{course.code}</p>
            <p className="text-sm text-gray-600">{course.name}</p>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600 mr-2">
              {course.credits} Credits
            </span>
            {course.status === 'completed' && (
              <Check className="text-green-500 w-5 h-5" />
            )}
            {course.status === 'in-progress' && (
              <Clock className="text-yellow-500 w-5 h-5" />
            )}
            {course.status === 'pending' && (
              <AlertCircle className="text-gray-400 w-5 h-5" />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DegreeAudit = () => {
  const degreeRequirements = {
    general: {
      title: "General Education Requirements",
      credits: 36,
      completed: 36,
      courses: [
        { code: "ENC1101", name: "Composition I", credits: 3, status: "completed" },
        { code: "ENC1102", name: "Composition II", credits: 3, status: "completed" },
        { code: "MAC2311C", name: "Calculus I", credits: 4, status: "completed" },
        { code: "PHY2048C", name: "Physics I", credits: 4, status: "completed" }
      ]
    },
    core: {
      title: "Computer Science Core",
      credits: 42,
      completed: 30,
      courses: [
        { code: "COP3502C", name: "Computer Science I", credits: 3, status: "completed" },
        { code: "COP3503C", name: "Computer Science II", credits: 3, status: "completed" },
        { code: "COT3100C", name: "Discrete Structures", credits: 3, status: "in-progress" },
        { code: "CDA3103C", name: "Computer Logic", credits: 3, status: "pending" }
      ]
    },
    restricted: {
      title: "Restricted Electives",
      credits: 15,
      completed: 6,
      courses: [
        { code: "CIS4615", name: "Secure Software Dev", credits: 3, status: "completed" },
        { code: "CAP4630", name: "Artificial Intelligence", credits: 3, status: "in-progress" },
        { code: "COP4520", name: "Parallel Processing", credits: 3, status: "pending" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Degree Audit</h1>
          <div className="flex items-center space-x-2">
            <BookOpen className="text-yellow-500 w-6 h-6" />
            <span className="text-lg font-medium text-gray-800">
              Computer Science, B.S.
            </span>
          </div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Credits Required</p>
              <p className="text-2xl font-bold text-gray-800">120</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Credits Completed</p>
              <p className="text-2xl font-bold text-green-600">72</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Current GPA</p>
              <p className="text-2xl font-bold text-yellow-600">3.8</p>
            </div>
          </div>
        </div>

        <RequirementBlock {...degreeRequirements.general} />
        <RequirementBlock {...degreeRequirements.core} />
        <RequirementBlock {...degreeRequirements.restricted} />
      </div>
    </div>
  );
};

export default DegreeAudit;