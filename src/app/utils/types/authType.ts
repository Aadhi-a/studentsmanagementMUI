export type UserType = {
  role?: string;
  email?: string;
  password?: string;
  name?: string;
  token?: string;
  isAdmin?: number;
};

export type WeekDay =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface TimetableSlot {
  day: WeekDay;
  startTime: string;
  endTime: string;
  className: string;
  subject: string;
}
