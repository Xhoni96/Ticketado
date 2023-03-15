import { createClient } from "edgedb";
import bcrypt from "bcryptjs";
import e from "../dbschema/edgeql-js";
const client = createClient();

async function seed() {
  const email = "root@remix.run";
  const pass = "remix+edgedb=awesome";

  const user = e.select(e.User, () => ({
    email: true,
    id: true,
    filter_single: { email },
  }));

  // const userData = await user.run(client);

  // cleanup the existing database
  await e.delete(user).run(client);

  // create password and user nestedly
  const hash = await bcrypt.hash(pass, 10);
  await e
    .insert(e.Password, {
      hash,
      user: e.insert(e.User, {
        email,
      }),
    })
    .run(client);

  const venues = [
    e.insert(e.Venue, {
      name: "My first venue",
      // memberId: userData?.id,
      address: "Myshugi 3/42, Lviv",
      city: "Lviv",
      country: "Ukraine",
      region: "Lvivska",
      street: "Myshugi 3/42",
      number: "1111",
      zip: "79034",

      user,
    }),
    e.insert(e.Venue, {
      name: "My second venue",
      // memberId: userData?.id,
      address: "Sevastopol sq, Kyiv",
      city: "Kyiv",
      country: "Ukraine",
      region: "Kyiv",
      street: "Sevastopol sq",
      number: "1111",
      zip: "79034",

      user,
    }),
  ];

  // create events
  await e
    .set(
      e.insert(e.Event, {
        name: "My first event",
        description: "Hello, world!",
        startDate: String(new Date().getTime()),
        published: false,
        onSale: false,
        draft: false,
        registration: true,
        inventory: 1,
        venue: venues[0],
        // venueId: venues[0].id,
        user,
      }),
      e.insert(e.Event, {
        name: "My second event",
        description: "Hello, world!",
        startDate: String(new Date().getTime() + 99999999),
        published: false,
        onSale: false,
        draft: false,
        registration: false,
        inventory: 0,
        venue: venues[1],
        // venueId: venues[1].id,
        user,
      }),
      e.insert(e.Event, {
        name: "My third event",
        description: "Hello, world!",
        startDate: String(new Date().getTime()),
        published: false,
        onSale: false,
        draft: true,
        registration: false,
        inventory: 0,
        venue: venues[1],
        // venueId: venues[1].id,
        user,
      })
    )
    .run(client);

  // create venues

  // await e.set(...venues).run(client);
  // await venues.run

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    client.close();
  });
