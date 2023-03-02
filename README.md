# neon-vercel-kysely

This repo demonstrates [kysely](https://github.com/koskimas/kysely) and [kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen) using [Neon's serverless driver](https://www.npmjs.com/package/@neondatabase/serverless) on [Vercel](https://vercel.com/) Edge Functions.

We implement a simple app that generates a JSON listing of the user's nearest 10 UNESCO World Heritage sites via IP geolocation (data copyright © 1992 – 2022 [UNESCO/World Heritage Centre](https://whc.unesco.org/en/syndication/)).

Note: at the time of writing, WebSockets are not supported in the local Vercel development environment, so `npx vercel dev` is not usable.


## How it works

The kysely package doesn't attempt to import the `pg` package, making it straightforward to use in a serverless environment.

For kysely-codegen, we generate an ordinary TypeScript `.ts` file that's explicitly included among and imported from the source files, instead of a `.d.ts` declaration file that's tucked away inside `node_modules`. This prevents errors by ensuring the types are included when the Edge Function is built and deployed. The types file is at `./kysely-types.ts`.


## Deploy

* Ensure the `psql` client is installed

* Create a Neon database and make a note of the connection string.

* Clone this repo, then:

```bash
# get dependencies
npm install

# set up Vercel
npx vercel login
npx vercel link

# create DATABASE_URL environment variable, remote and local
npx vercel env add DATABASE_URL  # paste in the connection string: postgres://...
npx vercel env pull .env.local  # now bring it down into ./.env.local for local use

# create the schema and copy data to DB
(source .env.local \
 && curl -s https://gist.githubusercontent.com/jawj/a8d53ff339707c65128af83b4783f4fe/raw/45dbcc819b00ecb72f80b0cf91e01b3d055662b5/whc-sites-2021.psql \
 | psql $DATABASE_URL)

# update kysely types from DB
npm run update-kysely-types

# ... and deploy
npx vercel deploy
```

* Now visit the deployed function at the URL given
