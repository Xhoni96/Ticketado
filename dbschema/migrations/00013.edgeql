CREATE MIGRATION m1ysgmlcg6ehtglrm7w656vnmrxn4rnbmm4a6ma27vxidlhq7eqioa
    ONTO m1bgrwwmewvkmwalskjwmwjkn2f6vrxcfklovkrascfed7wwu5pn4q
{
  ALTER TYPE default::Event {
      CREATE PROPERTY memberid -> std::uuid;
  };
};
