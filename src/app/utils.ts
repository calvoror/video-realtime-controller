export class Utils {
  static MESSAGE_VALUE_PLAY = 'PLAY';
  static MESSAGE_VALUE_PAUSE = 'PAUSE';
  static MESSAGE_VALUE_REWIND = 'REWIND';
  static PING_CLIENT = 'PING';

  /**
   * Returns a simplified identification number (3 first characters)
   * @param complete_id the entire identification number
   */
  static getClientSimpleId(complete_id: String) {
    return complete_id
      .replace('-', '')
      .replace('_', '')
      .substr(0, 3)
      .toUpperCase();
  }
}
