"use server";

import UserRegistrationForm from "@/features/auth/components/UserRegistrationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCookieAction } from "@/actions/getCookies";
import { verifyAccessTokenAction } from "@/features/auth/actions/verifyUser";
import { redirect } from "next/navigation";

export default async function RegistrationPage() {
  let isAlreadyLoggedIn = false;

  const refreshToken = await getCookieAction("refreshToken");
  // is refresh token valid:
  if (refreshToken) {
    const isTokenValid = await verifyAccessTokenAction(refreshToken.value);
    isAlreadyLoggedIn = !!isTokenValid;
  }

  // if already logged in redirect to a deafult protected route:
  if (isAlreadyLoggedIn) return redirect("/test-protected-route"); // TODO: replace with the actual route to redirect

  // else render registration page:
  return (
    <section className="flex items-center justify-center min-h-screen p-[12px]">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-xl">Create account</CardTitle>
        </CardHeader>

        <CardContent>
          <UserRegistrationForm />
        </CardContent>
      </Card>
    </section>
  );
}
