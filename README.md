# InterioLab Frontend

React.js frontend application for InterioLab luxury interior design showcase.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API URL

The default API URL is `http://localhost:8080/api`. To change it:

1. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://your-backend-url.com/api
```

2. Or edit `src/utils/api.js` directly.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer component
│   └── ProtectedRoute.jsx  # Route protection
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── About.jsx       # About page
│   ├── Services.jsx    # Services page
│   ├── Portfolio.jsx   # Portfolio gallery
│   ├── Contact.jsx     # Contact page
│   └── admin/          # Admin pages
│       ├── AdminLogin.jsx
│       └── AdminDashboard.jsx
├── utils/              # Utilities
│   └── api.js          # API client with Axios
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for page transitions and scroll effects
- **Image Gallery**: Portfolio with filtering and lightbox
- **Contact Form**: Integrated with backend API
- **Admin Panel**: Secure dashboard for content management

## Customization

### Colors

Edit `tailwind.config.js` to customize colors:
- Royal blue: `royal-*`
- Gold: `gold-*`
- Charcoal gray: `charcoal-*`

### Fonts

Fonts are loaded from Google Fonts in `index.html`. You can change:
- Body: Inter
- Headings: Playfair Display
- Display: Montserrat

## Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:8080/api
```

## Deployment

### Vercel/Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable `VITE_API_URL` to your backend URL

### Static Hosting

1. Run `npm run build`
2. Upload the `dist` folder contents to your web server
3. Configure server to serve `index.html` for all routes (for React Router)

## Troubleshooting

### API Connection Issues
- Check if backend is running on port 8080
- Verify CORS settings in backend
- Check browser console for errors

### Images Not Loading
- Ensure backend uploads folder is accessible
- Check image URLs in project data
- Verify CORS allows image requests

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires 18+)

