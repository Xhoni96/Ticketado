CREATE MIGRATION m1vfpdxxin6ce5wpuoz2ql4rzeyytuk2u75iyrf7pkhulo5lmd3j3q
    ONTO m1lei6z3u3eyglqvdn4pr4rfrf3pyjvs7hv64jlbracwdvnp5u2tyq
{
  ALTER TYPE default::User {
      DROP LINK notes;
  };
  ALTER TYPE default::Note RENAME TO default::Event;
  ALTER TYPE default::Event {
      ALTER PROPERTY body {
          RENAME TO name;
      };
  };
  ALTER TYPE default::Event {
      CREATE PROPERTY draft -> std::bool;
  };
  ALTER TYPE default::Event {
      CREATE PROPERTY endDate -> std::datetime;
  };
  ALTER TYPE default::Event {
      CREATE PROPERTY memberid -> std::int16;
  };
  ALTER TYPE default::Event {
      CREATE PROPERTY onSale -> std::bool;
  };
  ALTER TYPE default::Event {
      CREATE PROPERTY published -> std::bool;
  };
  ALTER TYPE default::Event {
      CREATE REQUIRED PROPERTY startDate -> std::datetime {
          SET REQUIRED USING (std::datetime_current());
      };
  };
  ALTER TYPE default::Event {
      CREATE PROPERTY thumbnail -> std::str;
  };
  ALTER TYPE default::Event {
      ALTER PROPERTY title {
          RENAME TO description;
      };
  };
  ALTER TYPE default::Event {
      ALTER PROPERTY description {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE default::Event {
      CREATE PROPERTY venueid -> std::int16;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK events := (.<user[IS default::Event]);
  };
};
