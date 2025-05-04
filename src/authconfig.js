import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// دالة للتحقق من جلسة الأدمن
export const isAdmin = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
};

export { authOptions };