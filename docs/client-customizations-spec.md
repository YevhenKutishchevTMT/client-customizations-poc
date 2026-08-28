# Specification: Client Customizations

## 1. Motivation

The app ships to clients only as a compiled build, without source code. Different clients need different branding and content in specific parts of the UI. Forking the app per client isn't viable: code diverges, fixes must be replicated manually, and a fork leaks the source.

Solution: mark specific components as extension points ("slots"), and let each client define, for any slot, what renders before it, after it, or instead of it — from one shared codebase, without client access to that code.

## 2. Terminology

- **Client** — an external party receiving a customized build. Maps to a `src/clients/<name>` folder.
- **Slot** — a component marked with a unique id as an extension point.
- **Override** — a client's customization for a slot: `before` / `after` / `replace`.

## 3. Functional requirements

For any slot, a client can set:
- `before` — rendered before the original
- `after` — rendered after the original
- `replace` — rendered instead of the original

Always combined:

```
render(slot) = Before + (Replace ?? Original) + After
```

With no override, the slot renders the original unchanged. Whether before/after/replace receive the original component's props depends on the specific slot.

## 4. Architecture

**Marking a slot** (our code) — HOC:

```tsx
export default withOverride('checkout.summary')(CheckoutSummary)
```

Slot-ness belongs to the component definition, not the call site — if a component renders in multiple places, they all become the same slot.

**Registering an override** (client code) — decentralized, each file self-contained:

```ts
// src/clients/acme/PromoBanner.ts
registerComponentOverride({
  id: 'checkout.summary',
  before: PromoBannerBefore,
  replace: AcmeCheckoutSummary,
})
```

Files are auto-discovered (`import.meta.glob`), no manual import list. Registering the same `id` twice is an error.

**Typing** — one central file:

```ts
// src/slots/types.ts
export type SlotPropsMap = {
  'checkout.summary': { total: number; currency: string }
  'layout.footer': {}
}
export type SlotId = keyof SlotPropsMap
```

Both `withOverride` and `registerComponentOverride` are typed against it — a wrong id or mismatched override props is a compile error.

**Errors** — no isolation. An override's render error behaves like any other React render error.

**File layout**:

```
src/
  slots/      — system core (types.ts, registry.ts, withOverride.tsx)
  clients/
    acme/
    globex/
```

## 5. Build & delivery

**Production**: one build per client — `CLIENT=acme npm run build`. Only `src/clients/acme` ships. Clients have no repo access — they send override files, we add them to the repo and rebuild.

**Dev mode**: a client switcher UI, active client stored in `localStorage`, switching reloads the page. Client list and override loading both come from one lazy `import.meta.glob('/src/clients/*/*.{ts,tsx}')`: its keys populate the UI list; only the active client's files are actually imported (so two clients overriding the same slot id never collide). This makes dev bootstrap async. An empty client folder is valid, just invisible in the switcher until it has a file.

## 6. Example

Slot `checkout.summary` is marked in our code. Client `acme` registers `before: PromoBanner, replace: AcmeCheckoutSummary`. With `CLIENT=acme`, `PromoBanner` renders followed by `AcmeCheckoutSummary`. Client `globex`, with no override, gets the original `CheckoutSummary`.

## 7. Out of scope

- Dev client-switcher UI design
- Build script implementation (tree-shaking details)
- Formal slot id naming convention
- Customization outside slots (themes, favicon, etc.)
- Validating client overrides before merging into the repo
