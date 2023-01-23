CREATE MIGRATION m1lei6z3u3eyglqvdn4pr4rfrf3pyjvs7hv64jlbracwdvnp5u2tyq
    ONTO m1zvno5vdwc7arut4xebbi53yqmup3slzxwmot7fwnuurpmosv55ma
{
  ALTER TYPE Xhoni::User {
      DROP LINK notes;
      DROP LINK password;
      DROP PROPERTY createdAt;
      DROP PROPERTY email;
  };
  DROP TYPE Xhoni::Note;
  DROP TYPE Xhoni::Password;
  DROP TYPE Xhoni::User;
  DROP MODULE Xhoni;
};
