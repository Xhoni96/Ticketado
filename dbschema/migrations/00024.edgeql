CREATE MIGRATION m1zjpma2rabnchncrjriviblrdwr4v2oweehsvyaquimaypj4bircq
    ONTO m1cgn2fzb5paeziun6uksa32kkbnuw6ixfcetnrecwxfjtvp2mpx6a
{
  ALTER TYPE default::Event {
      CREATE LINK venue -> default::Venue {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE default::Venue {
      DROP LINK event;
  };
};
