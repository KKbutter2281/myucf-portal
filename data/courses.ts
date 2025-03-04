export interface Course {
    id: string;
    name: string;
    credits: number;
    sections: CourseSection[];
  }
  
  export interface CourseSection {
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
  
  export const courseCatalog: Course[] = [
    {
      id: "COP4600",
      name: "Operating Systems",
      credits: 3,
      sections: [
        {
          id: "0001",
          instructor: "Dr. Smith",
          schedule: {
            days: ["Monday", "Wednesday"],
            startTime: "10:30",
            endTime: "11:45",
            location: "CB2 101"
          },
          seats: 15
        },
        {
          id: "0002",
          instructor: "Dr. Johnson",
          schedule: {
            days: ["Tuesday", "Thursday"],
            startTime: "13:30",
            endTime: "14:45",
            location: "ENG2 102"
          },
          seats: 8
        }
      ]
    },
    {
      id: "COP4020",
      name: "Programming Languages",
      credits: 3,
      sections: [
        {
          id: "0001",
          instructor: "Dr. Davis",
          schedule: {
            days: ["Monday", "Wednesday", "Friday"],
            startTime: "09:30",
            endTime: "10:20",
            location: "MSB 108"
          },
          seats: 12
        },
        {
          id: "0002",
          instructor: "Dr. Wilson",
          schedule: {
            days: ["Tuesday", "Thursday"],
            startTime: "15:00",
            endTime: "16:15",
            location: "CB1 120"
          },
          seats: 20
        }
      ]
    },
    {
      id: "CDA3103",
      name: "Computer Logic and Organization",
      credits: 3,
      sections: [
        {
          id: "0001",
          instructor: "Dr. Brown",
          schedule: {
            days: ["Monday", "Wednesday"],
            startTime: "14:30",
            endTime: "15:45",
            location: "ENG1 225"
          },
          seats: 18
        },
        {
          id: "0002",
          instructor: "Dr. Taylor",
          schedule: {
            days: ["Tuesday", "Thursday"],
            startTime: "11:30",
            endTime: "12:45",
            location: "CB2 207"
          },
          seats: 15
        }
      ]
    },
    {
      id: "COT4210",
      name: "Discrete Computational Structures",
      credits: 3,
      sections: [
        {
          id: "0001",
          instructor: "Dr. Anderson",
          schedule: {
            days: ["Monday", "Wednesday", "Friday"],
            startTime: "11:30",
            endTime: "12:20",
            location: "MSB 110"
          },
          seats: 25
        }
      ]
    },
    {
      id: "CIS4615",
      name: "Secure Software Development",
      credits: 3,
      sections: [
        {
          id: "0001",
          instructor: "Dr. Martinez",
          schedule: {
            days: ["Tuesday", "Thursday"],
            startTime: "09:00",
            endTime: "10:15",
            location: "CB1 309"
          },
          seats: 22
        },
        {
          id: "0002",
          instructor: "Dr. Lee",
          schedule: {
            days: ["Monday", "Wednesday"],
            startTime: "16:00",
            endTime: "17:15",
            location: "ENG2 203"
          },
          seats: 20
        }
      ]
    }
  ];