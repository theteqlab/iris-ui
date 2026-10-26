"use client";

import { Field, FieldDescription, FieldError, FieldLabel, Input } from "@irisui/ui";
import { useState } from "react";

export default function FieldErrorDemo() {
  const [email, setEmail] = useState("camille@");
  const error = /^\S+@\S+\.\S+$/.test(email) ? null : "Enter an email like name@example.com.";

  return (
    <Field className="w-80">
      <FieldLabel>Email</FieldLabel>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <FieldDescription>We send the receipt there.</FieldDescription>
      {/* Rendering an error marks the control invalid and describes it. */}
      <FieldError>{error}</FieldError>
    </Field>
  );
}
