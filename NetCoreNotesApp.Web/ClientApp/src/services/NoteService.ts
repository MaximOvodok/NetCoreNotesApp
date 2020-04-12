import INote from "../entities/INote";
import ISeverity from "../entities/ISeverity";

class NoteService {
  public static createNote(note: INote): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      fetch(window.location.origin + "/api/Notes/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: note.id,
          SeverityId: note.severityId,
          Text: note.text,
          Tags: note.tags,
        }),
      })
        .then((response) => response.json())
        .then((noteId: number) => {
          resolve(noteId);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public static getSeverities(
    controller?: AbortController
  ): Promise<Array<ISeverity>> {
    return new Promise((resolve, reject) => {
      let requestInfo: any = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      if (controller) {
        requestInfo["signal"] = controller.signal;
      }

      fetch(window.location.origin + "/api/Notes/Severities", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((severities: Array<ISeverity>) => {
          resolve(severities);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public static getNotes(): Promise<Array<INote>> {
    return new Promise<Array<INote>>((resolve, reject) => {
      fetch(window.location.origin + "/api/Notes/Get", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((notes: any) => {
          resolve(notes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default NoteService;
