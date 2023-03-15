CREATE MIGRATION m1zoxe654gceb5ieg7shtfceauekaxqiqdjvxzre2lwmrhotyspswq
    ONTO m1tjrntoyaoy2kgwvdm4byuuxptbj7rvpmlukt4ysxpvu7tmmnip6q
{
  ALTER TYPE default::Event {
      ALTER PROPERTY startDate {
          SET TYPE std::str USING ('1678316400000');
      };
  };
};
