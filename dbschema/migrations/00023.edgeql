CREATE MIGRATION m1cgn2fzb5paeziun6uksa32kkbnuw6ixfcetnrecwxfjtvp2mpx6a
    ONTO m1snqtfxqcxihqih3qpc2jnr6wowunrfccu2r5ssmbz54gt3vjfmaa
{
  ALTER TYPE default::Event {
      DROP LINK venue;
  };
};
