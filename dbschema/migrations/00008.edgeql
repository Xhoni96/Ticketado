CREATE MIGRATION m1vw3xkprl25x6svd2xp64t6ahduoj4g5jhduxy5fqicvfu2zynebq
    ONTO m1z6jxpcsqiyebgfh7lnkflqhnmdftfb2lqmkyauzx77tdrb2bypiq
{
  ALTER TYPE default::Venue {
      CREATE REQUIRED LINK user -> default::User {
          ON TARGET DELETE DELETE SOURCE;
          SET REQUIRED USING (SELECT
              default::User
          FILTER
              (default::User.id = default::Venue.user.id)
          );
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK venues := (.<user[IS default::Venue]);
  };
};
