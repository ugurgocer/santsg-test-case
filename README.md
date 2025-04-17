# 🧩 SAN TSG Test Case – Frontend Assignment

This project was developed as part of the frontend technical assignment provided by SanTSG. It showcases a modern SPA architecture using React, TypeScript, Vite, TanStack Query, and Tailwind CSS. The app includes route management, authorization, form handling, and user-friendly UI components.

---

## 🚀 Technologies

- React (v18) + TypeScript
- Vite
- TanStack Query (v5)
- React Router (v6)
- React Context (Toast, Confirm)
- Tailwind CSS

> This project was initialized using the [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) template.

## 📁 Folder Structure

```
src/
├── api/         # API requests
├── components/  # Shared UI components
├── context/     # Global context providers
├── forms/       # Reusable form components
├── helpers/     # Utility functions
├── lib/         # External library definitions
├── pages/       # Page components
├── router/      # Route definitions and navigation helper
├── types/       # Shared types and enums
```

## 📦 Installation & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```


## ✅ Features

- Route-based page architecture
- Authorization and data fetching with TanStack Query
- Permission-based secured routes
- Navigation abstraction using `nav.get()` and `nav.go()`
- Posts and comments fetched from JSONPlaceholder API
- Lazy-loaded components
- Fully responsive design with Tailwind CSS
- Toast (notification) and Confirm (dialog) components

## 🌐 Available Routes

- `/login` – Dummy user login
- `/` – Dashboard (post & comment summary)
- `/posts` – List of all posts
- `/post/:id` – Post layout page for child routes
  - `/post/:id/edit` – Edit post
  - `/post/:id/comments` – View comments of the post
- `/post/create` – Create a new post
- `/403` – Forbidden page

## 👤 Dummy User

A dummy user is used for login. It is defined in `pages/Login.tsx`:

```ts
const dummyUser: IUser = {
  name: "John Doe",
  permissions: [
    EPermissions.VIEW_POSTS,
    EPermissions.VIEW_COMMENTS
  ]
};
```

## 🔐 Permission Enum

Permissions are defined in `types/EPermissions.ts`:

```ts
enum EPermissions {
  VIEW_POSTS,
  VIEW_COMMENTS,
  EDIT_POST,
  CREATE_POST
}
```

---

## 🙏 Final Note

Thank you for reviewing this assignment.  
I hope the project meets your expectations and demonstrates my understanding of scalable, modern frontend development practices.