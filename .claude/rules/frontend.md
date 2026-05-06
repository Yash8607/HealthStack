# Frontend Rules

Production-grade React/Next.js patterns for healthcare-ui.

## File Organization

**Feature-based structure:**
```
features/{featureName}/
  ├── components/          (React components, one per file)
  ├── hooks/               (custom React hooks)
  ├── api/                 (API service functions)
  ├── utils/               (utility functions)
  └── types.ts             (TypeScript interfaces for this feature)
```

**One component per file rule:** Each `.tsx` file exports exactly one component. No multiple components in one file.

## Component Patterns

**Functional components only** (no class components):
```typescript
export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  onSelect,
}) => {
  return <div>{hospital.name}</div>;
};
```

**Props interface first:**
```typescript
interface HospitalCardProps {
  hospital: Hospital;
  onSelect: (id: number) => void;
  loading?: boolean;
}
```

**Custom hooks for reusable logic:**
```typescript
export const useHospitalSearch = (query: string) => {
  const [data, setData] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // ...
  return { data, loading, error };
};
```

## State Management

- **Local state:** `useState` for component-only state
- **Shared state:** Context API or custom hooks if <3 components deep
- **Global state:** Custom hooks with Context if >3 levels or multiple unrelated features
- **API state:** Managed by API service hooks (useEffect + useState)

## API Integration

**Service layer (isolate HTTP calls):**
```typescript
// api/hospitalService.ts
export const hospitalService = {
  search: (query: string) =>
    api.get<Hospital[]>('/hospitals', { params: { search: query } }),
  getById: (id: number) =>
    api.get<HospitalDetail>(`/hospitals/${id}`),
  nearby: (lat: number, lng: number) =>
    api.get<Hospital[]>('/hospitals/nearby', {
      params: { lat, lng, radius: 5 },
    }),
};
```

**Custom hooks consume services:**
```typescript
export const useHospitalSearch = (query: string) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    hospitalService.search(query).then(setHospitals).finally(() => setLoading(false));
  }, [query]);
  
  return { hospitals, loading };
};
```

## TypeScript

**Strict mode required** in `tsconfig.json`:
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true
}
```

**Type interfaces before components:**
```typescript
interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  departments: Department[];
}

interface Department {
  id: number;
  name: string;
  doctors: Doctor[];
}
```

**Avoid `any` type.** Use generics instead:
```typescript
// Good
const useApi = <T,>(url: string) => Promise<T>;

// Bad
const useApi = (url: string) => Promise<any>;
```



## Styling Rules

Follow the existing project styling setup.

Use:
- Tailwind CSS if Tailwind exists
- CSS modules if project uses CSS modules
- SCSS if project uses SCSS
- MUI only if the project already uses MUI
- plain CSS only if that is the current pattern

Do not introduce a new styling library without user permission.

When converting from Stitch:
- preserve colors as closely as possible
- preserve border radius
- preserve shadows
- preserve spacing
- preserve layout grouping
- preserve visual hierarchy
- preserve button sizing
- preserve card sizing
- preserve font sizes as closely as possible
- preserve original section order

## Mobile Stitch Design Rule

If the Stitch screen is designed in mobile view, recreate the mobile design exactly first.

Mobile-first means:
- Match the Stitch mobile width layout closely.
- Preserve original spacing, padding, card width, button height, font size, and section order.
- Do not convert mobile cards into desktop grids unless explicitly asked.
- Do not stretch the mobile layout too much on desktop.
- Keep the main page container centered on larger screens if needed.
- Use a max-width close to the Stitch frame width, usually `375px`, `390px`, or the exact width returned by Stitch.
- Add desktop responsiveness only after the mobile view matches the Stitch design.
- On desktop preview, keep the mobile page centered instead of expanding the full page layout.
- Do not redesign the mobile screen into a web dashboard layout.


## Performance

- **Code splitting:** Next.js auto-splits at page level, use `dynamic()` for heavy components
- **Image optimization:** Use Next.js `<Image>` component
- **Memoization:** `React.memo()` only for expensive computations
- **Lazy loading:** Intersection Observer for long lists

## Error Handling

**Global error boundary:**
```typescript
export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const handler = (event: ErrorEvent) => setError(event.error);
    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);
  
  if (error) return <ErrorPage error={error} />;
  return children;
};
```

**API error handling in hooks:**
```typescript
useEffect(() => {
  api.get('/hospitals')
    .catch((err) => {
      if (err.response?.status === 404) setError('Not found');
      else setError('Server error');
    });
}, []);
```

## Mobile-First

- **Design for mobile first** (320px+)
- **Use Tailwind responsive prefixes:** `sm:`, `md:`, `lg:`
- **Test on device** before marking complete

## Testing

- **Unit tests** for hooks and utilities (Jest)
- **Component tests** for critical UI (React Testing Library)
- **E2E tests** for main flows (Playwright)
- **Coverage target:** 80%+

## Naming Conventions

- **Components:** PascalCase (`HospitalCard.tsx`)
- **Hooks:** camelCase with `use` prefix (`useHospitalSearch.ts`)
- **Utils/services:** camelCase (`hospitalService.ts`)
- **Types:** PascalCase with suffix (`Hospital`, `HospitalCardProps`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)

## Imports

**Order:**
1. External (React, libraries)
2. Internal (other features, shared)
3. Relative (current feature)

```typescript
import React from 'react';
import { useRouter } from 'next/router';

import { useApi } from '@/shared/hooks';
import { hospitalService } from './api/hospitalService';
```

## Code Review Checklist

- [ ] One component per file
- [ ] Props interface defined
- [ ] TypeScript types applied (no `any`)
- [ ] API calls in service layer
- [ ] Custom hooks extract logic
- [ ] Error states handled
- [ ] Loading states shown
- [ ] Mobile-responsive
- [ ] Accessibility attributes (alt, aria-label)
- [ ] No prop drilling >3 levels
