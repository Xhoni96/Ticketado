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
    required property startDate -> str;
    property description -> str;
    property endDate -> str;
    property onSale -> bool { default := false };
    # property memberId -> uuid;
    property thumbnail -> str;
    property draft -> bool;
    property published -> bool { default := false };
    property registration -> bool { default := false };
    property inventory -> int16;

    property createdAt -> datetime { default := datetime_current() };

    required link user -> User {
      on target delete delete source;
    };
    
     link venue -> Venue {
       on target delete allow;
    }
  }

  type Venue {
    property address -> str; # may need to be deleted
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
    required property name -> str;
    property number -> str;
    #  property parentid -> str;
    property region -> str;
    property street -> str;
    #  property vmtHost -> str; "https://vmt-staging.softjourn.if.ua/front"
    property vmt_id -> str; # check what is needed for. Maybe needs to be deleted
    property zip -> str;

    # link password := .<user[is Password];

      required link user -> User {
      on target delete delete source;
    };

    # link event -> Event {
    #    on target delete allow;
    # }


    
  }

}
# To explicitly declare a link as non-multi you need to use the single keyword.
#  If you don't specify multi or single, then edgedb will decide itself. For normal links, this will always just default to single,
#  but for computed links it's inferred from the expression
# https://www.edgedb.com/docs/datamodel/computeds#type-and-cardinality-inference