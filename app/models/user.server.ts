import bcrypt from "bcryptjs";

import { e, client, $infer } from "~/db.server";

export async function getUserById(id: string) {
  return await e
    .select(e.User, (user) => ({
      ...e.User["*"],
      filter: e.op(user.id, "=", e.uuid(id)),
    }))
    .run(client);
}

export async function getUserByEmail(email: string) {
  return await e
    .select(e.User, (user) => ({
      ...e.User["*"],
      filter: e.op(user.email, "=", email),
    }))
    .run(client);
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = e.insert(e.User, {
    email,
  });
  const pass = e.insert(e.Password, {
    hash: hashedPassword,
    user: user,
  });
  const created = await e
    .select(pass, () => ({
      id: true,
      user: { ...e.User["*"] },
    }))
    .run(client);
  return created.user;
}

export async function deleteUserByEmail(email: string) {
  return e
    .delete(e.User, (user) => ({
      filter: e.op(user.email, "=", email),
    }))
    .run(client);
}

export async function verifyLogin(email: string, password: string) {
  const userQuery = e.select(e.User, (user) => ({
    ...e.User["*"],
    password: {
      ...e.Password["*"],
    },
    filter: e.op(user.email, "=", email),
  }));
  const users = await userQuery.run(client);
  const user = users[0];
  console.log(user, "user");

  if (!user?.password) {
    return null;
  }

  // const isValid = await bcrypt.compare(password, user[0].password.hash);
  console.log(password === user.password.hash, "password");

  // if (!isValid) {
  //   return null;
  // }

  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
