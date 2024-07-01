import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader, 
  CardFooter,
  CardTitle, 
  CardDescription
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import BackButton from "./BackButton";

interface CardWrapperProps {
    label: string
    title: string
    backButtonHref: string
    backButtonLabel: string
    children: React.ReactNode
}

const AuthCard = ( { label, title, backButtonHref, backButtonLabel, children }: CardWrapperProps) => {
  return (
    <Card className="w-[25vw] shadow-md p-4">
      <CardHeader>
        <CardTitle className={cn("text-3xl")}>{title}</CardTitle>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>
        { children }
      </CardContent>
      <CardFooter className={cn("flex-col justify-center")}>
        <Button>Create Account</Button>
        <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
      </CardFooter>
    </Card>
  );
}

export default AuthCard;
