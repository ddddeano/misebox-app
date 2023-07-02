# Nuxt 3 Minimal Starter

1 firebase init hosting
2 npm install -D firebase-admin firebase-functions
.output/public

NO to the choice

{
"functions": {
"source": ".output/server",
"runtime": "nodejs18"
},
"hosting": {
"site": "misebox-78f9c",
"public": ".output/public",
"cleanUrls": true,
"rewrites": [
{
"source": "**",
"function": "server"
}
],
"ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
}
}
"NITRO_PRESET=firebase

# git:

git add. is for staging your changes, preparing them to be included in your next commit.
git commit -m "Your message here" is for creating a new commit (a 'snapshot' of your code at this point in time).
git git push origin main is for sending your commits to the remote repository (like GitHub), making these changes visible to others and stored off your local machine.

# npm

# deploy

"fire": npm run build"
delete output/server/node_modules -> open server in integrated terminal -> npm i -> close -> npx firebase deploy in main terminal

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
