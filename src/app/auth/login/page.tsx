"use client";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}