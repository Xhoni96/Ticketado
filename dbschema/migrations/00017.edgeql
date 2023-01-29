CREATE MIGRATION m1epash2omdt3h7uoahampjtdut7x4wzndlgtiskcl77qavuhknepa
    ONTO m1lcpmjjmgdaopyn4qxqnjuk6rxqu5suhgccb5wiw4uab3dp2gpxpa
{
  ALTER TYPE default::Venue {
      CREATE PROPERTY address -> std::str;
  };
};
