# Express.js coding challenge Project

This project is a simple Express.js backend built with TypeScript, that parses data from a json file and calculates an average score from it, based off of some specific specifications.

### 1. Clone the Repository

First, clone the project repository to your local machine:

### 2. Set Environment variables

Create a .env file in the root directory of the project and set a PORT environment variable

### 3. Populate scores

Put json files containing questionaire scores in the resources folder.

### 4. start the express server

```bash
npm run dev
```

## USAGE

run the tests via
```bash
npx jest
```

send a get request to with the parameter file localhost:PORT/scores?file=
(file being the name of the file you want to request an average score from)
