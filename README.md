# The Bon Pet - Order Management System (OMS)

A modern web application for managing orders for The Bon Pet company. This system helps track, filter, and manage orders across different delivery methods and statuses.   

## Features

- **User Authentication**: Secure login using Clerk
- **Order Management**: View, filter, and sort orders
- **Delivery Tracking**: Integration with Ninja Van for tracking orders
- **Responsive UI**: Built with React and Tailwind CSS
- **Search Functionality**: Quick search across order data

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, class-variance-authority
- **Authentication**: Clerk
- **State Management**: React Query (Tanstack Query)
- **HTTP Client**: Axios
- **Routing**: React Router
- **UI Components**: Radix UI (Shadcn)
- **Animation**: Motion
- **Form Validation**: Zod
- **Date/Time Handling**: Luxon
- **Development Tools**: Vite, ESLint, Prettier, Husky, Vitest

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- Yarn or npm

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd tbp-oms
```

2. Install dependencies
```bash
yarn install
```

3. Create a `.env.local` file based on the example below
```
VITE_ENVIRONMENT=dev
VITE_BASE_URL=[your-api-url]
VITE_CLERK_PUBLISHABLE_KEY=[your-clerk-key]
```

### Development

Start the development server:
```bash
yarn dev
```

### Testing

Run tests:
```bash
yarn test
```

Run tests with UI:
```bash
yarn test:ui
```

### Building for Production

```bash
yarn build
```

Preview the production build:
```bash
yarn preview
```

## Project Structure

- `/src`: Application source code
  - `/components`: Reusable UI components
  - `/hooks`: Custom React hooks
  - `/services`: API service functions
  - `/utils`: Helper functions
  - `/views`: Page components
  - `/configs`: Configuration files
  - `/@types`: TypeScript type definitions

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

Proprietary - All rights reserved

---

© 2024 The Bon Pet