import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { SignUpProps, SignUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import bcrypt from "bcryptjs";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const salt = bcrypt.genSaltSync(10);

const SignUpForm: React.FC = () => {
  const form = useForm<SignUpProps>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const { signUp } = useAuth();

  const { mutate, isPending } = useMutation<SignUpProps>({
    mutationFn: async () => {
      const formValues = form.getValues();
      const hashedPassword = bcrypt.hashSync(formValues.password, salt);

      // Form values with hashed password
      const values = {
        ...formValues,
        password: hashedPassword,
      };

      // Call API
      // setTimeout(() => {
      signUp({ user: values });
      // }, 1000);
      return values;
    },
    onSuccess: () => {
      toast("Welcome!", {
        description: "Your account has been created",
        icon: <ExclamationTriangleIcon />,
        cancel: {
          label: "Close",
        },
      });

      setTimeout(() => {
        // refresh the page
        // after 2 seconds
        // window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      console.error(error);
      toast("Whoops!", {
        description: "Verify your credentials",
        icon: <ExclamationTriangleIcon />,
        cancel: {
          label: "Close",
        },
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your firstname</FormLabel>
              <FormControl>
                <Input
                  testId={`${field.name}-input`}
                  placeholder="Jhon"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your lastname</FormLabel>
              <FormControl>
                <Input
                  testId={`${field.name}-input`}
                  placeholder="Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  testId={`${field.name}-input`}
                  placeholder="E-mail"
                  {...field}
                />
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
                  testId={`${field.name}-input`}
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
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>
                I agree with the Terms and Conditions and the Privacy Policy
              </FormLabel>
            </FormItem>
          )}
        />
        <Button
          data-testid="sign-up-button"
          disabled={isPending}
          role="button"
          type="submit"
          className="mt-2 w-full"
        >
          {isPending ? "Loading..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
