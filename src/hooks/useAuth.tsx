import { SignUpProps } from "@/schemas/auth";
import { ListUserProps } from "@/schemas/user";
import { authUserAtom, registeredUsersAtom } from "@/store/auth-store";
import bcrypt from "bcryptjs";
import { useAtom } from "jotai";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

// Define the shape of the context
interface AuthContextData {
  user: Partial<ListUserProps[number]> | null;
  isAuthenticated: boolean;
  signUp: ({ user }: { user: SignUpProps }) => void;
  signIn: ({ email, password }: { email: string; password: string }) => void;
  signOut: () => void;
}
// Create a context with the default value of undefined
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Create a provider component that will expose the context
const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useAtom(authUserAtom);
  const [registeredUsers, setRegisteredUsers] = useAtom(registeredUsersAtom);

  // Memoed Check if the user is authenticated
  const isAuthenticated = useMemo(() => !!user?.id, [user]);

  // Function to find a user by email
  function findUserByEmail(email: string) {
    return registeredUsers.find((item) => item.email === email);
  }

  // Sign up function to create a new user
  function signUp({ user }: { user: SignUpProps }) {
    const userExists = findUserByEmail(user.email);

    if (userExists?.id) {
      throw new Error("User already exists");
    }

    let newUser = {};

    setRegisteredUsers((prev) => {
      newUser = {
        ...user,
        id: prev.length + 1,
        createdAt: new Date(),
      };
      return [...prev, newUser];
    });

    setUser(newUser);
  }

  // Sign in function to authenticate a user
  function signIn({ email, password }: { email: string; password: string }) {
    const user = findUserByEmail(email);

    if (!user?.id) {
      throw new Error("User not found");
    }

    // Compare the password with the encrypted password
    const decryptedPassword = bcrypt.compareSync(
      password,
      user?.password || ""
    );

    if (!decryptedPassword) {
      throw new Error("Invalid credentials");
    }

    delete user.password;

    setUser(user);
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("`useAuth` must be used within a AuthProvider");
  return ctx;
};
