import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState(() => {

    const saved = localStorage.getItem("user");

    return saved
      ? JSON.parse(saved)
      : {
          name: "Arun",
          email: "arun@proeduvate.com",
          role: "Product Lead",
          organization: "ProEduvate",
        };
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;