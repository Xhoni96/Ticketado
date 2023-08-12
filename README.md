# Ticketado

Ticketing manager app built with Remix.run.

## What's in the stack

Web Framework: Remix.run
Database: EdgeDB
State Manager: Jotai
Styling: TailwindCss
Component library: Headless UI
Schema Validation: Zod

How to run the project locally:

Node & npm versions are defined in package.json under `volta`.
If you use volta as your tool manager then no need to do anything.

1. Run `npm install`.
2. Run `edgedb project init` to init the DB instance
3. Run `npm run seed` to seed the db with the default user and some events and venues.
4. Run `npm run generate_edgeql` to generate the query builder
5. Run `npm run generate_edgedb_types` to generate typescript types from the db schema
6. Run `npm run dev`.

Login credentials

email: root@remix.run
password: remix+edgedb=awesome
