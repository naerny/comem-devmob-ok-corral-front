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

## Important informations
### Mobile compatibility
Some web api features seem to only work on Firefox mobile.
Please use Firefox mobile for the app to fully work.

## Common troubleshooting
### API Call returns network error
The API server on the backend app might have crashed and need to be relaunch.

### Loss of synch between admin and mobile terminals
Some data in localStorage might have not been deleted correctly on mobile terminals.

Use private navigation to easily discard localStorage data by closing the tab (you can use mobile debug, but this require more setting up).