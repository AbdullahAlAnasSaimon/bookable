import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { createUser } from "@/redux/features/user/userSlice";
import { ISignUp } from "@/types/globalTypes";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthSignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>(); // Added type parameter

  async function onSubmit(data: ISignUp) {
    setIsLoading(true);
    console.log(data);
    dispatch(
      createUser({
        email: data.email,
        name: data.name,
        password: data.password,
      })
    );
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Input
            id="name"
            placeholder="Your name"
            type="text"
            {...register("name", { required: "Name is Required" })} // Register the input field with React Hook Form
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-[12px] font-semibold text-red-500">
              *{errors.name.message}
            </p>
          )}
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
          <Button className="mt-2" disabled={isLoading} type="submit">
            {" "}
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
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
