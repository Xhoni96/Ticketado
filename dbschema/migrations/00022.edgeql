CREATE MIGRATION m1snqtfxqcxihqih3qpc2jnr6wowunrfccu2r5ssmbz54gt3vjfmaa
    ONTO m1vlhq56ohj5dur3apxqloskzqhfxblq3zh7v2tgupvmdxoylgavea
{
  ALTER TYPE default::Venue {
      CREATE LINK event -> default::Event {
          ON TARGET DELETE ALLOW;
      };
  };
};
