import type { Metadata } from "next";
import LoginForm from "@/components/login/LoginForm";

export const metadata: Metadata = {
  title: "Dealer Login",
  description: "Earthstrong Canada Dealer Portal Login",
};

export default function LoginPage() {
  return <LoginForm />;
}
