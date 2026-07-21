# STK Menu Management Frontend

A modern menu management interface built with Next.js and TypeScript.

This application provides an intuitive user interface for managing hierarchical menus through a recursive tree view with full CRUD functionality.

---

## Features

- Recursive Menu Tree
- Search Menu
- Create Menu at Any Level
- Edit Menu
- Delete Menu
- Expand All / Collapse All
- Responsive Sidebar
- Toast Notifications
- Modern UI with Tailwind CSS

---

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- Sonner

---

## Project Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Breadcrumb.tsx
│   │   ├── Header.tsx
│   │   ├── MainContent.tsx
│   │   └── Sidebar.tsx
│   │
│   └── menu/
│       ├── DetailPanel.tsx
│       ├── MenuDropdown.tsx
│       ├── MenuManager.tsx
│       ├── MenuModal.tsx
│       ├── MenuNode.tsx
│       ├── MenuToolbar.tsx
│       └── MenuTree.tsx
│
├── lib/
│   └── api.ts
│
└── types/
    └── menu.ts
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Update the value according to your backend server.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## Application Overview

The frontend communicates with the backend REST API to manage hierarchical menus.

Implemented features include:

- Display recursive menu tree
- Create root menus
- Create child menus
- Update existing menus
- Delete menus
- Search menus recursively
- Expand and collapse menu hierarchy
- Responsive layout for desktop and mobile devices

---

## API Integration

The frontend communicates with the backend using the following endpoints.

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/menus`     | Retrieve menu tree |
| POST   | `/menus`     | Create menu        |
| PUT    | `/menus/:id` | Update menu        |
| DELETE | `/menus/:id` | Delete menu        |

---

## Design Decisions

### Recursive Tree Rendering

The menu tree is rendered recursively, allowing unlimited nesting levels while keeping the implementation clean and maintainable.

### Type Safety

The project is fully written in TypeScript without using the `any` type.

### Component-Based Architecture

The UI is organized into reusable layout and feature components to improve maintainability and scalability.

### Responsive Layout

The sidebar remains fixed while the main content area becomes scrollable, providing a consistent dashboard experience across screen sizes.

---

## Future Improvements

- Drag and Drop Menu Ordering
- Keyboard Navigation
- Unit Testing
- End-to-End Testing
- Dark Mode Support

---

## Backend Repository

This project depends on the STK Menu Management Backend API.

Please ensure the backend server is running before starting the frontend application.
