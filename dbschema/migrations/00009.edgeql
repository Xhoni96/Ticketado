CREATE MIGRATION m1aqy4yd5gm3om66xsrqobxmddrwutghitnyc75hwxglp64dni2xfa
    ONTO m1vw3xkprl25x6svd2xp64t6ahduoj4g5jhduxy5fqicvfu2zynebq
{
  ALTER TYPE default::Event {
      DROP PROPERTY memberid;
  };
  ALTER TYPE default::Venue {
      DROP PROPERTY memberid;
  };
};
