import { TimetableSlot } from "@utils/types/authType";

export const users = [
  {
    id: 1,
    role: "admin",
    email: "admin@example.com",
    password: "admin123",
    name: "Super Admin",
    isAdmin: 1,
    token: "admin_token_123",
  },
  {
    id: 2,
    role: "teacher",
    email: "teacher@example.com",
    password: "123456",
    name: "Mr. Joseph",
    isTeacher: 1,
    token: "teacher_token_123",
  },
  {
    id: 3,
    role: "student",
    email: "student@example.com",
    password: "123456",
    name: "Aadhi Kumar",
    isStudent: 1,
    token: "student_token_123",
  },
  {
    id: 4,
    role: "parent",
    email: "parent@example.com",
    password: "123456",
    name: "Mrs. Priya",
    childName: "Aadhi Kumar",
    isParent: 1,
    token: "parent_token_123",
  },
  {
    id: 5,
    role: "user",
    email: "ak@example.com",
    password: "admin123",
    name: "Super Admin",
    token: "admin_token_123",
  },
];

// HomeMenus.ts
export const roleHomeMenus = {
  admin: [
    {
      id: 1,
      title: "Dashboard",
      img: require("@assets/images/dashboard.png"),
      router: "AdminDashboard",
    },
    {
      id: 2,
      title: "Teacher Attendance",
      img: require("@assets/images/staffAttadance.png"),
      router: "TeacherAttendance",
    },
    {
      id: 3,
      title: "Students Attendance",
      img: require("@assets/images/studentAttadance.png"),
      router: "StudentAttendance",
    },
    {
      id: 4,
      title: "Exams",
      img: require("@assets/images/exams.png"),
      router: "TimeTable",
    },
  ],

  teacher: [
    {
      id: 1,
      title: "My Dashboard",
      img: require("@assets/images/staffDashboard.png"),
      router: "TeacherDashboard",
    },
    {
      id: 2,
      title: "My Attendance",
      img: require("@assets/images/staffAttadance.png"),
      router: "TeacherAttendance",
    },
    {
      id: 3,
      title: "Homework",
      img: require("@assets/images/homeWork.png"),
      router: "HomeWork",
    },
  ],

  student: [
    {
      id: 1,
      title: "My Dashboard",
      img: require("@assets/images/dashboard.png"),
      router: "StudentDashboard",
    },
    {
      id: 2,
      title: "Timetable",
      img: require("@assets/images/timeTable.png"),
      router: "TimeTable",
    },
    {
      id: 3,
      title: "Results",
      img: require("@assets/images/results.png"),
      router: "ResultsScreen",
    },
  ],

  parent: [
    {
      id: 1,
      title: "Student Attendance",
      img: require("@assets/images/studentAttadance.png"),
      router: "StudentAttendance",
    },
    {
      id: 2,
      title: "Fees",
      img: require("@assets/images/fees.png"),
      router: "FeesScreen",
    },
    {
      id: 3,
      title: "Results",
      img: require("@assets/images/results.png"),
      router: "ResultsScreen",
    },
  ],
};

export const teacherTimetable: TimetableSlot[] = [
  {
    day: "Monday",
    startTime: "09:00",
    endTime: "09:45",
    className: "Class A",
    subject: "Math",
  },
  {
    day: "Monday",
    startTime: "10:00",
    endTime: "10:45",
    className: "Class B",
    subject: "Math",
  },
  {
    day: "Monday",
    startTime: "11:00",
    endTime: "11:45",
    className: "Class C",
    subject: "Math",
  },
  {
    day: "Monday",
    startTime: "12:00",
    endTime: "12:45",
    className: "Class D",
    subject: "Math",
  },

  {
    day: "Tuesday",
    startTime: "08:30",
    endTime: "09:15",
    className: "Class A",
    subject: "Math",
  },
  {
    day: "Tuesday",
    startTime: "09:30",
    endTime: "10:15",
    className: "Class C",
    subject: "Math",
  },
  {
    day: "Tuesday",
    startTime: "10:30",
    endTime: "11:15",
    className: "Class D",
    subject: "Math",
  },
  {
    day: "Tuesday",
    startTime: "11:30",
    endTime: "12:15",
    className: "Class B",
    subject: "Math",
  },

  {
    day: "Wednesday",
    startTime: "09:00",
    endTime: "09:45",
    className: "Class B",
    subject: "Math",
  },
  {
    day: "Wednesday",
    startTime: "10:00",
    endTime: "10:45",
    className: "Class C",
    subject: "Math",
  },
  {
    day: "Wednesday",
    startTime: "11:00",
    endTime: "11:45",
    className: "Class D",
    subject: "Math",
  },
  {
    day: "Wednesday",
    startTime: "12:00",
    endTime: "12:45",
    className: "Class A",
    subject: "Math",
  },

  {
    day: "Thursday",
    startTime: "08:45",
    endTime: "09:30",
    className: "Class D",
    subject: "Math",
  },
  {
    day: "Thursday",
    startTime: "09:45",
    endTime: "10:30",
    className: "Class A",
    subject: "Math",
  },
  {
    day: "Thursday",
    startTime: "10:45",
    endTime: "11:30",
    className: "Class B",
    subject: "Math",
  },
  {
    day: "Thursday",
    startTime: "11:45",
    endTime: "12:30",
    className: "Class C",
    subject: "Math",
  },

  {
    day: "Friday",
    startTime: "09:00",
    endTime: "09:40",
    className: "Class C",
    subject: "Math",
  },
  {
    day: "Friday",
    startTime: "09:50",
    endTime: "10:30",
    className: "Class A",
    subject: "Math",
  },
  {
    day: "Friday",
    startTime: "10:40",
    endTime: "11:20",
    className: "Class B",
    subject: "Math",
  },
  {
    day: "Friday",
    startTime: "11:30",
    endTime: "12:10",
    className: "Class D",
    subject: "Math",
  },
];
