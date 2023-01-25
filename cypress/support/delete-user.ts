// Use this to delete a user by their email
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts username@example.com
// and that user will get deleted

import { installGlobals } from "@remix-run/node";

import { createClient } from "edgedb";

import e from "../../dbschema/edgeql-js";

const client = createClient();

installGlobals();

async function deleteUser(email: string) {
  if (!email) {
    throw new Error("email required for login");
  }
  if (!email.endsWith("@example.com")) {
    throw new Error("All test emails must end in @example.com");
  }

  try {
    const res = await e
      .delete(e.User, () => ({
        filter_single: { email },
      }))
      .run(client);

    if (!res?.id) throw "User not found, so no need to delete";
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

deleteUser(process.argv[2]);
