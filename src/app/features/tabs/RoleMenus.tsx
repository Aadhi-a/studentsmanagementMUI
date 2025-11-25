export const roleMenus = {
  admin: [
    { name: "Home", screen: "HomeScreen" },
    { name: "Profile", screen: "ProfileScreen" },
  ],

  teacher: [
    // { name: "Home", screen: "HomeScreen" },
    { name: "Students", screen: "HomeScreen" },
    { name: "Chat", screen: "ChatsScreen" },
    { name: "Profile", screen: "ProfileScreen" },
  ],

  student: [
    { name: "Home", screen: "HomeScreen" },
    { name: "Profile", screen: "ProfileScreen" },
  ],

  parent: [
    { name: "Home", screen: "HomeScreen" },
    { name: "Chat", screen: "ChatsScreen" },
    { name: "Profile", screen: "ProfileScreen" },
  ],
};
