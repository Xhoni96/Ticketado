CREATE MIGRATION m1iyz7s67kev7fjyvwqjcoqm52j73zl2qgxa3o5pgwcfu6n5jysb7a
    ONTO m1g7eypzyaa2jhfo74cuzuhuigtkc6jdjrhuyy4bpjnhjl2l6c6jaq
{
  CREATE MODULE defaultSchema IF NOT EXISTS;
  CREATE TYPE defaultSchema::Note {
      CREATE REQUIRED PROPERTY body -> std::str;
      CREATE REQUIRED PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY title -> std::str;
  };
  CREATE TYPE defaultSchema::User {
      CREATE REQUIRED PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE defaultSchema::Note {
      CREATE REQUIRED LINK user -> defaultSchema::User {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  ALTER TYPE defaultSchema::User {
      CREATE MULTI LINK notes := (.<user[IS defaultSchema::Note]);
  };
  CREATE TYPE defaultSchema::Password {
      CREATE REQUIRED LINK user -> defaultSchema::User {
          ON TARGET DELETE DELETE SOURCE;
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY hash -> std::str;
  };
  ALTER TYPE defaultSchema::User {
      CREATE LINK password := (.<user[IS defaultSchema::Password]);
  };
};
