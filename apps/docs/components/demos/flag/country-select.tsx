"use client";

import {
  Field,
  FieldLabel,
  Flag,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@irisui/ui";

const countries = [
  { code: "be", name: "Belgium" },
  { code: "ca", name: "Canada" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "ch", name: "Switzerland" },
];

export default function FlagCountrySelect() {
  return (
    <Field className="w-72">
      <FieldLabel>Country</FieldLabel>
      <Select defaultValue="fr">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {/* The name is written next to it: the flag is decorative. */}
              <span className="flex items-center gap-2.5">
                <Flag code={country.code} decorative size="sm" />
                {country.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
