CREATE MIGRATION m1s2ttk2n2axjcewvtjfv5flzphuoe7oazxqwklnj5madl2kggnaaa
    ONTO m1epash2omdt3h7uoahampjtdut7x4wzndlgtiskcl77qavuhknepa
{
  ALTER TYPE default::Event {
      CREATE PROPERTY inventory -> std::int16;
      CREATE PROPERTY registration -> std::bool;
  };
};
