import INote from "../entities/INote";
import ISeverity from "../entities/ISeverity";

class NoteService {
  public static GetSeverities(): Promise<Array<ISeverity>> {
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

  public static GetNotes(): Promise<Array<INote>> {
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
