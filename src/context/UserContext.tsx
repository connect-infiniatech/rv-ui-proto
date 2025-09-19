import React, {
  createContext,
  useState,
  type ReactNode,
  type FC,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react';

// 1️⃣ Define the user shape matching FastAPI Item
export interface User {
  id: number;
  name: string;
  location: string;
  role: string;
}

// 2️⃣ Context value type
interface UserContextType {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  addUser: (newUser: User) => void;
  refreshUsers: () => Promise<void>;
}

// 3️⃣ Create context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// 4️⃣ Provider props
interface UserProviderProps {
  children: ReactNode;
}

// 5️⃣ Provider component
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch from FastAPI on load
  const refreshUsers = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/items');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const addUser = (newUser: User) => setUsers(prev => [...prev, newUser]);

  return (
    <UserContext.Provider value={{ users, setUsers, addUser, refreshUsers }}>
      {children}
    </UserContext.Provider>
  );
};