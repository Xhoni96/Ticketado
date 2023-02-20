CREATE MIGRATION m1yidyxyf7dh6foyrxgeqqqan6ettq2lvctfwyqt5virse2u75l42a
    ONTO m177ypg6rm5ynki2fmbejju5fzv24ymzu7bt2vzly77neu7ez5cutq
{
  ALTER TYPE default::Event {
      CREATE LINK venue -> default::Venue;
  };
};
