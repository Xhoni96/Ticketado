CREATE MIGRATION m1z6jxpcsqiyebgfh7lnkflqhnmdftfb2lqmkyauzx77tdrb2bypiq
    ONTO m1rzjhg6uwspdi2mdkvn66ov2jhpopmg4kimzzdryeiuuidybbmera
{
  CREATE TYPE default::Venue {
      CREATE PROPERTY address -> std::str;
      CREATE PROPERTY city -> std::str;
      CREATE PROPERTY country -> std::str;
      CREATE PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY memberid -> std::int16;
      CREATE PROPERTY name -> std::str;
      CREATE PROPERTY number -> std::str;
      CREATE PROPERTY region -> std::str;
      CREATE PROPERTY street -> std::str;
      CREATE PROPERTY vmt_id -> std::str;
      CREATE PROPERTY zip -> std::str;
  };
};
