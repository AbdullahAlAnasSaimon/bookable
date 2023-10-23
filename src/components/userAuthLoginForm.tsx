"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/features/user/userSlice";
import { ILogin } from "@/types/globalTypes";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthLoginForm({ className, ...props }: UserAuthFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  async function LoginSubmit(data: ILogin) {
    dispatch(loginUser({ email: data.email, password: data.password }));
    if (user?.email) {
      navigate("/");
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(LoginSubmit)}>
        <div className="grid gap-3">
          <div>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email", { required: "Email is Required" })} // Register the input field with React Hook Form
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-[12px] font-semibold text-red-500">
                *{errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              id="password"
              placeholder="Your Password"
              type="password"
              autoCapitalize="none"
              {...register("password", { required: "Password is Required" })} // Register the input field with React Hook Form
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-[12px] font-semibold text-red-500">
                *{errors.password.message}
              </p>
            )}
          </div>
          <Button className="mt-2" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
