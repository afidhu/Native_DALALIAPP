// UserDataContext.tsx
import supabase from "@/Supabaseonf";
import { createContext, useEffect, useState, ReactNode } from "react";

// Define the shape of user data
type UserDataType = {
  id: string;
  email: string;
  username: string;
} | null;

// Define the shape of the context value
interface UserDataContextType {
  userData: UserDataType;
}

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Provider props
interface Props {
  children: ReactNode;
}

export const UserDataProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<UserDataType>(null);

  const fetchUserData = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.log("Error getting session:", error);
      return;
    }

    if (!session || !session.user) {
      console.warn("No active session.");
      setUserData(null);
      return;
    }

    const user = session? session.user : null;
    setUserData({
      id: user?.id,
      email: user?.email,
      username: user?.user_metadata?.username || "No Name",
      userType: user?.user_metadata?.user_type,
      role:user?.user_metadata?.role
    });
  };

  useEffect(() => {

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        fetchUserData();
      }
    }
    );
    return () => {
      subscription?.unsubscribe();
    }
  }, []);

  return (
    <UserDataContext.Provider value={{ userData}}>
      {children}
    </UserDataContext.Provider>
  );
};
