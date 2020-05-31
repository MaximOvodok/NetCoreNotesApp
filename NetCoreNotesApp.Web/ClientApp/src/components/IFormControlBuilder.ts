interface IFormControlBuilder {
  buildControl(): JSX.Element;
  getFieldValue(e: any): any;
  validate(): any;
}

export default IFormControlBuilder;
