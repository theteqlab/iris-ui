import {
  Badge,
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  type Look,
  type Tone,
} from "@irisui/ui";
import { cn } from "@irisui/utils";
import { useState, type ReactNode } from "react";

const LOOKS: Look[] = ["holo", "glass", "solid", "outline", "ghost"];
const TONES: (Tone | undefined)[] = [undefined, 1, 2, 3, 4, 5, "ink", "danger"];
const toneLabel = (tone: Tone | undefined) => (tone === undefined ? "défaut" : String(tone));

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlusIcon = () => icon("M12 5v14M5 12h14");
const ArrowIcon = () => icon("M5 12h14M13 6l6 6-6 6");
const SearchIcon = () => icon("M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4");
const GearIcon = () => icon("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3");

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      data-testid={`section-${id}`}
      className={cn(
        "flex flex-col gap-6 rounded-card p-7",
        "border border-glass-border bg-glass shadow-glass",
        "backdrop-blur-glass backdrop-saturate-(--glass-saturate)",
      )}
    >
      <h2 id={`${id}-title`} className="m-0 text-h3 font-medium">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs text-text-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function Buttons() {
  const [loading, setLoading] = useState(false);
  return (
    <Section id="button" title="Button · IconButton">
      {LOOKS.map((look) => (
        <Row key={look} label={`look="${look}"`}>
          {TONES.map((tone) => (
            <Button key={toneLabel(tone)} look={look} tone={tone}>
              {toneLabel(tone)}
            </Button>
          ))}
        </Row>
      ))}
      <Row label="size">
        <Button size="sm">Petit</Button>
        <Button size="md">Moyen</Button>
        <Button size="lg">Grand</Button>
      </Row>
      <Row label="états">
        <Button startIcon={<PlusIcon />}>Ajouter</Button>
        <Button look="outline" tone={2} endIcon={<ArrowIcon />}>
          Continuer
        </Button>
        <Button look="solid" tone={3} disabled>
          Désactivé
        </Button>
        <Button
          look="glass"
          tone={5}
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
          }}
          data-testid="loading-button"
        >
          Enregistrer
        </Button>
        <Button look="holo" loading>
          Paiement
        </Button>
        <Button asChild look="ghost">
          <a href="#button">Lien (asChild)</a>
        </Button>
      </Row>
      <Row label="loading">
        {LOOKS.map((look) => (
          <Button key={look} look={look} tone={look === "holo" ? undefined : 2} loading>
            {look}
          </Button>
        ))}
      </Row>
      <Row label="IconButton">
        {LOOKS.map((look) => (
          <IconButton key={look} look={look} aria-label={`Réglages (${look})`}>
            <GearIcon />
          </IconButton>
        ))}
        <IconButton size="sm" aria-label="Ajouter">
          <PlusIcon />
        </IconButton>
        <IconButton size="lg" look="solid" tone={1} aria-label="Suivant">
          <ArrowIcon />
        </IconButton>
        <IconButton loading aria-label="Chargement">
          <GearIcon />
        </IconButton>
      </Row>
    </Section>
  );
}

function Badges() {
  return (
    <Section id="badge" title="Badge">
      {(["holo", "glass", "solid", "outline"] as const).map((look) => (
        <Row key={look} label={`look="${look}"`}>
          {TONES.map((tone) => (
            <Badge key={toneLabel(tone)} look={look} tone={tone}>
              {toneLabel(tone)}
            </Badge>
          ))}
        </Row>
      ))}
      <Row label="dot">
        <Badge look="glass" tone={3} dot>
          En ligne
        </Badge>
        <Badge look="outline" tone="danger" dot>
          En retard
        </Badge>
      </Row>
    </Section>
  );
}

function Forms() {
  const [code, setCode] = useState("DISCO70");
  return (
    <Section id="form" title="Field · Input · Textarea · Select">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field>
          <FieldLabel>E-mail</FieldLabel>
          <Input type="email" placeholder="vous@exemple.fr" />
          <FieldDescription>On ne partage jamais votre adresse.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Code promo</FieldLabel>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
          <FieldError>{code === "DISCO70" ? "Ce code a expiré." : null}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Recherche</FieldLabel>
          <Input
            type="search"
            placeholder="Rechercher…"
            startIcon={<SearchIcon />}
            endSlot={<kbd className="font-mono text-xs">⌘K</kbd>}
          />
        </Field>
        <Field disabled>
          <FieldLabel>Désactivé</FieldLabel>
          <Input value="Lecture seule" readOnly />
        </Field>
        <Field>
          <FieldLabel>Transporteur</FieldLabel>
          <Select defaultValue="colissimo">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>À domicile</SelectLabel>
                <SelectItem value="colissimo">Colissimo</SelectItem>
                <SelectItem value="chronopost">Chronopost</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectItem value="relay">Mondial Relay</SelectItem>
              <SelectItem value="dpd" disabled>
                DPD — indisponible
              </SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field required>
          <FieldLabel>Formule</FieldLabel>
          <Select>
            <SelectTrigger invalid>
              <SelectValue placeholder="Choisir une formule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Gratuit</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </Select>
          <FieldError>Choisissez une formule.</FieldError>
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel>Message</FieldLabel>
          <Textarea maxLength={200} showCount autoResize placeholder="Votre message…" />
        </Field>
      </div>
      <Row label="Input size">
        <Input size="sm" aria-label="Petit" placeholder="sm" className="max-w-40" />
        <Input size="md" aria-label="Moyen" placeholder="md" className="max-w-40" />
        <Input size="lg" aria-label="Grand" placeholder="lg" className="max-w-40" />
      </Row>
    </Section>
  );
}

function Choices() {
  return (
    <Section id="choice" title="Checkbox · RadioGroup · Switch">
      <div className="grid gap-8 sm:grid-cols-3">
        <div className="flex flex-col">
          <Checkbox defaultChecked>J'accepte les conditions</Checkbox>
          <Checkbox>Recevoir la lettre</Checkbox>
          <Checkbox defaultChecked="indeterminate">Tout sélectionner</Checkbox>
          <Checkbox disabled>Désactivée</Checkbox>
        </div>
        <Field>
          <FieldLabel>Livraison</FieldLabel>
          <RadioGroup defaultValue="standard">
            <RadioGroupItem value="standard">Standard</RadioGroupItem>
            <RadioGroupItem value="express">Express</RadioGroupItem>
            <RadioGroupItem value="pickup" disabled>
              Point relais
            </RadioGroupItem>
          </RadioGroup>
        </Field>
        <div className="flex flex-col">
          <Switch defaultChecked>Notifications</Switch>
          <Switch>Mode avion</Switch>
          <Switch size="sm">Petit</Switch>
          <Switch size="lg" defaultChecked>
            Grand
          </Switch>
          <Switch disabled>Désactivé</Switch>
        </div>
      </div>
      <Field>
        <FieldLabel>Taille</FieldLabel>
        <RadioGroup orientation="horizontal" defaultValue="m">
          <RadioGroupItem value="s">S</RadioGroupItem>
          <RadioGroupItem value="m">M</RadioGroupItem>
          <RadioGroupItem value="l">L</RadioGroupItem>
        </RadioGroup>
      </Field>
    </Section>
  );
}

export function Showcase() {
  return (
    <>
      <Buttons />
      <Badges />
      <Forms />
      <Choices />
    </>
  );
}
