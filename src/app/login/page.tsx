import type { Metadata } from "next";
import LoginForm from "@/components/login/LoginForm";

export const metadata: Metadata = {
  title: "Dealer Login",
  description: "Earthstrong Canada Dealer Portal Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
