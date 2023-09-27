# Table of Contents
- [UiTPAS Balie](#uitpas-balie)
   - [Local Development - Getting Started](#local-development---getting-started)
     - [Step 1: Specify Node.js Version](#step-1-specify-nodejs-version)
     - [Step 2: Setting Up Environment Variables](#step-1-setting-up-environment-variables)
     - [Step 3: Install Dependencies](#step-2-install-dependencies)
     - [Step 4: Start the Application](#step-3-start-the-application)
     - [Step 5: Login](#step-4-login)
   - [Guidebook](#guidebook)
      - [Main Framework & Libraries](#main-framework--libraries)
      - [Main Concept](#main-concept)
      - [Internationalization (I18n)](#internationalization-i18n)
      - [Environment Variables](#environment-variables)

# UiTPAS Balie

## Local Development - Getting Started

### Step 1: Specify Node.js Version

Before you begin, make sure you have Node.js version 18.16.1 installed (other versions might work, but was not tested). 
You can use `nvm` (Node Version Manager) to easily switch to this version if you have it installed. If not, you can install it with the following command:

```shell
nvm install 18.16.1
```

### Step 2: Setting Up Environment Variables

To get started with local development, you need to set up your environment variables.

1. Copy the `.env.example` file and rename it to `.env.local` using the following command:

   ```shell
   cp .env.example .env.local
   ```

2. By default, this frontend application uses the Test environment endpoints. To switch to the Acceptance environment, simply open the `.env.local` file and replace all instances of `test` with `acc`.

3. If you also want to run the AngularJS application locally, modify the `NEXT_PUBLIC_LEGACY_APP_URL` variable in the `.env.local` file to `http://localhost:9999`. You can then start the AngularJS application separately.

### Step 3: Install Dependencies

Install project dependencies using Yarn:

```shell
yarn install
```

### Step 4: Start the Application

You can now start the Next.js application with the following command:

```shell
yarn dev
```

### Step 5: Login

Once the application is running, open your web browser and navigate to [http://localhost:3000/app](http://localhost:3000/app) to access the login page.

After logging in, you will be redirected to the deployed frontend (e.g., [https://balie-test.uitpas.be/app](https://balie-test.uitpas.be/app)). Please note that browsers don't include cookies between different hosts by default, so you'll need to make a manual change to the cookies in your browser's DevTools:

1. Open your browser's DevTools (Pressing ⌥⌘ + i on a Mac).
2. Go to the "Application" tab.
3. Under the "Cookies" section in the left sidebar, select the domain.
4. Edit the "PHPSESSID" cookie: Check "Secure," and set "SameSite" to "None"
5. Return to [http://localhost:3000/app](http://localhost:3000/app), and you should now be logged in.

## Guidebook

### Main Framework & Libraries

This project is based on Next.js v13, utilizing the pages router. It also employs the following libraries:

- Joy UI (MUI) for UI components.
- Orval to generate React Query + Axios hooks for data fetching.
- FontAwesome (v6) icons.

### Main Concept

The project is designed for a gradual migration from the AngularJS application to this Next.js application. Whenever a route is available in the Next.js app, it is used; otherwise, an iframe with the AngularJS application is rendered.

Communication between the Next.js and AngularJS apps is facilitated through EventListeners on the Window object. The logic for this is encapsulated in `src/feature-legacy`. Once the migration is complete, the `feature-legacy` can be safely removed along with any associated references.

### Internationalization (I18n)

For text translation, `next-i18next` is used. You can find the translations in the `public/locales/nl/common.json` file.

⚠️ Remember to restart the server whenever you make changes to the JSON file.

### Environment Variables

All variables specified in the `.env(.local)` file should also be passed to `publicRuntimeConfig` in `next.config.js`, but only if they need to be available client-side.
