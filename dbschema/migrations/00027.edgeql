CREATE MIGRATION m1wnolh4fy7nqjodl46oee7lw3oriqw2imlnpcgj4fwf7v22sbgbiq
    ONTO m1hkqb7gokerts6o2hc5vrydy3njix45hq6o3btvcggipcoloexcsq
{
  ALTER TYPE default::Venue {
      DROP PROPERTY name;
  };
};
