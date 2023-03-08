CREATE MIGRATION m1atybtlogqaiygtrte3pikugwbh52nfn46s2jrtxdxnv7rctopskq
    ONTO m1wnolh4fy7nqjodl46oee7lw3oriqw2imlnpcgj4fwf7v22sbgbiq
{
  ALTER TYPE default::Venue {
      CREATE REQUIRED PROPERTY name -> std::str {
          SET REQUIRED USING ('Untitled');
      };
  };
};
