# neon-vercel-kysely

This repo demonstrates [kysely](https://github.com/koskimas/kysely) and [kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen) using [Neon's serverless driver](https://www.npmjs.com/package/@neondatabase/serverless) on [Vercel](https://vercel.com/) Edge Functions.

We implement a simple app that generates a JSON listing of the user's nearest 10 UNESCO World Heritage sites via IP geolocation (data copyright © 1992 – 2022 [UNESCO/World Heritage Centre](https://whc.unesco.org/en/syndication/)).


## How it works

The kysely package doesn't attempt to import the `pg` package, making it straightforward to use with `@neondatabase/serverless`.

For kysely-codegen, we generate an ordinary TypeScript `.ts` file that's explicitly included among and imported from the source files (instead of a `.d.ts` declaration file that's tucked away inside `node_modules`). This prevents errors by ensuring the types are included when the Edge Function is built and deployed. The types file is at `./kysely-types.ts`.


## Deploy

* Ensure the `psql` client is installed.

* Create a Neon database and make a note of the connection string from the [Neon console](https://console.neon.tech/).

* Clone this repo, then:

```bash
# get dependencies
npm install

# create DATABASE_URL environment variable, remote and local
npx vercel env add DATABASE_URL  # paste in the connection string and select all environments
npx vercel env pull .env.local  # now bring it down into ./.env.local for local use

# create the schema and copy data to DB
(source .env.local \
 && curl -s https://gist.githubusercontent.com/jawj/a8d53ff339707c65128af83b4783f4fe/raw/45dbcc819b00ecb72f80b0cf91e01b3d055662b5/whc-sites-2021.psql \
 | psql $DATABASE_URL)

# update kysely types from DB
npm run update-kysely-types

# test
npx vercel dev

# ... and deploy
npx vercel deploy
```

## Feedback and support

Please visit [Neon Community](https://community.neon.tech/) or [Support](https://neon.tech/docs/introduction/support).