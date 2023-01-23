module default {

  type User {
    required property email -> str { constraint exclusive };
    required property createdAt -> datetime { default := datetime_current() };
    link password := .<user[is Password];
    multi link notes := .<user[is Note];
  }

  type Password {
    required property hash -> str;
    required link user -> User {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
  }

  type Note {
    required property title -> str;
    required property body -> str;
    required property createdAt -> datetime { default := datetime_current() };
    required link user -> User {
      on target delete delete source;
    };
  }

}
# To explicitly declare a link as non-multi you need to use the single keyword.
#  If you don't specify multi or single, then edgedb will decide itself. For normal links, this will always just default to single,
#  but for computed links it's inferred from the expression
# https://www.edgedb.com/docs/datamodel/computeds#type-and-cardinality-inference