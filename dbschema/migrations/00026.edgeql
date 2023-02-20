CREATE MIGRATION m1hkqb7gokerts6o2hc5vrydy3njix45hq6o3btvcggipcoloexcsq
    ONTO m1rovrpecx35dgn5tykxu5ohbzozxztxtdsohr6zlqw5wpz5ltpl5q
{
  ALTER TYPE default::Event {
      CREATE LINK venue -> default::Venue {
          ON TARGET DELETE ALLOW;
      };
  };
};
