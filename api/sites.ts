import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect, sql } from 'kysely';
import type { DB } from '../kysely-types';

export const config = {
  runtime: 'edge',
  regions: ['fra1'],  // fra1 = Frankfurt: pick the Vercel region nearest your Neon DB
};

export default async (req: Request, ctx: any) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

  const longitude = parseFloat(req.headers.get('x-vercel-ip-longitude') ?? '-122.47');
  const latitude = parseFloat(req.headers.get('x-vercel-ip-latitude') ?? '37.81');

  const distance = sql<number>`location <-> st_makepoint(${longitude}, ${latitude})`;
  const link = sql<string>`'https://whc.unesco.org/en/list/' || id_no || '/'`;
  
  const query = db
    .selectFrom('whc_sites_2021')
    .select(['id_no', 'name_en', 'category', link.as('link'), distance.as('distance')])
    .orderBy('distance')
    .limit(10);

  /*
  // uncomment these lines for visibility into the issued SQL + parameters
  const querySQL = query.compile();
  console.log(querySQL.sql, querySQL.parameters);
  */

  const sites = await query.execute();
  ctx.waitUntil(pool.end());

  return new Response(JSON.stringify({ longitude, latitude, sites }, null, 2));
}
