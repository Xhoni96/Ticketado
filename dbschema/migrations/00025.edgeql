CREATE MIGRATION m1rovrpecx35dgn5tykxu5ohbzozxztxtdsohr6zlqw5wpz5ltpl5q
    ONTO m1zjpma2rabnchncrjriviblrdwr4v2oweehsvyaquimaypj4bircq
{
  ALTER TYPE default::Event {
      DROP LINK venue;
  };
};
