# eCommerce-Application

## Project Overview

This project is an eCommerce platform designed to bridge the cultural and geographical gap between Japan and othe world by providing a specialized online marketplace. The platform focuses on offering a wide range of Japanese products to consumers, who are interested in authentic Japanese goods but face challenges in accessing them locally. Our mission is to make Japanese products accessible, affordable, and deliver a seamless shopping experience.

## Stack

HTML, SCSS, TypeScript, React, Material UI, Webpack, Jest, eCommerce API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:pdasya/eCommerce-Application.git
   cd eCommerce-Application

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Set up environment variables**
   - Copy the `.env.example` file to a new file named `.env`.
   - Modify the `.env` file to include your local environment variables and API keys necessary for the project.

### Available scripts

`start` : Launches webpack in development server mode and automatically opens the browser.

```bash
   npm run start
```

`dev` : Builds the project using webpack in development mode.

```bash
   npm run dev
```

`prod` : Builds the project using webpack in production mode.

```bash
   npm run prod
```

`lint` : Runs ESLint to check all `.ts` and `.tsx` files in the project and automatically fixes detected issues.

```bash
   npm run lint
```

`ci:lint` : Runs ESLint to check all `.ts` and `.tsx` files in the project without automatic fixing.

```bash
   npm run ci:lint
```

`format` : Runs Prettier to format all files in the project.

```bash
   npm run format
```

`ci:format` : Checks all project files with Prettier for formatting compliance.

```bash
   npm run ci:format
```

`stylelint` : Runs Stylelint to automatic fix all `.css` and `.scss` files, where possible.

```bash
   npm run stylelint
```

`ci:stylelint` : Runs Stylelint to checks all `.css` and `.scss` files in the project without automatic fixing.

```bash
   npm run ci:stylelint
```

`prepare` : Sets up Husky hooks

```bash
   npm run prepare
```

`pre-push` : Checks the branch name before pushing to the remote repository.

```bash
   npm run pre-push
```

`pre-commit` : Runs `lint-staged` to apply linters only to the staged files before committing.

```bash
   npm run pre-commit
```

`test` : Runs tests using Jest.

```bash
   npm run test
```
