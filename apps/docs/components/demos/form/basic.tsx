"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
  Input,
  Textarea,
  toast,
} from "@irisui/ui";

export default function FormDemo() {
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        toast.success("Message sent");
      }}
    >
      <FormField name="email">
        <FormLabel>Email</FormLabel>
        <FormControl asChild>
          <Input type="email" required />
        </FormControl>
        {/* Shown after a submit attempt, when the browser's check fails. */}
        <FormMessage match="valueMissing">Enter your email.</FormMessage>
        <FormMessage match="typeMismatch">Enter an email like name@example.com.</FormMessage>
      </FormField>
      <FormField name="message">
        <FormLabel>Message</FormLabel>
        <FormControl asChild>
          <Textarea required minLength={10} />
        </FormControl>
        <FormMessage match="valueMissing">Write a message.</FormMessage>
        <FormMessage match="tooShort">At least 10 characters.</FormMessage>
      </FormField>
      <FormSubmit asChild>
        <Button look="solid" className="self-start">
          Send
        </Button>
      </FormSubmit>
    </Form>
  );
}
