CREATE MIGRATION m1zfpdzzauaoexfab2rqlglabfncvant7u6m2corkp2m6l4egietka
    ONTO m1grnprdylc37sm7s5xy4fh5qkl43cocrnbz5c7uhrkgagjyr773na
{
  ALTER TYPE default::Venue {
      DROP PROPERTY memberid;
  };
};
