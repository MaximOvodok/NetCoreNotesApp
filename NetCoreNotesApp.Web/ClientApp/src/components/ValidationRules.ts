export default class ValidationRules {
  public static required(value: any): string {
    if (!value) {
      return 'You can\'t leave it blank';
    }

    return "";
  }
}
