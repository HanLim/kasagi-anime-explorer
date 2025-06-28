# kasagi-anime-explorer

## Instructions to Run the App

### Local Development
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Production Build
1. **Build the app:**
   ```sh
   npm run build
   ```
2. **Preview the production build:**
   ```sh
   npm run preview
   ```

### Docker
You can run the app in a container:
```sh
docker compose up --build
```
The app will be available at [http://localhost:4173](http://localhost:4173).

### Testing
Run unit tests with:
```sh
npm test
```

---

## Known Limitations or Trade-offs

- **API Limiting:** The Jikan API has quite a number of limitation, like query size, rate limiter.
- **No Backend:** The user actions can only be stored in the frontend via session storage, or at most local storage. Needs a backend to make the website fully functioning
- **UI:** The UI is responsive for most devices, but edge cases are not fully tested and optimised. Animations are not included as well.
- **Error Handling:** Basic error messages for Jikan API are shown via toast notifications; however, a website that solely relied on external API will be rendered useless when it id down.


---

## Thought Process and Architecture Decisions

### Frontend Stack
- Built with React and Vite for a fast, modern development experience.
- Tailwind CSS is used for styling.
- Zustand is used for state management because it's simple and lightweight.
- React Router handles client-side routing.

### Modular Code
- The components are refactored as small as possible (not 100% due to time constraints) for reuse. For example, `Card` and `GenericButton` can be wrapper and enhanced into like `DashboardCard` / `SubmitButton` / `AddToCartButton` with their base CSS applied/
- Same concept to the `BaseApi` that later on inherited into `JikanApi`.

### State Management
- Anime list, genres, and favourites are managed globally in Zustand (`src/store/store.jsx`).
- Favourites are stored in `sessionStorage` for the current browser session only.

### Testing
- Unit tests are written with Jest and React Testing Library (see `src/components/__tests__`).
- Test cases are not complete at all, and only some components / utility functions are tested for the sake of the coding challenge.

### Styling
- Tailwind CSS is used for utility-first styling and quick prototyping.

### Containerization
- Docker and Docker Compose are provided for easy deployment.

### Trade-offs
- For this MVP, Zustand and useState are used for simplicity and speed. This limits scalability and advanced features.
- No backend means all user actions are stored only in session storage; a backend would be needed for a full-featured app.
- Relying on an external API means the app is unusable if the API is down or rate-limited.
