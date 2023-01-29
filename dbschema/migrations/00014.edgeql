CREATE MIGRATION m1lzzy7l6hwdhbjtrby2l5elrtckc6iqlkjqeceder6cg5ub5pkwra
    ONTO m1ysgmlcg6ehtglrm7w656vnmrxn4rnbmm4a6ma27vxidlhq7eqioa
{
  ALTER TYPE default::Event {
      ALTER PROPERTY memberid {
          RENAME TO memberId;
      };
  };
  ALTER TYPE default::Event {
      CREATE PROPERTY venueId -> std::str;
  };
  ALTER TYPE default::Event {
      DROP PROPERTY venueid;
  };
  ALTER TYPE default::Venue {
      ALTER PROPERTY memberid {
          RENAME TO memberId;
      };
  };
};
