import { createClient } from "edgedb";
import e, { $infer } from "../dbschema/edgeql-js";

const client = createClient();

export { client, e };

export type { $infer };
