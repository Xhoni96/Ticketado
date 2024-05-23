import bcrypt from "bcryptjs";

import { e, client } from "~/db.server";

export async function getUserById(id: string) {
  return await e
    .select(e.User, () => ({
      ...e.User["*"],
      filter_single: { id: e.uuid(id) },
    }))
    .run(client);
}

export async function getUserByEmail(email: string) {
  return await e
    .select(e.User, () => ({
      ...e.User["*"],
      // filter_single: e.op(user.email, "=", email),
      filter_single: { email },
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
  const userQuery = e.select(e.User, () => ({
    ...e.User["*"],
    password: {
      ...e.Password["*"],
    },
    // filter_single tells that you expect just 1 result
    filter_single: { email },
  }));

  const user = await userQuery.run(client);

  if (!user?.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password.hash);

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
