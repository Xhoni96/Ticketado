CREATE MIGRATION m1grnprdylc37sm7s5xy4fh5qkl43cocrnbz5c7uhrkgagjyr773na
    ONTO m1aqy4yd5gm3om66xsrqobxmddrwutghitnyc75hwxglp64dni2xfa
{
  ALTER TYPE default::Venue {
      CREATE PROPERTY memberid -> std::str;
  };
};
