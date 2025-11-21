export const roleMenus = {
  admin: [
    { name: "Home", screen: "HomeScreen" },
    { name: "Teachers", screen: "DemoScreen" },
    { name: "Students", screen: "AttananceScreen" },
    { name: "Parents", screen: "HomeScreen" },
    { name: "Exams", screen: "HomeScreen" },
  ],

  teacher: [
    // { name: "Home", screen: "HomeScreen" },
    { name: "Students", screen: "HomeScreen" },
    { name: "Exams", screen: "HomeScreen" },
  ],

  student: [
    { name: "Home", screen: "HomeScreen" },
    { name: "Grades", screen: "GradesScreen" },
  ],

  parent: [
    { name: "Home", screen: "HomeScreen" },
    { name: "Messages", screen: "MessageScreen" },
  ],
};
