CREATE MIGRATION m1d45ngowopasr4n5typvviwyd5cppnwvquedzzr2ife4slqq4btiq
    ONTO m1atybtlogqaiygtrte3pikugwbh52nfn46s2jrtxdxnv7rctopskq
{
  ALTER TYPE default::Event {
      ALTER PROPERTY endDate {
          SET TYPE std::str USING ('2023-02-09');
      };
  };
  ALTER TYPE default::Event {
      ALTER PROPERTY startDate {
          SET TYPE std::str USING ('2023-02-09');
      };
  };
};
