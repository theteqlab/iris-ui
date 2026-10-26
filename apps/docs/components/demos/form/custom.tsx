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
} from "@irisui/ui";

const taken = ["camille", "admin"];

export default function FormCustom() {
  return (
    <Form className="w-full max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <FormField name="username">
        <FormLabel>Username</FormLabel>
        <FormControl asChild>
          <Input required defaultValue="camille" />
        </FormControl>
        {/* Your own rule: a function of the value and of the form's data. */}
        <FormMessage match={(value) => taken.includes(value.toLowerCase())}>
          This username is taken.
        </FormMessage>
      </FormField>
      <FormSubmit asChild>
        <Button look="solid" className="self-start">
          Check
        </Button>
      </FormSubmit>
    </Form>
  );
}
