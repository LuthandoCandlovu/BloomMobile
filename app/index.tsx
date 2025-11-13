import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useUser } from "./context/UserContext";

export default function Index() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Check if user is authenticated and verified
    if (user && user.isVerified) {
      router.replace("/(tabs)");
    } else {
      router.replace("/auth/login");
    }
  }, [user]);

  return null;
}
