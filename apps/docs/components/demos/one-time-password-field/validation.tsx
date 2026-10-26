"use client";

import { Field, FieldError, FieldLabel, OneTimePasswordField } from "@irisui/ui";
import { useState } from "react";

export default function OneTimePasswordFieldValidation() {
  const [code, setCode] = useState("");
  const wrong = code.length === 4 && code !== "2468";
  return (
    <Field>
      <FieldLabel>Enter 2468</FieldLabel>
      {/* Letters and digits, 4 boxes; the error appears once the code is complete. */}
      <OneTimePasswordField
        length={4}
        validationType="alphanumeric"
        value={code}
        onValueChange={setCode}
      />
      <FieldError>{wrong ? "This code is not valid." : null}</FieldError>
    </Field>
  );
}
