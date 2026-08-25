"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FieldGroup, Field, FieldLabel, FieldError, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = async () => {
    console.log();
  };

  return (
    <form onSubmit={form.handleSubmit(handleCreateQuestion)} className="flex-coll flex w-full gap-10">
      <FieldGroup>
        <Controller
          control={form.control}
          name={"title"}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
              <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>

              <Input
                id={field.name}
                aria-invalid={fieldState.invalid}
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Be specific and imagine you&apos;re asking a question to another person.
              </FieldDescription>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name={"content"}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
              <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem <span className="text-primary-500">*</span>
              </FieldLabel>
              editor
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Introduce the problem and expand on what you&apos;ve put in the title.
              </FieldDescription>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name={"tags"}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-3">
              <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>

              <div>
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Add tags..."
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  {...field}
                />
                tags
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </div>
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
              </FieldDescription>
            </Field>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button type="submit" className="primary-gradient text-light-900! w-fit">
            Ask A Question
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default QuestionForm;
