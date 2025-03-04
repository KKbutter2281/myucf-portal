import { CheckCircle, AlertCircle, Clock, BookOpen } from 'lucide-react';

interface Requirement {
  name: string;
  credits: number;
  completed: number;
  status: 'completed' | 'in-progress' | 'not-started';
  courses: {
    code: string;
    name: string;
    credits: number;
    grade?: string;
    status: 'completed' | 'in-progress' | 'planned';
    term?: string;
  }[];
}

const getProgressColor = (percentage: number) => {
  if (percentage === 100) return 'bg-green-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-gray-300';
};

export default function DegreeAuditPage() {
  const requirements: Requirement[] = [
    {
      name: "Computer Science Core",
      credits: 36,
      completed: 24,
      status: "in-progress",
      courses: [
        {
          code: "COP 3502C",
          name: "Computer Science I",
          credits: 3,
          grade: "A",
          status: "completed",
          term: "Fall 2024"
        },
        {
          code: "COP 3503C",
          name: "Computer Science II",
          credits: 3,
          grade: "A-",
          status: "completed",
          term: "Spring 2025"
        },
        {
          code: "COT 3100C",
          name: "Introduction to Discrete Structures",
          credits: 3,
          status: "in-progress",
          term: "Spring 2025"
        },
        {
          code: "COP 3402",
          name: "Systems Software",
          credits: 3,
          status: "planned",
          term: "Fall 2025"
        }
      ]
    },
    {
      name: "Mathematics",
      credits: 12,
      completed: 6,
      status: "in-progress",
      courses: [
        {
          code: "MAC 2311C",
          name: "Calculus I",
          credits: 3,
          grade: "B+",
          status: "completed"
        },
        {
          code: "MAC 2312",
          name: "Calculus II",
          credits: 3,
          status: "in-progress"
        }
      ]
    }
  ];

  const totalCredits = requirements.reduce((sum, req) => sum + req.credits, 0);
  const completedCredits = requirements.reduce((sum, req) => sum + req.completed, 0);
  const overallProgress = (completedCredits / totalCredits) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Degree Audit</h1>
          <div className="text-sm text-gray-600">
            Last Updated: March 4, 2025
          </div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Program</p>
              <p className="text-2xl font-bold text-gray-800">Computer Science, B.S.</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Credits Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCredits}/{totalCredits}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Expected Graduation</p>
              <p className="text-2xl font-bold text-yellow-600">May 2026</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${getProgressColor(overallProgress)} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {requirements.map((req) => {
            const progress = (req.completed / req.credits) * 100;
            return (
              <div key={req.name} className="bg-white border border-yellow-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{req.name}</h2>
                    <span className="text-sm text-gray-600">
                      {req.completed}/{req.credits} Credits
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                    <div
                      className={`${getProgressColor(progress)} h-1.5 rounded-full transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="space-y-2">
                    {req.courses.map((course) => (
                      <div 
                        key={course.code} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{course.code} - {course.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{course.credits} Credits</span>
                            {course.term && (
                              <>
                                <span>•</span>
                                <span>{course.term}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {course.grade && <span className="text-sm font-medium text-gray-700">{course.grade}</span>}
                          {course.status === 'completed' && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {course.status === 'in-progress' && (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                          {course.status === 'planned' && (
                            <BookOpen className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}