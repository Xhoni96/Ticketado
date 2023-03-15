CREATE MIGRATION m1tjrntoyaoy2kgwvdm4byuuxptbj7rvpmlukt4ysxpvu7tmmnip6q
    ONTO m1d45ngowopasr4n5typvviwyd5cppnwvquedzzr2ife4slqq4btiq
{
  ALTER TYPE default::Event {
      ALTER PROPERTY startDate {
          SET TYPE std::int64 USING (1678388784310);
      };
  };
};
