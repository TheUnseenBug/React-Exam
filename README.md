# Dara Music App - Component Overview

## Main Components

(https://x47fqbpt2q.ufs.sh/f/gFjC50OLd3eU9S9oBzWM2iW1deIh3k7zY6puryXg4twRxKsQ)

### Home (`/src/pages/Home.tsx`)

The application's home page that handles:

- Spotify authentication via URL parameters
- Switching between login and search views
- Rendering of search fields and result lists

### SearchBar (`/src/components/SearchBar.tsx`)

Search component that enables:

- Real-time search in Spotify's API
- Debounced search functionality (500ms delay)
- Displays both artist and song results
- Formats and presents search results in two separate lists

### MusicPlayer (`/src/components/PlayerComponent.tsx`)

- Real-time player using spotifySDK
- Show Artist and song you are listening to
- Able to handle play/pause, skip and volume change
- Slider that shows progress and slider to scroll in song

## Helper Functions

### searchSpotify (`/src/helpers/searchSpotify.ts`)

API integration function that:

- Handles searches against Spotify's API
- Limits results to 5 artists and 5 songs
- Includes error handling and typing of results

### SpotifyPlayer (`/src/helpers/SpotifyPlayer.ts`)

Handles the implementation of the SpotifyPlayer

- Starts new song when global song state changes
- Connects to spotify sdk
- Strong error handling

### useAuth (`/src/helpers/useAuth.ts`)

Function that handles authentication workflow

- Looks for accesstoken if you are new user run auth workflow
- Handles refreshing accesstoken before it runs out

## Layout and Navigation

### Router (`/src/router/Router.tsx`)

Defines the application's routing structure with the following routes:

- `/` - Home page
- `/SignIn` - Sign-in page
- `/artist/:id` - Artist page
- `/reset` - Reset page
- `*` - 404 page

### RootLayout (`/src/components/layouts/RootLayout.tsx`)

Main layout that:

- Wraps all pages
- Contains a common header
- Manages rendering of the active route

### Header (`/src/components/layouts/Header.tsx`)

Navigation header that includes:

- App logo with a link to the home page
- Logout functionality
- Integration with LogoutModal

### LogoutModal (`/src/components/layouts/LogoutModal.tsx`)

Modal component for logging out that:

- Displays a confirmation dialog
- Handles confirm/cancel actions
- Stylish design with a dark theme

## Technical Details

### State Management

- Uses Zustand for global state management (`useAccessStore`)
- Manages access tokens and authentication status

### Styling

- Uses Tailwind CSS for styling
- Consistent color scheme with custom colors
- Responsive design with flex layouts

### Authentication

- Implements Spotify OAuth flow
- Manages access tokens securely
- Automatic redirection after authentication

### Error Handling

- Comprehensive error handling in API calls
- Fallback states for failed searches
- Clear user feedback

## Usage

1. The user logs in via Spotify
2. After authentication, the search interface is displayed
3. Search results update automatically as the user types
4. The user can log out via the header menu

## Development

To further develop these components:

1. Run npm install in the backend folder
2. Start the backend server using npm devStart
3. Run npm install in the frontend folder
4. Start the frontend server using npm run dev
5. Have fun coding!
