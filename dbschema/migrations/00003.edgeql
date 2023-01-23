CREATE MIGRATION m1zvno5vdwc7arut4xebbi53yqmup3slzxwmot7fwnuurpmosv55ma
    ONTO m1iyz7s67kev7fjyvwqjcoqm52j73zl2qgxa3o5pgwcfu6n5jysb7a
{
  CREATE MODULE Xhoni IF NOT EXISTS;
  ALTER TYPE defaultSchema::User {
      DROP LINK notes;
  };
  ALTER TYPE defaultSchema::Note RENAME TO Xhoni::Note;
  ALTER TYPE defaultSchema::User {
      DROP LINK password;
  };
  ALTER TYPE defaultSchema::Password RENAME TO Xhoni::Password;
  ALTER TYPE defaultSchema::User RENAME TO Xhoni::User;
  ALTER TYPE Xhoni::User {
      CREATE MULTI LINK notes := (.<user[IS Xhoni::Note]);
      CREATE LINK password := (.<user[IS Xhoni::Password]);
  };
  DROP MODULE defaultSchema;
};
