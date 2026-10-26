"use client";

import { Checkbox, Field, FieldError } from "@irisui/ui";
import { useState } from "react";

export default function CheckboxField() {
  const [accepted, setAccepted] = useState(false);
  return (
    <Field>
      <Checkbox checked={accepted} onCheckedChange={(c) => setAccepted(c === true)}>
        I accept the terms of use
      </Checkbox>
      <FieldError>{accepted ? null : "Accept the terms to continue."}</FieldError>
    </Field>
  );
}
