import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className=" w-[300px] flex flex-col items-center">
        <CardHeader>
          <CardTitle>Welcome to Phay Kyi</CardTitle>
          <CardDescription>
            Phay Kyi is a quiz app that can answer the quizz with enjoy and
            share with your friends.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignInButton text="Sign-in" />
        </CardContent>
      </Card>
    </div>
  );
}
