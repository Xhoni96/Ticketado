CREATE MIGRATION m1rzjhg6uwspdi2mdkvn66ov2jhpopmg4kimzzdryeiuuidybbmera
    ONTO m1vfpdxxin6ce5wpuoz2ql4rzeyytuk2u75iyrf7pkhulo5lmd3j3q
{
  ALTER TYPE default::Event {
      ALTER PROPERTY createdAt {
          RESET OPTIONALITY;
      };
  };
};
