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
