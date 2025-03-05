'use client'

import React from 'react'
import { Clock, Calendar, Ban, Plus, ChevronDown, ChevronLeft, ChevronRight, Check, Info } from 'lucide-react'
import { courseCatalog } from '@/data/courses'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface Course {
  id: string
  name: string
  sections: CourseSection[]
}

interface CourseSection {
  id: string
  instructor: string
  schedule: {
    days: string[]
    startTime: string
    endTime: string
    location: string
  }
  seats: number
}

interface TimeBlock {
  days: string[]
  startTime: string
  endTime: string
  reason: string
}

const availableCourses = courseCatalog

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
}

const formatDay = (day: string): string => dayMap[day] || day

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const hasTimeConflict = (schedule1: CourseSection, schedule2: CourseSection): boolean => {
  const start1 = timeToMinutes(schedule1.schedule.startTime)
  const end1 = timeToMinutes(schedule1.schedule.endTime)
  const start2 = timeToMinutes(schedule2.schedule.startTime)
  const end2 = timeToMinutes(schedule2.schedule.endTime)

  // Convert long day names to short format for comparison
  const days1 = schedule1.schedule.days.map(formatDay)
  const days2 = schedule2.schedule.days.map(formatDay)

  // Check if schedules share any days
  const sharedDays = days1.some(day => days2.includes(day))

  if (!sharedDays) return false

  // Check time overlap
  return (start1 < end2 && start2 < end1)
}

const generateAllPossibleSchedules = (
  selectedCourseIds: string[],
  availableCourses: Course[],
  timeBlocks: TimeBlock[]
): CourseSection[][] => {
  if (selectedCourseIds.length === 0) return []

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
  }))

  // Get all sections for selected courses
  const courseSections = selectedCourseIds.map(courseId => {
    const course = availableCourses.find(c => c.id === courseId)
    return {
      courseId,
      sections: course?.sections || []
    }
  })

  const generateScheduleCombinations = (
    currentIndex: number,
    currentSchedule: CourseSection[]
  ): CourseSection[][] => {
    // Base case: we've processed all courses
    if (currentIndex === courseSections.length) {
      return [currentSchedule]
    }

    const results: CourseSection[][] = []
    const currentCourse = courseSections[currentIndex]

    // Try each section of the current course
    for (const section of currentCourse.sections) {
      // Check if this section conflicts with any already selected sections
      // or with any time blocks
      const hasConflict = [...currentSchedule, ...timeBlockSections].some(
        existingSection => hasTimeConflict(existingSection, section)
      )

      if (!hasConflict) {
        // This section works, try the next course
        const nextSchedules = generateScheduleCombinations(
          currentIndex + 1,
          [...currentSchedule, section]
        )
        results.push(...nextSchedules)
      }
    }

    return results
  }

  return generateScheduleCombinations(0, [])
}

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export default function ScheduleGenerator() {
  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([])
  const [timeBlocks, setTimeBlocks] = React.useState<TimeBlock[]>([])
  const [possibleSchedules, setPossibleSchedules] = React.useState<CourseSection[][]>([])
  const [currentSchedule, setCurrentSchedule] = React.useState(0)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState('courses')

  const addTimeBlock = () => {
    setTimeBlocks([...timeBlocks, {
      days: [],
      startTime: "09:00",
      endTime: "10:00",
      reason: "Break"
    }])
  }

  const removeTimeBlock = (index: number) => {
    setTimeBlocks(timeBlocks.filter((_, i) => i !== index))
  }

  const generateSchedules = async () => {
    if (selectedCourses.length === 0) {
      setError('Please select at least one course')
      return
    }

    const schedules = generateAllPossibleSchedules(
      selectedCourses,
      availableCourses,
      timeBlocks
    )

    if (schedules.length === 0) {
      setError('No possible schedules found! Try selecting different courses or removing some time blocks.')
      return
    }

    setPossibleSchedules(schedules)
    setCurrentSchedule(0)
    setError(null)
    setActiveTab('schedules')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Schedule Generator</h1>
          <p className="text-muted-foreground">
            Select your courses and preferences to generate possible schedules
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="timeblocks">Time Blocks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Select Courses</CardTitle>
                    <CardDescription>
                      Choose the courses you want to include in your schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select
                      onValueChange={(value) => {
                        if (value && !selectedCourses.includes(value)) {
                          setSelectedCourses([...selectedCourses, value])
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Add a course..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCourses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.id} - {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <ScrollArea className="h-[250px] rounded-md border p-2">
                      <div className="space-y-2">
                        {selectedCourses.length === 0 ? (
                          <p className="text-center text-muted-foreground py-8">
                            No courses selected
                          </p>
                        ) : (
                          selectedCourses.map(courseId => {
                            const course = availableCourses.find(c => c.id === courseId)
                            return (
                              <div key={courseId} className="flex justify-between items-center p-2 bg-secondary/50 rounded-md">
                                <div className="flex flex-col">
                                  <span className="font-medium">{course?.id}</span>
                                  <span className="text-sm text-muted-foreground">{course?.name}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setSelectedCourses(selectedCourses.filter(id => id !== courseId))}
                                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                >
                                  <Ban className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          })
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="timeblocks" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Time Blocks</CardTitle>
                        <CardDescription>
                          Add blocks of time you want to keep free
                        </CardDescription>
                      </div>
                      <Button onClick={addTimeBlock} size="sm" className="h-8">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[350px] pr-4">
                      <div className="space-y-4">
                        {timeBlocks.length === 0 ? (
                          <p className="text-center text-muted-foreground py-8">
                            No time blocks added
                          </p>
                        ) : (
                          timeBlocks.map((block, index) => (
                            <Card key={index} className="border border-muted">
                              <CardHeader className="p-3 pb-0">
                                <div className="flex justify-between items-center">
                                  <Input
                                    placeholder="Block reason"
                                    value={block.reason}
                                    onChange={(e) => {
                                      const newBlocks = [...timeBlocks]
                                      newBlocks[index].reason = e.target.value
                                      setTimeBlocks(newBlocks)
                                    }}
                                    className="h-8 text-sm"
                                  />
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                    onClick={() => removeTimeBlock(index)}
                                  >
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium">Start Time</label>
                                    <Input
                                      type="time"
                                      value={block.startTime}
                                      onChange={(e) => {
                                        const newBlocks = [...timeBlocks]
                                        newBlocks[index].startTime = e.target.value
                                        setTimeBlocks(newBlocks)
                                      }}
                                      className="h-8"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium">End Time</label>
                                    <Input
                                      type="time"
                                      value={block.endTime}
                                      onChange={(e) => {
                                        const newBlocks = [...timeBlocks]
                                        newBlocks[index].endTime = e.target.value
                                        setTimeBlocks(newBlocks)
                                      }}
                                      className="h-8"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-medium">Days</label>
                                  <ToggleGroup type="multiple" variant="outline" className="justify-start">
                                    {['M', 'T', 'W', 'Th', 'F'].map(day => (
                                      <ToggleGroupItem 
                                        key={day} 
                                        value={day}
                                        aria-label={dayMap[day]}
                                        data-state={block.days.includes(day) ? "on" : "off"}
                                        onClick={() => {
                                          const newBlocks = [...timeBlocks]
                                          const days = newBlocks[index].days
                                          if (days.includes(day)) {
                                            newBlocks[index].days = days.filter(d => d !== day)
                                          } else {
                                            newBlocks[index].days = [...days, day]
                                          }
                                          setTimeBlocks(newBlocks)
                                        }}
                                        className="h-8 w-8 p-0"
                                      >
                                        {day}
                                      </ToggleGroupItem>
                                    ))}
                                  </ToggleGroup>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Button
              onClick={async () => {
                try {
                  setIsGenerating(true)
                  await generateSchedules()
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'An error occurred')
                } finally {
                  setIsGenerating(false)
                }
              }}
              disabled={isGenerating || selectedCourses.length === 0}
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate Schedules'}
            </Button>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Generated Schedules</CardTitle>
                  {possibleSchedules.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentSchedule(prev => Math.max(0, prev - 1))}
                        disabled={currentSchedule === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">
                        {currentSchedule + 1} of {possibleSchedules.length}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentSchedule(prev => Math.min(possibleSchedules.length - 1, prev + 1))}
                        disabled={currentSchedule === possibleSchedules.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardDescription>
                  {possibleSchedules.length > 0 
                    ? `Viewing schedule ${currentSchedule + 1} of ${possibleSchedules.length} possible combinations`
                    : 'Generate schedules to see them here'}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {possibleSchedules.length > 0 ? (
                  <WeeklyScheduleGrid schedule={possibleSchedules[currentSchedule]} timeBlocks={timeBlocks} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[500px] text-center text-muted-foreground">
                    <Calendar className="h-12 w-12 mb-4 text-muted-foreground/50" />
                    <p className="mb-2">No schedules generated yet</p>
                    <p className="text-sm max-w-md">
                      Select your courses and preferences, then click "Generate Schedules" to see possible combinations
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const WeeklyScheduleGrid = ({ schedule, timeBlocks }: { schedule: CourseSection[], timeBlocks: TimeBlock[] }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 7 AM to 8 PM

  const getEventStyle = (start: string, end: string) => {
    const startHour = parseInt(start.split(':')[0])
    const startMinute = parseInt(start.split(':')[1])
    const endHour = parseInt(end.split(':')[0])
    const endMinute = parseInt(end.split(':')[1])
    
    const top = (startHour - 7) * 60 + startMinute
    const height = (endHour - startHour) * 60 + (endMinute - startMinute)
    
    return {
      top: `${top}px`,
      height: `${height}px`,
    }
  }

  return (
    <div className="border-t">
      <div className="min-w-[800px] overflow-auto">
        {/* Header */}
        <div className="grid grid-cols-6 bg-muted/30">
          <div className="p-2 border-b border-r" />
          {days.map(day => (
            <div key={day} className="p-2 font-medium text-center border-b border-r">
              {day}
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="relative">
          {/* Time Labels */}
          <div className="grid grid-cols-6" style={{ height: '840px' }}> {/* 14 hours * 60px */}
            <div className="relative border-r">
              {hours.map(hour => (
                <div
                  key={hour}
                  className="absolute w-full text-xs text-muted-foreground text-right pr-2"
                  style={{ top: `${(hour - 7) * 60}px` }}
                >
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              ))}
            </div>

            {/* Grid Columns */}
            {days.map(day => (
              <div key={day} className="relative border-r">
                {/* Hour lines */}
                {hours.map(hour => (
                  <div
                    key={hour}
                    className="absolute w-full border-t border-border/30"
                    style={{ top: `${(hour - 7) * 60}px` }}
                  />
                ))}

                {/* Course blocks */}
                {schedule.map((section) => {
                  const sectionDays = section.schedule.days.map(formatDay)
                  if (sectionDays.includes(formatDay(day))) {
                    return (
                      <div
                        key={`${section.id}-${section.instructor}-${day}`}
                        className="absolute w-full px-1"
                        style={getEventStyle(section.schedule.startTime, section.schedule.endTime)}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="h-full bg-primary/10 border border-primary/20 rounded-md p-1.5 text-xs overflow-hidden hover:bg-primary/15 transition-colors">
                                <div className="font-medium">{section.id}</div>
                                <div className="text-muted-foreground">{section.schedule.location}</div>
                                <div className="text-[10px] text-muted-foreground truncate">{section.instructor}</div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-[200px]">
                              <div className="text-xs">
                                <div className="font-bold">{section.id}</div>
                                <div>{formatTime(section.schedule.startTime)} - {formatTime(section.schedule.endTime)}</div>
                                <div>{section.schedule.location}</div>
                                <div>{section.instructor}</div>
                                <div className="text-muted-foreground mt-1">
                                  {section.seats} seats available
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )
                  }
                  return null
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
                        <div className="h-full bg-muted border border-muted-foreground/20 rounded-md p-1.5 text-xs overflow-hidden">
                          <div className="font-medium">{block.reason}</div>
                          <div className="text-muted-foreground text-[10px]">
                            {formatTime(block.startTime)} - {formatTime(block.endTime)}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
