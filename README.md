# okcorral

## Project Setup

```sh
npm install
```

### Set env variables
In `.env`, set VITE_API_URL and VITE_WS_UR with you local IP address. 

### Compile and Hot-Reload for Development

```sh
npm run dev
```
#### How to get your local IP address
```sh
npm run dev -- --host
```
This will provide you with the local IP your app runs on.

### Compile and Minify for Production

```sh
npm run build
```

## Backend app
To work with this app, the backend must run on branch `devmob`. Branch `main` is not correctly configured for this site.
### Backend repo
https://github.com/ClementKunzi/comem-archioweb-ok-corral-api

## Important informations
### Mobile compatibility
Some web api features used in this app seem to only work on Firefox mobile.
Please use Firefox mobile for the app to fully work.

## Common troubleshooting
### API Call returns network error
The API server on the backend app might have crashed and need to be relaunch.

### Loss of sync between admin and mobile terminals
Some data in localStorage might have not been deleted correctly on mobile terminals.

Use private navigation to easily discard localStorage data by closing the tab (you can use mobile debug, but this require more setting up).

## Showcase
Ok Corral allows two players to take part in a duel, using their mobile phone as a gun.

### 1. Admin terminal
A desktop computer is used as the platform to manage games.
Managing games require creating and account and loging in to create game session.

#### Resources page
A logged user can see all user, session and games created on the page `ressources`

### 2. Mobile terminal
Two user with their phone are needed to play the game. They do not need an account to play. They only need the session code given by the admin terminal.

Once they have joined the session, the game can be launched from the admin computer. They will have to use their phone like a revolver to "shoot" each other when they admin computer gives the signal.

### 3. Game example
*Here is an example of how a game should play out*

#### 01. User creates and account 
A user creates an account on the register page. Creating an account requires a username, password and address email.

#### 02. User loggin
If the user already has an account, they can he can login form the loggin page

#### 03. Create a session
A logged in user can create a session from the homepage.

A Session code is displayed for the mobile users to join.

The admin user can see how many users have joined the session.

#### 04. Joining the session
The mobile homepage allows the mobile user to enter the session code. Once they are in the session, they are informed that the app is waiting for the admin to launch the game.

#### 05. Launching the game
Once tow players are waiting in the session, the admin can launch the game. A timer appears on the admin screen. A disabled shoot button appears on the mobile screens. Once the countdown reaches 0, the shoot buttons are active.

#### 06. Game results
They admin screen shows the winner. The admin can then close the session.

#### How should mobile users play the game
When the game countdown reaches 0, users need to be holding their phones facing down.
Then they need to raise their phone horizontally before clicking the shoot button.

To determine the winner, the app checks the phone orientation at the end of the countdown and when the shoot button is clicked. If the phone is not in the right orientation at those moments, the user will be considered a "cheater" and loose.