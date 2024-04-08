import { onAuthStateChange } from "@/auth/firebase";
import { User } from "firebase/auth";
import { useState } from "react";

export function useAuth() {
  const [ user, setUser ] = useState<User | null>(null);
  onAuthStateChange((usr) => {
    setUser(usr)
  });
  return user;
}