CREATE MIGRATION m1bgrwwmewvkmwalskjwmwjkn2f6vrxcfklovkrascfed7wwu5pn4q
    ONTO m1zfpdzzauaoexfab2rqlglabfncvant7u6m2corkp2m6l4egietka
{
  ALTER TYPE default::Venue {
      CREATE PROPERTY memberid -> std::uuid;
  };
};
