# Frontend Architecture - Healthcare UI

Next.js 14 + React 18 feature-based architecture for mobile-first healthcare patient portal.

## Overview

**Scope:** Delhi NCR patient-facing MVP (anonymous access)
**Language:** TypeScript (strict mode)
**Framework:** Next.js 14 with React 18
**Styling:** Tailwind CSS
**State Management:** React hooks + Context API
**HTTP Client:** Axios with interceptors

## Project Structure

```
healthcare-ui/
├── src/
│   ├── pages/                  (Next.js routes → URL structure)
│   │   ├── index.tsx           (/ → homepage)
│   │   ├── emergency/
│   │   │   └── index.tsx       (/emergency → emergency mode)
│   │   ├── hospitals/
│   │   │   ├── index.tsx       (/hospitals → search listing)
│   │   │   └── [id].tsx        (/hospitals/:id → details)
│   │   └── first-aid/
│   │       ├── index.tsx       (/first-aid → library)
│   │       └── [category].tsx  (/first-aid/:category → by category)
│   │
│   ├── features/                (Feature-based modules)
│   │   ├── hospital/
│   │   │   ├── components/
│   │   │   │   ├── HospitalCard.tsx
│   │   │   │   ├── HospitalDetails.tsx
│   │   │   │   ├── HospitalSearch.tsx
│   │   │   │   └── HospitalFilters.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useHospitalSearch.ts
│   │   │   │   └── useHospitalDetails.ts
│   │   │   ├── api/
│   │   │   │   ├── hospitalService.ts
│   │   │   │   └── types.ts
│   │   │   └── utils/
│   │   │       └── hospitalUtils.ts
│   │   │
│   │   ├── emergency/
│   │   │   ├── components/
│   │   │   │   ├── EmergencyButton.tsx
│   │   │   │   ├── NearbyHospitals.tsx
│   │   │   │   ├── EmergencyConfirmation.tsx
│   │   │   │   └── EmergencyTypeSelector.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useEmergencyRequest.ts
│   │   │   │   └── useNearbyHospitals.ts
│   │   │   ├── api/
│   │   │   │   ├── emergencyService.ts
│   │   │   │   └── types.ts
│   │   │   └── utils/
│   │   │       ├── geolocation.ts
│   │   │       └── emergencyUtils.ts
│   │   │
│   │   └── firstAid/
│   │       ├── components/
│   │       │   ├── FirstAidList.tsx
│   │       │   ├── FirstAidDetail.tsx
│   │       │   ├── FirstAidSearch.tsx
│   │       │   └── FirstAidCategory.tsx
│   │       ├── hooks/
│   │       │   └── useFirstAid.ts
│   │       ├── api/
│   │       │   ├── firstAidService.ts
│   │       │   └── types.ts
│   │       └── data/
│   │           └── firstAidContent.ts
│   │
│   ├── shared/                  (Reusable across features)
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── LocationPicker.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── hooks/
│   │   │   ├── useApi.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useGeolocation.ts
│   │   │   ├── usePagination.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── api/
│   │   │   ├── client.ts        (Axios setup)
│   │   │   ├── endpoints.ts     (API route constants)
│   │   │   └── interceptors.ts  (Request/response interceptors)
│   │   ├── utils/
│   │   │   ├── validation.ts
│   │   │   ├── formatting.ts
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   ├── styles/
│   │   │   ├── globals.css      (Global styles)
│   │   │   ├── variables.css    (CSS custom properties)
│   │   │   └── tailwind.config.js
│   │   └── types/
│   │       └── index.ts         (Shared TypeScript types)
│   │
│   ├── layouts/
│   │   ├── AppLayout.tsx        (Main layout wrapper)
│   │   └── EmptyLayout.tsx      (Minimal layout)
│   │
│   ├── contexts/                (React Context for shared state)
│   │   ├── LocationContext.tsx  (User location state)
│   │   └── AppContext.tsx       (Global app state)
│   │
│   └── App.tsx / _app.tsx       (App entry point)
│
├── public/                      (Static assets)
│   ├── first-aid-images/
│   ├── hospital-icons/
│   └── icons/
│
├── __tests__/
│   ├── unit/
│   │   ├── hospital/
│   │   ├── emergency/
│   │   └── firstAid/
│   ├── integration/
│   └── e2e/
│
├── .env.local                   (Local environment)
├── .env.example
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── package.json
└── README.md
```

## Pages & Routing

### URL Routing (Next.js)

| Page File | URL | Purpose |
|-----------|-----|---------|
| `pages/index.tsx` | `/` | Home - action buttons |
| `pages/emergency/index.tsx` | `/emergency` | Emergency workflow |
| `pages/hospitals/index.tsx` | `/hospitals` | Search & listing |
| `pages/hospitals/[id].tsx` | `/hospitals/:id` | Hospital details |
| `pages/first-aid/index.tsx` | `/first-aid` | First-aid library |
| `pages/first-aid/[category].tsx` | `/first-aid/:category` | By category |

### Page Components

**Homepage (`pages/index.tsx`):**
```typescript
export default function Home() {
  return (
    <AppLayout>
      <div className="grid grid-cols-2 gap-4">
        <ActionCard href="/emergency" title="Emergency" icon="🚨" />
        <ActionCard href="/hospitals" title="Find Hospital" icon="🏥" />
        <ActionCard href="/first-aid" title="First Aid" icon="🩹" />
        <ActionCard href="/emergency" title="Nearby" icon="📍" />
      </div>
    </AppLayout>
  );
}
```

**Emergency Flow (`pages/emergency/index.tsx`):**
```typescript
export default function Emergency() {
  const [location, setLocation] = useGeolocation();
  const [hospitals, setHospitals] = useNearbyHospitals(location);
  const [requestId, setRequestId] = useState<string | null>(null);
  
  const handleEmergency = async (hospitalId: number, type: string) => {
    const result = await emergencyService.submit({
      latitude: location.lat,
      longitude: location.lng,
      emergencyType: type,
      hospitalId,
    });
    setRequestId(result.data.requestId);
  };
  
  return (
    <AppLayout>
      {!requestId ? (
        <>
          <EmergencyTypeSelector />
          <NearbyHospitalsList hospitals={hospitals} onSelect={handleEmergency} />
        </>
      ) : (
        <EmergencyConfirmation requestId={requestId} />
      )}
    </AppLayout>
  );
}
```

**Hospital Listing (`pages/hospitals/index.tsx`):**
```typescript
export default function Hospitals() {
  const [query, setQuery] = useState('');
  const { hospitals, loading, error, pagination } = useHospitalSearch(query);
  
  return (
    <AppLayout>
      <SearchBar value={query} onChange={setQuery} placeholder="Search hospitals..." />
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <HospitalGrid hospitals={hospitals} />
      <Pagination {...pagination} />
    </AppLayout>
  );
}
```

**Hospital Details (`pages/hospitals/[id].tsx`):**
```typescript
export default function HospitalDetail({ params }: { params: { id: string } }) {
  const { hospital, loading } = useHospitalDetails(parseInt(params.id));
  
  return (
    <AppLayout>
      {loading && <Loading />}
      {hospital && (
        <>
          <HospitalHeader hospital={hospital} />
          <DepartmentsList departments={hospital.departments} />
          <BedAvailability beds={hospital.beds} />
          <CallButton phone={hospital.phone} />
        </>
      )}
    </AppLayout>
  );
}
```

**First-Aid Library (`pages/first-aid/index.tsx`):**
```typescript
export default function FirstAidLibrary() {
  const [category, setCategory] = useState<string | null>(null);
  const { articles, categories } = useFirstAid(category);
  
  return (
    <AppLayout>
      <CategoryFilter categories={categories} onSelect={setCategory} />
      <FirstAidGrid articles={articles} />
    </AppLayout>
  );
}
```

## Component Architecture

### Component Hierarchy

```
AppLayout
  ├── Header
  │   └── Navigation
  ├── Main Content
  │   ├── Page Component
  │   │   ├── Feature Components
  │   │   │   ├── Container Component
  │   │   │   │   ├── Shared Components
  │   │   │   │   └── Child Components
  │   │   │   └── Presentational Components
  │   │   └── Feature Hooks
  │   │       ├── useApi (shared)
  │   │       └── Custom Hooks (feature-specific)
  │   └── Error Boundary
  └── Footer
```

### Component Types

**1. Container Components (Smart)**
- Manage state
- Fetch data
- Handle business logic
- Pass props to presentational components

```typescript
// features/hospital/components/HospitalSearch.tsx
export const HospitalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const { hospitals, loading, error } = useHospitalSearch(query);
  
  return <HospitalSearchUI hospitals={hospitals} loading={loading} onQueryChange={setQuery} />;
};
```

**2. Presentational Components (Dumb)**
- Pure functions
- Receive all data via props
- Only render UI
- Highly reusable

```typescript
// shared/components/HospitalCard.tsx
interface HospitalCardProps {
  hospital: Hospital;
  onSelect?: (id: number) => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onSelect }) => {
  return (
    <div className="card" onClick={() => onSelect?.(hospital.id)}>
      <h3>{hospital.name}</h3>
      <p>{hospital.address}</p>
      <p>⭐ {hospital.rating}</p>
    </div>
  );
};
```

**3. Compound Components**
- Flexible, composable API
- Parts work together

```typescript
// Usage:
<Card>
  <Card.Header>Hospital Name</Card.Header>
  <Card.Body>Hospital details</Card.Body>
  <Card.Footer>Action buttons</Card.Footer>
</Card>
```

## Custom Hooks

### Reusable Hooks

**useApi (for any API call):**
```typescript
export const useApi = <T,>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setLoading(true);
    apiClient.get<ApiResponse<T>>(url, options)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
};
```

**useGeolocation:**
```typescript
export const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => setError(err.message)
    );
  }, []);
  
  return [location, error];
};
```

**useDebounce:**
```typescript
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

**useHospitalSearch (feature-specific):**
```typescript
export const useHospitalSearch = (query: string, page: number = 0) => {
  const debouncedQuery = useDebounce(query, 300);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  
  useEffect(() => {
    if (!debouncedQuery) {
      setHospitals([]);
      return;
    }
    
    setLoading(true);
    hospitalService.search({ search: debouncedQuery, page, size: 20 })
      .then(res => {
        setHospitals(res.data);
        setPagination(res.pagination);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [debouncedQuery, page]);
  
  return { hospitals, loading, error, pagination };
};
```

## State Management

### Local State (useState)
- Component-only state
- Form inputs, toggles, local UI state

```typescript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({ name: '', phone: '' });
```

### Context API (Shared State)
- User location (global)
- App-wide settings (theme, language)
- Emergency request status

```typescript
// contexts/LocationContext.tsx
interface LocationContextType {
  location: { lat: number; lng: number } | null;
  setLocation: (loc: { lat: number; lng: number }) => void;
}

export const LocationContext = React.createContext<LocationContextType | null>(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be inside LocationProvider');
  return context;
};

// Usage in component:
export const MyComponent = () => {
  const { location } = useLocation();
  return <div>Lat: {location?.lat}</div>;
};
```

### API State (Server State)
- Hospital data (cached)
- Emergency request status (real-time via WebSocket)
- Managed via custom hooks + Context

## API Integration Layer

### Client Setup (Axios)

```typescript
// shared/api/client.ts
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json';
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error)
);

export default apiClient;
```

### Service Layer

```typescript
// features/hospital/api/hospitalService.ts
export const hospitalService = {
  search: (params: HospitalSearchParams) =>
    apiClient.get<ApiResponse<HospitalListResponse>>('/hospitals', { params }),
  
  getById: (id: number) =>
    apiClient.get<ApiResponse<HospitalDetail>>(`/hospitals/${id}`),
  
  nearby: (lat: number, lng: number, radius: number = 5) =>
    apiClient.get<ApiResponse<Hospital[]>>('/hospitals/nearby', {
      params: { latitude: lat, longitude: lng, radius },
    }),
};
```

### Type Safety

```typescript
// features/hospital/api/types.ts
export interface Hospital {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  rating?: number;
}

export interface HospitalDetail extends Hospital {
  departments: Department[];
  beds: BedInfo;
}
```

## Styling with Tailwind CSS

### Structure

```css
/* shared/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
  }
  
  .card {
    @apply border rounded-lg p-4 shadow-sm hover:shadow-md transition;
  }
}
```

### Usage in Components

```typescript
export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  return (
    <div className="card hover:scale-105 transition">
      <h3 className="text-lg font-bold text-gray-900">{hospital.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{hospital.address}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-500">⭐ {hospital.rating || 'N/A'}</span>
        <button className="btn-primary text-sm">View Details</button>
      </div>
    </div>
  );
};
```

### Responsive Design (Mobile-First)

```typescript
// Mobile first, then scale up
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Single column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### CSS Variables for Theming

```css
/* shared/styles/variables.css */
:root {
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-error: #ef4444;
  --spacing-base: 0.25rem;
}
```

## Error Handling

### Error Boundary Component

```typescript
// shared/components/ErrorBoundary.tsx
interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorPage />;
    }
    return this.props.children;
  }
}
```

### API Error Handling

```typescript
// In hooks:
const { data, error } = useHospitalSearch(query);

if (error) {
  return <div className="alert alert-error">{error.message}</div>;
}
```

### User-Friendly Error Messages

```typescript
const getErrorMessage = (error: ApiError): string => {
  if (error.status === 404) return 'Not found';
  if (error.status === 500) return 'Server error, try again later';
  return error.message || 'Something went wrong';
};
```

## Testing

### Unit Tests (Jest + React Testing Library)

```typescript
// __tests__/unit/hospital/HospitalSearch.test.tsx
import { render, screen } from '@testing-library/react';
import { HospitalSearch } from '@/features/hospital/components/HospitalSearch';

describe('HospitalSearch', () => {
  it('renders search input', () => {
    render(<HospitalSearch />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
  
  it('calls API on search', async () => {
    render(<HospitalSearch />);
    // Test implementation
  });
});
```

### E2E Tests (Playwright)

```typescript
// __tests__/e2e/hospital-search.spec.ts
import { test, expect } from '@playwright/test';

test('search hospital flow', async ({ page }) => {
  await page.goto('http://localhost:3000/hospitals');
  await page.fill('input[placeholder*="search"]', 'Apollo');
  await expect(page.locator('text=Apollo Hospital')).toBeVisible();
});
```

## Performance Optimization

### Code Splitting (Next.js Auto)
- Each page = separate chunk
- Lazy-loaded on route

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/hospital-logo.jpg"
  alt="Hospital"
  width={200}
  height={200}
  priority  // Only for above-the-fold images
/>
```

### Lazy Loading Components

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/features/hospital/components/HeavyList'), {
  loading: () => <Loading />,
  ssr: false,  // Client-side only
});
```

### Memoization

```typescript
export const HospitalCard = React.memo(({ hospital, onSelect }: Props) => {
  return <div onClick={() => onSelect(hospital.id)}>{hospital.name}</div>;
});
```

## Accessibility

### WCAG 2.1 AA Compliance

```typescript
<img
  src="/hospital.jpg"
  alt="Apollo Hospital location map"  // Descriptive alt text
/>

<button
  aria-label="Open emergency help"
  className="btn-primary"
>
  🚨 Emergency
</button>

<nav aria-label="main navigation">
  {/* Navigation links */}
</nav>
```

## TypeScript Strict Mode

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

**Never use `any` type:**

```typescript
// ❌ Bad
const getHospital = (id: any): any => { ... }

// ✅ Good
const getHospital = (id: number): Promise<Hospital> => { ... }
```

## Future Scalability

### Phase 2: Native Mobile
- React Native sharing hooks, services, types
- Same API layer
- Platform-specific UI components

### Phase 3: Internationalization (i18n)
- Multi-language support
- RTL support (for Indian languages)

### Phase 4: Progressive Web App (PWA)
- Offline support (service workers)
- Push notifications
- App-like experience

### Phase 5: Advanced Features
- Real-time tracking (WebSocket)
- Video consultation (WebRTC)
- Payment integration
- User accounts (optional)

## Development Workflow

### Development Server

```bash
npm run dev    # http://localhost:3000
```

### Linting & Type Checking

```bash
npm run lint         # ESLint
npm run type-check   # TypeScript
npm run format       # Prettier
```

### Testing

```bash
npm test                 # Jest
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Build

```bash
npm run build    # Next.js production build
npm start        # Run production build
```

## Summary

- **Feature-based structure** for scalability
- **Hooks + Context** for state management
- **Service layer** for API abstraction
- **TypeScript strict mode** for type safety
- **Tailwind CSS** for styling
- **Mobile-first responsive design**
- **Error boundaries** for error handling
- **Custom hooks** for reusability
- **Testing** at unit, integration, E2E levels
- **Performance optimized** (code-splitting, lazy-loading, memoization)
- **Accessible** (WCAG 2.1 AA)
- **Ready to scale** to microservices, mobile, PWA
