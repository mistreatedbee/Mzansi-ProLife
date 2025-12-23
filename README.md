# Mzansi Prolife Development Institute NPC

A modern web application for the Mzansi Prolife Development Institute NPC, featuring a comprehensive questionnaire system, admin dashboard, and AI-powered chat assistant.

## Features

- 🏠 **Home Page** - Beautiful landing page with organization overview
- 📋 **Questionnaire System** - 8 different submission forms:
  - Become a Social Change Ambassador
  - Order / Buy Products
  - Advertise a Company
  - Make a Donation
  - Apply for Job Opportunities
  - Submit a Question or Comment
  - Community Outreach Participation
  - Speak to an Agent
- 📊 **Admin Dashboard** - Manage and track all submissions
- 💬 **AI Chat Widget** - Interactive assistant with organization knowledge
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Framer Motion** - Animations
- **React Query** - Data fetching and caching
- **Base44** - Backend API integration
- **Sonner** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Mzansi-Prolife-Development-Institute-NPC-main
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Base44 API credentials:
```
VITE_BASE44_API_KEY=your_api_key_here
VITE_BASE44_PROJECT_ID=your_project_id_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── src/
│   ├── api/
│   │   └── base44Client.ts      # Base44 API client
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── chat/                # Chat widget
│   │   ├── home/                # Home page sections
│   │   ├── layout/              # Header and Footer
│   │   └── questionnaire/       # Form components
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── Pages/                   # Page components
│   ├── utils/
│   │   └── index.ts             # Application utilities
│   ├── App.tsx                  # Main app component
│   ├── Layout.tsx               # Layout wrapper
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── Entities/                    # Data model schemas
├── Components/                 # Legacy component location (for reference)
├── Pages/                       # Legacy page location (for reference)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Configuration

### Base44 API Client

The Base44 API client is located in `src/api/base44Client.ts`. Currently, it contains placeholder implementations. You need to:

1. Install the Base44 SDK (if available) or implement the API calls
2. Replace the placeholder functions with actual API calls
3. Configure authentication using environment variables

### Routing

Routes are defined in `src/App.tsx`:
- `/` - Home
- `/about` - About page
- `/projects` - Projects page
- `/questionnaire` - Questionnaire system
- `/donate` - Donation page
- `/contact` - Contact page
- `/admin` - Admin dashboard

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Organization Information

- **Name**: Mzansi Prolife Development Institute NPC
- **Registration**: 2025/205554/08
- **Tax Number**: 9201973287
- **Address**: 32 Bell Street | Caltex Building, Office No. 106, Nelspruit, 1200, South Africa

## Contact

- **Email**: mzansiprolifedevelopment@gmail.com
- **Phone**: 079 822 2269 (Vodacom)
- **WhatsApp**: 073 735 3200

## Banking Details

- **Account Name**: Mzansi Prolife Development Institute NPC
- **Bank**: Capitec Business
- **Account Number**: 1053 5763 31

## License

This project is proprietary software for Mzansi Prolife Development Institute NPC.

## Notes

- The Base44 API client needs to be configured with actual credentials
- File uploads require Base44 file storage integration
- The chat widget uses Base44's LLM integration
- All form submissions are stored via Base44 entities
