# Ticketado

Ticketing manager app built with [Remix.run](https://remix.run/).

## What's in the stack

- Web Framework: [Remix.run](https://remix.run/)
- Database with [EdgeDB](https://www.edgedb.com/)
- State management with: [Jotai](https://jotai.org/)
- Styling with [Tailwind](https://tailwindcss.com/)
- UI Components with [Headless UI](https://headlessui.com/)
- Schema validation with [Zod](https://zod.dev/)

## Development:

Node & npm versions are defined in package.json under `volta`.
If you use [volta](https://volta.sh/) (Highly recommended) as your tool manager then no need to do anything.

1. `npm install`.
2. `edgedb project init` to init the DB instance.
3. `npm run seed` to seed the db with the default user and some events and venues.
4. `npm run generate_edgeql` to generate the query builder.
5. `npm run generate_edgedb_types` to generate typescript types from the db schema.
6. `npm run dev`.

## Login credentials

email: root@remix.run
password: remix+edgedb=awesome
