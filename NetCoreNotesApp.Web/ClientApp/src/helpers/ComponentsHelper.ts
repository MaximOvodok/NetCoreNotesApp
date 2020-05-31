import ISeverity from "../entities/ISeverity";
import { IFormData } from "../types/ComponentsStateTypes";
import INote from "../entities/INote";
import { ITag } from "../entities";

class ComponentsHelper {
  public static ConvertSeveritiesToState(
    severities: Array<ISeverity>,
    selectedKey: string
  ): Array<{ key: number; value: string; isActive: boolean }> {
    return severities.map((severity: ISeverity) =>
      severity.id.toString() === selectedKey
        ? {
            key: severity.id,
            value: severity.text,
            isActive: true,
          }
        : {
            key: severity.id,
            value: severity.text,
            isActive: false,
          }
    );
  }

  public static ChangeActiveSeverity(
    severities: Array<{ key: number; value: string; isActive: boolean }>,
    severityKey: string
  ): Array<{ key: number; value: string; isActive: boolean }> {
    return severities.map(
      (severity: { key: number; value: string; isActive: boolean }) =>
        severity.key.toString() === severityKey
          ? {
              key: severity.key,
              value: severity.value,
              isActive: true,
            }
          : {
              key: severity.key,
              value: severity.value,
              isActive: false,
            }
    );
  }

  public static convertTagsFromState(
    stateTags: Array<any>
  ): Array<{ value: number; label: string }> {
    return stateTags.map((stateTag: any) =>
      stateTag.__isNew__
        ? {
            value: 0,
            label: stateTag.label,
          }
        : {
            value: stateTag.value,
            label: stateTag.label,
          }
    );
  }

  public static ConvertTagsToState(
    tags: Array<ITag>
  ): Array<{ value: number; label: string }> {
    return tags.map((tag: ITag) => ({
      value: tag.id,
      label: tag.name,
    }));
  }

  public static ConvertFormStateToNote(formData: IFormData): INote {
    let note: INote = {
      id: formData.id,
      text: formData.text,
      severityId: parseInt(formData.severity.key),
      tags: formData.tags.map((t: { value: number; label: string }) => ({
        id: t.value,
        name: t.label,
        noteId: formData.id,
      })),
    };

    return note;
  }
}

export default ComponentsHelper;
