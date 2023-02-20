CREATE MIGRATION m1vlhq56ohj5dur3apxqloskzqhfxblq3zh7v2tgupvmdxoylgavea
    ONTO m1yidyxyf7dh6foyrxgeqqqan6ettq2lvctfwyqt5virse2u75l42a
{
  ALTER TYPE default::Event {
      ALTER LINK venue {
          ON TARGET DELETE ALLOW;
      };
  };
};
