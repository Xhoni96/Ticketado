module default {

  type User {
    required property email -> str { constraint exclusive };
    required property createdAt -> datetime { default := datetime_current() };
    link password := .<user[is Password];
    multi link events := .<user[is Event];
    multi link venues := .<user[is Venue];
  }

  type Password {
    required property hash -> str;
    required link user -> User {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
  }

  type Event {
    required property name -> str;
    required property startDate -> datetime;
    property description -> str;
    property endDate -> datetime;
    property onSale -> bool;
    # property memberId -> uuid;
    property thumbnail -> str;
    property draft -> bool;
    property published -> bool;
    # property venueId -> str;
    property createdAt -> datetime { default := datetime_current() };
    required link user -> User {
      on target delete delete source;
    };
  }

  type Venue {
    property address -> str;
    property city -> str;
    property  country -> str;
    # property  countrycode -> bool;
    property createdAt -> datetime { default := datetime_current() };
    #  property deleted -> bool;
    # property  googleid -> bool | str;
    # property  googlerefid -> str;
    # property id: 361,
    # property lat -> str;
    # property lng -> str;
    # property memberId -> uuid;
    # property modified -> datetime;
    property name -> str;
    property number -> str;
    #  property parentid -> str;
    property region -> str;
    property street -> str;
    #  property vmtHost -> str; "https://vmt-staging.softjourn.if.ua/front"
    property vmt_id -> str;
    property zip -> str;

    # link password := .<user[is Password];

      required link user -> User {
      on target delete delete source;
    };

    
  }

}
# To explicitly declare a link as non-multi you need to use the single keyword.
#  If you don't specify multi or single, then edgedb will decide itself. For normal links, this will always just default to single,
#  but for computed links it's inferred from the expression
# https://www.edgedb.com/docs/datamodel/computeds#type-and-cardinality-inference