import ITag from "./ITag";
import ISeverity from "./ISeverity";

interface INote {
    text: string;
    severityId: number;
    severity?: ISeverity;
    tags: Array<ITag>;
}

export default INote;
