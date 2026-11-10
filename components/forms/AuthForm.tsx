"use client";

import Link from "next/link";
import { Controller, DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ActionResponse } from "@/types/global";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

interface FormProps<T extends FieldValues> {
  schema: ZodType<T, T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({ schema, defaultValues, formType, onSubmit }: FormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: standardSchemaResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success("Success", {
        description: formType === "SIGN_IN" ? "Signed in successfully" : "Signed up successfully",
      });

      router.push(ROUTES.HOME);
    } else {
      toast.error(`Error ${result?.status}`, {
        description: result?.errors?.message,
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
      <FieldGroup>
        {Object.keys(defaultValues).map((fieldName) => (
          <Controller
            key={fieldName}
            control={form.control}
            name={fieldName as Path<T>}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-2.5">
                <FieldLabel htmlFor={field.name} className="paragraph-medium text-dark400_light700">
                  {field.name === "email" ? "Email Address" : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  required
                  aria-invalid={fieldState.invalid}
                  type={field.name === "password" ? "password" : "text"}
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
      </FieldGroup>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="primary-gradient paragraph-medium rounded-2 font-inter text-light-900 min-h-12 w-full px-4 py-3"
      >
        {form.formState.isSubmitting ? (formType === "SIGN_IN" ? "Signing In..." : "Signing Up...") : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="paragraph-semibold primary-text-gradient">
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="paragraph-semibold primary-text-gradient">
            Sign in
          </Link>
        </p>
      )}

      <FieldSeparator />
    </form>
  );
};

export default AuthForm;
