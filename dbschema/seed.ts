import { createClient } from "edgedb";
import bcrypt from "bcryptjs";
import e from "../dbschema/edgeql-js";
const client = createClient();

async function seed() {
  const email = "root@remix.run";
  const pass = "remix+edgedb=awesome";

  const user = e.select(e.User, () => ({
    email: true,
    filter_single: { email },
  }));

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

  // create events
  await e
    .set(
      e.insert(e.Event, {
        name: "My first event",
        description: "Hello, world!",
        startDate: new Date(),
        user,
      }),
      e.insert(e.Event, {
        name: "My second event",
        description: "Hello, world!",
        startDate: new Date(),
        user,
      })
    )
    .run(client);

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
