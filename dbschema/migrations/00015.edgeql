CREATE MIGRATION m1v3ehgwosf2oyhzwuehm2birdit2hbvsve6piptwxrbiazgm46zxq
    ONTO m1lzzy7l6hwdhbjtrby2l5elrtckc6iqlkjqeceder6cg5ub5pkwra
{
  ALTER TYPE default::Event {
      DROP PROPERTY memberId;
      DROP PROPERTY venueId;
  };
  ALTER TYPE default::Venue {
      DROP PROPERTY memberId;
  };
};
