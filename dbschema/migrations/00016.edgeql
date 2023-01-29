CREATE MIGRATION m1lcpmjjmgdaopyn4qxqnjuk6rxqu5suhgccb5wiw4uab3dp2gpxpa
    ONTO m1v3ehgwosf2oyhzwuehm2birdit2hbvsve6piptwxrbiazgm46zxq
{
  ALTER TYPE default::Venue {
      DROP PROPERTY address;
  };
};
