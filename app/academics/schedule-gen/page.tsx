'use client';

import React from 'react';
import { Clock, Calendar, Ban, Plus, ChevronDown, Check } from 'lucide-react';
import { courseCatalog } from '@/data/courses';

interface Course {
  id: string;
  name: string;
  sections: CourseSection[];
}

interface CourseSection {
  id: string;
  instructor: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
    location: string;
  };
  seats: number;
}

interface TimeBlock {
  days: string[];
  startTime: string;
  endTime: string;
  reason: string;
}

const availableCourses = courseCatalog;

const dayMap: { [key: string]: string } = {
  'Monday': 'M',
  'Tuesday': 'T',
  'Wednesday': 'W',
  'Thursday': 'Th',
  'Friday': 'F',
  'M': 'Monday',
  'T': 'Tuesday',
  'W': 'Wednesday',
  'Th': 'Thursday',
  'F': 'Friday'
};

const formatDay = (day: string): string => dayMap[day] || day;

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const hasTimeConflict = (schedule1: CourseSection, schedule2: CourseSection): boolean => {
  const start1 = timeToMinutes(schedule1.schedule.startTime);
  const end1 = timeToMinutes(schedule1.schedule.endTime);
  const start2 = timeToMinutes(schedule2.schedule.startTime);
  const end2 = timeToMinutes(schedule2.schedule.endTime);

  // Convert long day names to short format for comparison
  const days1 = schedule1.schedule.days.map(formatDay);
  const days2 = schedule2.schedule.days.map(formatDay);

  // Check if schedules share any days
  const sharedDays = days1.some(day => days2.includes(day));

  if (!sharedDays) return false;

  // Check time overlap
  return (start1 < end2 && start2 < end1);
};

const generateAllPossibleSchedules = (
  selectedCourseIds: string[],
  availableCourses: Course[],
  timeBlocks: TimeBlock[]
): CourseSection[][] => {
  if (selectedCourseIds.length === 0) return [];

  // Convert timeBlocks to CourseSection format for conflict checking
  const timeBlockSections: CourseSection[] = timeBlocks.map((block, index) => ({
    id: `block-${index}`,
    instructor: 'Break',
    schedule: {
      days: block.days,
      startTime: block.startTime,
      endTime: block.endTime,
      location: block.reason
    },
    seats: 0
  }));

  // Get all sections for selected courses
  const courseSections = selectedCourseIds.map(courseId => {
    const course = availableCourses.find(c => c.id === courseId);
    return {
      courseId,
      sections: course?.sections || []
    };
  });

  const generateScheduleCombinations = (
    currentIndex: number,
    currentSchedule: CourseSection[]
  ): CourseSection[][] => {
    // Base case: we've processed all courses
    if (currentIndex === courseSections.length) {
      return [currentSchedule];
    }

    const results: CourseSection[][] = [];
    const currentCourse = courseSections[currentIndex];

    // Try each section of the current course
    for (const section of currentCourse.sections) {
      // Check if this section conflicts with any already selected sections
      // or with any time blocks
      const hasConflict = [...currentSchedule, ...timeBlockSections].some(
        existingSection => hasTimeConflict(existingSection, section)
      );

      if (!hasConflict) {
        // This section works, try the next course
        const nextSchedules = generateScheduleCombinations(
          currentIndex + 1,
          [...currentSchedule, section]
        );
        results.push(...nextSchedules);
      }
    }

    return results;
  };

  return generateScheduleCombinations(0, []);
};

const ScheduleGenerator = () => {
  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);
  const [timeBlocks, setTimeBlocks] = React.useState<TimeBlock[]>([]);
  const [possibleSchedules, setPossibleSchedules] = React.useState<CourseSection[][]>([]);
  const [currentSchedule, setCurrentSchedule] = React.useState(0);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const addTimeBlock = () => {
    setTimeBlocks([...timeBlocks, {
      days: [],
      startTime: "09:00",
      endTime: "10:00",
      reason: "Break"
    }]);
  };

  const removeTimeBlock = (index: number) => {
    setTimeBlocks(timeBlocks.filter((_, i) => i !== index));
  };

  const generateSchedules = async () => {
    if (selectedCourses.length === 0) {
      setError('Please select at least one course');
      return;
    }

    const schedules = generateAllPossibleSchedules(
      selectedCourses,
      availableCourses,
      timeBlocks
    );

    if (schedules.length === 0) {
      setError('No possible schedules found! Try selecting different courses or removing some time blocks.');
      return;
    }

    setPossibleSchedules(schedules);
    setCurrentSchedule(0);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule Generator</h1>
          <p className="mt-2 text-gray-600">Select your courses and preferences to generate possible schedules</p>
          {error && (
            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Course Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Select Courses</h2>
              <div className="relative">
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    if (e.target.value && !selectedCourses.includes(e.target.value)) {
                      setSelectedCourses([...selectedCourses, e.target.value]);
                    }
                  }}
                  value=""
                >
                  <option value="">Add a course...</option>
                  {availableCourses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.id} - {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 space-y-2">
                {selectedCourses.map(courseId => {
                  const course = availableCourses.find(c => c.id === courseId);
                  return (
                    <div key={courseId} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span>{course?.id} - {course?.name}</span>
                      <button 
                        onClick={() => setSelectedCourses(selectedCourses.filter(id => id !== courseId))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Blocks */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Time Blocks</h2>
                <button 
                  onClick={addTimeBlock}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-1 rounded flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Block
                </button>
              </div>

              <div className="space-y-4">
                {timeBlocks.map((block, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded">
                    <div className="flex justify-between mb-2">
                      <input
                        type="text"
                        placeholder="Block reason"
                        value={block.reason}
                        onChange={(e) => {
                          const newBlocks = [...timeBlocks];
                          newBlocks[index].reason = e.target.value;
                          setTimeBlocks(newBlocks);
                        }}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                      <button
                        onClick={() => removeTimeBlock(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                          type="time"
                          value={block.startTime}
                          onChange={(e) => {
                            const newBlocks = [...timeBlocks];
                            newBlocks[index].startTime = e.target.value;
                            setTimeBlocks(newBlocks);
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <input
                          type="time"
                          value={block.endTime}
                          onChange={(e) => {
                            const newBlocks = [...timeBlocks];
                            newBlocks[index].endTime = e.target.value;
                            setTimeBlocks(newBlocks);
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Days</label>
                      <div className="flex gap-2 mt-1">
                        {['M', 'T', 'W', 'Th', 'F'].map(day => (
                          <button
                            key={day}
                            onClick={() => {
                              const newBlocks = [...timeBlocks];
                              const days = newBlocks[index].days;
                              if (days.includes(day)) {
                                newBlocks[index].days = days.filter(d => d !== day);
                              } else {
                                newBlocks[index].days = [...days, day];
                              }
                              setTimeBlocks(newBlocks);
                            }}
                            className={`px-3 py-1 rounded ${
                              block.days.includes(day)
                                ? 'bg-yellow-400 text-gray-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={async () => {
                try {
                  setIsGenerating(true);
                  await generateSchedules();
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'An error occurred');
                } finally {
                  setIsGenerating(false);
                }
              }}
              disabled={isGenerating}
              className={`w-full py-3 rounded-lg font-semibold ${
                isGenerating
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-gray-800'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Schedules'}
            </button>
          </div>

          {/* Schedule Display */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Schedules</h2>
              {possibleSchedules.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentSchedule(prev => Math.max(0, prev - 1))}
                    disabled={currentSchedule === 0}
                    className={`p-2 rounded ${
                      currentSchedule === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    Previous
                  </button>
                  <span>
                    {currentSchedule + 1} of {possibleSchedules.length}
                  </span>
                  <button
                    onClick={() => setCurrentSchedule(prev => Math.min(possibleSchedules.length - 1, prev + 1))}
                    disabled={currentSchedule === possibleSchedules.length - 1}
                    className={`p-2 rounded ${
                      currentSchedule === possibleSchedules.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {possibleSchedules.length > 0 ? (
              <WeeklyScheduleGrid schedule={possibleSchedules[currentSchedule]} timeBlocks={timeBlocks} />
            ) : (
              <div className="text-center text-gray-500 py-12">
                Generate schedules to see them here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WeeklyScheduleGrid = ({ schedule, timeBlocks }: { schedule: CourseSection[], timeBlocks: TimeBlock[] }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

  const getEventStyle = (start: string, end: string) => {
    const startHour = parseInt(start.split(':')[0]);
    const startMinute = parseInt(start.split(':')[1]);
    const endHour = parseInt(end.split(':')[0]);
    const endMinute = parseInt(end.split(':')[1]);
    
    const top = (startHour - 7) * 60 + startMinute;
    const height = (endHour - startHour) * 60 + (endMinute - startMinute);
    
    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="border border-gray-200 rounded overflow-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-6 bg-yellow-50">
          <div className="p-2 border-b border-r border-gray-200" />
          {days.map(day => (
            <div key={day} className="p-2 font-semibold text-center border-b border-r border-gray-200">
              {day}
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="relative">
          {/* Time Labels */}
          <div className="grid grid-cols-6" style={{ height: '840px' }}> {/* 14 hours * 60px */}
            <div className="relative border-r border-gray-200">
              {hours.map(hour => (
                <div
                  key={hour}
                  className="absolute w-full text-xs text-gray-500 text-right pr-2"
                  style={{ top: `${(hour - 7) * 60}px` }}
                >
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              ))}
            </div>

            {/* Grid Columns */}
            {days.map(day => (
              <div key={day} className="relative border-r border-gray-200">
                {/* Hour lines */}
                {hours.map(hour => (
                  <div
                    key={hour}
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${(hour - 7) * 60}px` }}
                  />
                ))}

                {/* Course blocks */}
                {schedule.map((section) => {
                  const sectionDays = section.schedule.days.map(formatDay);
                  if (sectionDays.includes(formatDay(day))) {
                    return (
                      <div
                        key={`${section.id}-${section.instructor}-${day}`}
                        className="absolute w-full px-1"
                        style={getEventStyle(section.schedule.startTime, section.schedule.endTime)}
                      >
                        <div className="h-full bg-yellow-100 rounded p-1 text-xs overflow-hidden">
                          <div className="font-semibold">{section.id}</div>
                          <div className="text-gray-600">{section.location}</div>
                          <div className="text-gray-500 text-[10px]">{section.instructor}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}

                {/* Time blocks */}
                {timeBlocks.map((block, index) => {
                  if (block.days.includes(formatDay(day))) {
                    return (
                      <div
                        key={`block-${index}-${day}`}
                        className="absolute w-full px-1"
                        style={getEventStyle(block.startTime, block.endTime)}
                      >
                        <div className="h-full bg-gray-100 rounded p-1 text-xs overflow-hidden">
                          <div className="font-semibold">{block.reason}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGenerator;