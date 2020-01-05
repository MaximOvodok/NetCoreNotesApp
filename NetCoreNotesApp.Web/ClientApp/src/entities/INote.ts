import ITag from "./ITag";

interface INote {
  text: string;
  severity: string;
  tags: Array<ITag>;
}

export default INote;
