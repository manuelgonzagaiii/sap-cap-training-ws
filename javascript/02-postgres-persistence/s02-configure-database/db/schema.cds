namespace assetcare;

/**
 * Equipment is a single physical asset AssetCare looks after - a pump, a motor,
 * a conveyor. The whole application is built around it.
 */
entity Equipment {
  key ID   : UUID;
  tag      : String;   // human-facing asset number, e.g. EQ-1001
  model    : String;
  serialNo : String;
}

/**
 * A manufacturer supplies equipment and spare parts. For now it stands on its own;
 * a later lesson connects Equipment to it with an association.
 */
entity Manufacturer {
  key ID  : UUID;
  name    : String;
  country : String;
}
