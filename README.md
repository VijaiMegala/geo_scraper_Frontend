# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Frontend App

## React Application Setup and Running Guide

### Prerequisites
Ensure you have the following installed:
- **Node.js** (version 14.0.0 or later)
- **npm** (Node Package Manager)

---

## Getting Started

### 1. Clone the Repository
Run the following commands to clone the repository and navigate to the project directory:

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

### 2. Install Dependencies
Install all the necessary project dependencies:

```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory to set up environment variables (if needed). Example:

```env
REACT_APP_API_URL=https://your-api-endpoint.com
```

### 4. Running the Application

#### Development Mode
To run the application in development mode, execute:

```bash
npm run dev
```

This will start the development server and open the application in your default browser.

- **Local URL:** [http://localhost:5173](http://localhost:5173)
- Any changes you make to the source code will automatically reflect in the browser.

#### Production Build
To create a production-ready build, use:

```bash
npm run build
```

The optimized build files will be available in the `build/` directory.

---

## Project Structure

Below is the directory structure for your React application:

```
my-react-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── (Component files go here)
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

---

## Troubleshooting

If you encounter issues:
1. Ensure all dependencies are correctly installed by running `npm install` again.
2. Verify that you're using a compatible **Node.js** version.
3. Double-check the values in your `.env` file, especially the `REACT_APP_API_URL`.

---

## License
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for more details.

---

### Backend Setup
For the backend, clone the following repository:  
[Backend Repository](https://github.com/VijaiMegala/geo_scraper)
