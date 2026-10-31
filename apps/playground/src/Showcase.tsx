import {
  Navbar,
  Flag,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
  OneTimePasswordField,
  PasswordToggleField,
  AspectRatio,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  VisuallyHidden,
  navigationMenuTriggerClass,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  toast,
  type Look,
  type Tone,
} from "@irisui/ui";
import { cn } from "@irisui/utils";
import { MapShowcase } from "./MapShowcase";
import { useEffect, useState, type ReactNode } from "react";

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

function Section({
  id,
  title,
  plain = false,
  children,
}: {
  id: string;
  title: string;
  /** No glass: for content that brings its own (backdrop-filter is never nested). */
  plain?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      data-testid={`section-${id}`}
      className={cn(
        "flex flex-col gap-6 rounded-card",
        plain
          ? "py-2"
          : "border border-glass-border bg-glass p-7 shadow-glass backdrop-blur-glass backdrop-saturate-(--glass-saturate)",
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
      <Row label="status">
        <Badge status="success">Validé</Badge>
        <Badge status="warning">En attente</Badge>
        <Badge status="danger">Refusé</Badge>
        <Badge status="info">Nouveau</Badge>
        <Badge status="neutral">Brouillon</Badge>
        <Badge status="success" dot={false}>
          Payé
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

const MoreIcon = () => icon("M5 12h.01M12 12h.01M19 12h.01");
const InfoIcon = () => icon("M12 16v-4M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z");

function Surfaces() {
  const [grid, setGrid] = useState(true);
  const [view, setView] = useState("list");
  return (
    <Section id="surface" title="Card · Dialog · DropdownMenu · Popover · Tooltip · Tabs" plain>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Verre</CardTitle>
            <CardDescription>variant="glass"</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="m-0">Surface floutée, bord blanc fin.</p>
          </CardContent>
          <CardFooter>
            <Button look="outline" tone={2} size="sm">
              Détails
            </Button>
          </CardFooter>
        </Card>
        <Card variant="strong">
          <CardHeader>
            <CardTitle>Holographique</CardTitle>
            <CardDescription>variant="strong"</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="m-0">Le film holographique, pour la mise en avant.</p>
          </CardContent>
        </Card>
        <Card variant="ink">
          <CardHeader>
            <CardTitle>Encre</CardTitle>
            <CardDescription>variant="ink"</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="m-0">Verre encre, texte clair.</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Row label="Dialog · DropdownMenu · Popover · Tooltip">
          <Dialog>
            <DialogTrigger asChild>
              <Button look="solid" tone="danger">
                Supprimer le projet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Supprimer le projet ?</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <DialogDescription>
                  Les fichiers et l'historique seront effacés. Cette action est définitive.
                </DialogDescription>
                <Field>
                  <FieldLabel>Nom du projet</FieldLabel>
                  <Input placeholder="iris-ui" />
                </Field>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button look="outline">Annuler</Button>
                </DialogClose>
                <Button look="solid" tone="danger">
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button look="glass" endIcon={<MoreIcon />}>
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Projet</DropdownMenuLabel>
              <DropdownMenuItem>
                Modifier <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Dupliquer <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Archiver</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
                Afficher la grille
              </DropdownMenuCheckboxItem>
              <DropdownMenuRadioGroup value={view} onValueChange={setView}>
                <DropdownMenuRadioItem value="list">Liste</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="cards">Cartes</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Partager</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Copier le lien</DropdownMenuItem>
                  <DropdownMenuItem>Par e-mail</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="danger">Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button look="outline" tone={3}>
                Livraison
              </Button>
            </PopoverTrigger>
            <PopoverContent arrow aria-label="Livraison">
              <strong>Livraison offerte</strong>
              <p className="m-0 text-sm text-text-muted">Dès 50 € d'achat, en 2 jours ouvrés.</p>
              <PopoverClose asChild>
                <Button size="sm">Compris</Button>
              </PopoverClose>
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <IconButton look="glass" aria-label="Informations">
                <InfoIcon />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>Raccourci : ⌘I</TooltipContent>
          </Tooltip>
        </Row>
      </div>

      <Card>
        <Tabs defaultValue="profile">
          <TabsList aria-label="Réglages (pill)">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
            <TabsTrigger value="api" disabled>
              API
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">Nom, photo et langue.</TabsContent>
          <TabsContent value="billing">Formule et factures.</TabsContent>
          <TabsContent value="api">Clés d'accès.</TabsContent>
        </Tabs>
        <Tabs defaultValue="week" look="underline">
          <TabsList aria-label="Période (underline)">
            <TabsTrigger value="day">Jour</TabsTrigger>
            <TabsTrigger value="week">Semaine</TabsTrigger>
            <TabsTrigger value="month">Mois</TabsTrigger>
          </TabsList>
          <TabsContent value="day">Ventes du jour.</TabsContent>
          <TabsContent value="week">Ventes de la semaine.</TabsContent>
          <TabsContent value="month">Ventes du mois.</TabsContent>
        </Tabs>
      </Card>
    </Section>
  );
}

function Feedback() {
  const [value, setValue] = useState(68);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 4)), 600);
    return () => clearInterval(id);
  }, []);
  return (
    <Section id="feedback" title="Alert · Toast · Avatar · Progress">
      <div className="grid gap-4 md:grid-cols-2">
        <Alert tone="info">
          <AlertTitle>Nouvelle version</AlertTitle>
          <AlertDescription>La version 2 est disponible.</AlertDescription>
        </Alert>
        <Alert tone="success">
          <AlertTitle>Enregistré</AlertTitle>
          <AlertDescription>Vos modifications sont en ligne.</AlertDescription>
        </Alert>
        <Alert tone="warning">
          <AlertTitle>Espace presque plein</AlertTitle>
          <AlertDescription>Il reste 2 Go sur 50 Go.</AlertDescription>
        </Alert>
        <Alert tone="danger">
          <AlertTitle>Paiement refusé</AlertTitle>
          <AlertDescription>Vérifiez les informations de votre carte.</AlertDescription>
        </Alert>
      </div>
      <Row label="Toast">
        <Button
          look="glass"
          tone={3}
          onClick={() =>
            toast.success("Enregistré", { description: "Vos modifications sont en ligne." })
          }
        >
          Succès
        </Button>
        <Button look="glass" tone={2} onClick={() => toast.info("Nouvelle version disponible")}>
          Info
        </Button>
        <Button look="glass" tone={4} onClick={() => toast.warning("Espace presque plein")}>
          Avertissement
        </Button>
        <Button
          look="glass"
          tone="danger"
          onClick={() =>
            toast.error("Paiement refusé", {
              description: "Vérifiez votre carte.",
              action: { label: "Réessayer", onClick: () => toast.info("Nouvelle tentative…") },
            })
          }
        >
          Erreur avec action
        </Button>
      </Row>
      <Row label="Avatar">
        <Avatar size="sm">
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <Avatar tone={1}>
          <AvatarFallback>HM</AvatarFallback>
        </Avatar>
        <Avatar tone={3} size="lg">
          <AvatarFallback>LB</AvatarFallback>
        </Avatar>
        <AvatarGroup aria-label="Équipe">
          {(["ink", 1, 2, 3, 5] as const).map((tone, i) => (
            <Avatar key={tone} tone={tone}>
              <AvatarFallback>{["CR", "HM", "LB", "AD", "+5"][i]}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </Row>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm font-medium">
            <span id="import-label">Import en cours</span>
            <span className="font-mono">{value} %</span>
          </div>
          <Progress aria-labelledby="import-label" value={value} />
        </div>
        <Progress aria-label="Quota" value={82} tone="danger" />
        <Progress aria-label="Chargement" />
      </div>
    </Section>
  );
}

const TAGS = Array.from({ length: 30 }, (_, i) => `Étiquette ${i + 1}`);

function MoreControls() {
  const [volume, setVolume] = useState([60]);
  return (
    <Section id="more" title="Accordion · AlertDialog · Slider · Toggle · ScrollArea · Separator">
      <Accordion type="single" collapsible defaultValue="livraison">
        <AccordionItem value="livraison">
          <AccordionTrigger>Délais de livraison</AccordionTrigger>
          <AccordionContent>Sous 2 jours ouvrés en France métropolitaine.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="retours">
          <AccordionTrigger>Retours</AccordionTrigger>
          <AccordionContent>Gratuits pendant 30 jours.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="garantie" disabled>
          <AccordionTrigger>Garantie (désactivé)</AccordionTrigger>
          <AccordionContent>2 ans.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Row label="Slider">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Field>
            <FieldLabel>Volume · {volume[0]} %</FieldLabel>
            <Slider value={volume} onValueChange={setVolume} />
          </Field>
          <Slider defaultValue={[20, 70]} thumbLabels={["Prix minimum", "Prix maximum"]} tone={3} />
          <Slider aria-label="Désactivé" defaultValue={[30]} disabled />
        </div>
      </Row>
      <Row label="Toggle · ToggleGroup">
        <Toggle aria-label="Gras" defaultPressed>
          <strong>G</strong>
        </Toggle>
        <Toggle size="sm">Grille</Toggle>
        <Separator orientation="vertical" className="h-8" />
        <ToggleGroup type="single" defaultValue="semaine" aria-label="Période">
          <ToggleGroupItem value="jour">Jour</ToggleGroupItem>
          <ToggleGroupItem value="semaine">Semaine</ToggleGroupItem>
          <ToggleGroupItem value="mois">Mois</ToggleGroupItem>
        </ToggleGroup>
      </Row>
      <Row label="ScrollArea">
        <ScrollArea className="h-40 w-64 rounded-field border border-line">
          <ul className="m-0 flex list-none flex-col gap-2 p-4">
            {TAGS.map((tag) => (
              <li key={tag} className="text-sm">
                {tag}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </Row>
      <Row label="AlertDialog">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button look="outline" tone="danger">
              Vider la corbeille
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Vider la corbeille ?</AlertDialogTitle>
              <AlertDialogDescription>Les 12 éléments seront supprimés.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction tone="danger">Vider</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Row>
    </Section>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <Section
      id="nav"
      title="Menubar · NavigationMenu · Toolbar · ContextMenu · HoverCard · Collapsible"
    >
      <Row label="NavigationMenu">
        <NavigationMenu aria-label="Principale">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Produits</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="m-0 grid w-80 list-none gap-1 p-0">
                  <li>
                    <NavigationMenuLink href="#nav">Composants</NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#nav">Jetons</NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#nav" active className={navigationMenuTriggerClass}>
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Row>
      <Row label="Menubar">
        <Menubar aria-label="Éditeur">
          <MenubarMenu>
            <MenubarTrigger>Fichier</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Nouveau <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Ouvrir…</MenubarItem>
              <MenubarSeparator />
              <MenubarItem variant="danger">Supprimer</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Affichage</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Zoom avant</MenubarItem>
              <MenubarItem>Zoom arrière</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Row>
      <Row label="Toolbar">
        <Toolbar aria-label="Mise en forme">
          <ToolbarToggleGroup type="multiple" aria-label="Style" defaultValue={["gras"]}>
            <ToolbarToggleItem value="gras" aria-label="Gras">
              <strong>G</strong>
            </ToolbarToggleItem>
            <ToolbarToggleItem value="italique" aria-label="Italique">
              <em>I</em>
            </ToolbarToggleItem>
          </ToolbarToggleGroup>
          <ToolbarSeparator />
          <ToolbarButton>Partager</ToolbarButton>
        </Toolbar>
      </Row>
      <Row label="ContextMenu · HoverCard">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-24 w-64 items-center justify-center rounded-field border border-dashed border-line text-sm text-text-muted">
            Clic droit ici
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              Renommer <ContextMenuShortcut>F2</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Dupliquer</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="danger">Supprimer</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <HoverCard>
          <HoverCardTrigger href="#nav" className="font-bold text-link">
            @camille
          </HoverCardTrigger>
          <HoverCardContent>
            <strong>Camille Laurent</strong>
            <p className="m-0 text-sm text-text-muted">Designer à Lyon, 42 projets.</p>
          </HoverCardContent>
        </HoverCard>
      </Row>
      <Row label="Collapsible · AspectRatio · VisuallyHidden">
        <Collapsible open={open} onOpenChange={setOpen} className="flex w-64 flex-col gap-2">
          <CollapsibleTrigger asChild>
            <Button look="ghost" size="sm">
              {open ? "Masquer" : "Voir"} les 3 dépôts
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-1 text-sm">
            <span>iris-ui</span>
            <span>iris-docs</span>
            <span>iris-site</span>
          </CollapsibleContent>
        </Collapsible>
        <div className="w-48">
          <AspectRatio ratio={16 / 9} className="rounded-field bg-track">
            <span className="flex size-full items-center justify-center text-sm text-text-muted">
              16 / 9
            </span>
          </AspectRatio>
        </div>
        <IconButton look="glass" aria-label="Réglages">
          <GearIcon />
          <VisuallyHidden>(ouvre les réglages)</VisuallyHidden>
        </IconButton>
      </Row>
    </Section>
  );
}

function Security() {
  return (
    <Section id="security" title="Form · PasswordToggleField · OneTimePasswordField">
      <Form className="max-w-sm" onSubmit={(e) => e.preventDefault()}>
        <FormField name="email">
          <FormLabel>E-mail</FormLabel>
          <FormControl asChild>
            <Input type="email" required />
          </FormControl>
          <FormMessage match="valueMissing">Indiquez votre e-mail.</FormMessage>
          <FormMessage match="typeMismatch">Cet e-mail n'est pas valide.</FormMessage>
        </FormField>
        <Field>
          <FieldLabel>Mot de passe</FieldLabel>
          <PasswordToggleField autoComplete="new-password" defaultValue="iris-2026" />
          <FieldDescription>12 caractères minimum.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Code reçu par SMS</FieldLabel>
          <OneTimePasswordField />
        </Field>
        <FormSubmit asChild>
          <Button look="solid" className="self-start">
            Créer le compte
          </Button>
        </FormSubmit>
      </Form>
    </Section>
  );
}

function Flags() {
  return (
    <Section id="flag" title="Flag">
      <Row label="shape · size">
        {(["sm", "md", "lg"] as const).map((size) => (
          <Flag key={size} code="fr" size={size} />
        ))}
        <Flag code="jp" shape="square" size="lg" />
        <Flag code="br" shape="round" size="lg" />
        <Flag code="gb-sct" label="Écosse" size="lg" />
        <Flag code="zz" size="lg" />
      </Row>
      <Row label="dans le texte">
        <span className="inline-flex items-center gap-2">
          <Flag code="it" decorative size="sm" /> Italie
        </span>
        <span className="inline-flex items-center gap-2">
          <Flag code="ca" decorative size="sm" /> Canada
        </span>
      </Row>
    </Section>
  );
}

const TILES = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2] as const;

function NavbarDemo() {
  const [opacity, setOpacity] = useState([0.6]);
  return (
    <Section id="navbar" title="Navbar · opacité du fond et flou" plain>
      <Field className="max-w-sm">
        <FieldLabel>Opacité · {Math.round((opacity[0] ?? 0) * 100)} %</FieldLabel>
        <Slider value={opacity} onValueChange={setOpacity} min={0} max={1} step={0.05} />
      </Field>
      {/* The bar is sticky inside this scrolling box: what passes behind it is blurred. */}
      <div
        className="h-72 overflow-y-auto rounded-card border border-line"
        tabIndex={0}
        aria-label="Contenu sous la barre"
      >
        <Navbar opacity={opacity[0]} className="justify-between">
          <strong>iris-ui</strong>
          <Button look="glass" size="sm">
            Connexion
          </Button>
        </Navbar>
        <div className="grid grid-cols-3 gap-3 p-4">
          {TILES.map((tone, i) => (
            <div
              key={i}
              className="flex h-24 items-end rounded-field p-3 text-sm font-bold text-text-on-holo"
              style={{ background: `var(--tone-${tone})` }}
            >
              Carte {i + 1}
            </div>
          ))}
        </div>
      </div>
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
      <Surfaces />
      <Feedback />
      <MoreControls />
      <Navigation />
      <Security />
      <Flags />
      <NavbarDemo />
      <MapShowcase />
      <Toaster />
    </>
  );
}
