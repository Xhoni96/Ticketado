CREATE MIGRATION m177ypg6rm5ynki2fmbejju5fzv24ymzu7bt2vzly77neu7ez5cutq
    ONTO m1s2ttk2n2axjcewvtjfv5flzphuoe7oazxqwklnj5madl2kggnaaa
{
  ALTER TYPE default::Event {
      ALTER PROPERTY onSale {
          SET default := false;
      };
  };
  ALTER TYPE default::Event {
      ALTER PROPERTY published {
          SET default := false;
      };
  };
  ALTER TYPE default::Event {
      ALTER PROPERTY registration {
          SET default := false;
      };
  };
};
