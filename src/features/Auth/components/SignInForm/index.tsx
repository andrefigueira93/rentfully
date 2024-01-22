/**
 * Sign In Form component.
 *
 * This component renders a form for signing in with email and password.
 * It uses react-hook-form for form validation and submission.
 *
 * @returns The Sign In Form component.
 */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { SignInProps, SignInSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignInForm: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useMutation<SignInProps>({
    mutationFn: async () => {
      signIn({
        email: form.getValues("email"),
        password: form.getValues("password"),
      });
      return form.getValues();
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      toast("Whoops!", {
        description: "Verify your credentials",
        icon: <ExclamationTriangleIcon />,
        cancel: {
          label: "Close",
        },
        position: "top-right",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          mutate();
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input testId="email-input" placeholder="E-mail" {...field} />
              </FormControl>
              <FormDescription>Your best email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  testId="password-input"
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your best password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          data-testid="sign-in-button"
          disabled={isPending}
          type="submit"
          className="mt-2 w-full"
        >
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
