import INote from "../entities/INote";
import ISeverity from "../entities/ISeverity";

class NoteService {
    public static createNote(note: INote): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(window.location.origin + "/api/Notes/Create", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    SeverityId: note.severityId,
                    Text: note.text
                })
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

  public static getSeverities(): Promise<Array<ISeverity>> {
    return new Promise((resolve, reject) => {
      fetch(window.location.origin + "/api/Notes/Severities", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(response => response.json())
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
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then((notes: any) => {
          resolve(notes);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default NoteService;
