import INote from "../entities/INote";
import ISeverity from "../entities/ISeverity";

class FakeService {
  public static GetSeverities(): Promise<Array<ISeverity>> {
    var severities: Array<ISeverity> = [
      {
        Id: 1,
        Text: "Low"
      },
      {
        Id: 2,
        Text: "Middle"
      },
      {
        Id: 3,
        Text: "High"
      }
    ];

    return new Promise<Array<ISeverity>>((resolve, reject) => {
      setTimeout(function() {
        resolve(severities);
      }, 1000);
    });
  }

  public static GetNotes(): Promise<Array<INote>> {
    var notes: Array<INote> = [
      {
        Text: "Test 1",
        Severity: "Low",
        Tags: ["t1 tag 1", "t1 tag 2", "t1 tag 3", "t1 tag 4"]
      },
      {
        Text: "Test Note 2",
        Severity: "High",
        Tags: ["t2 tag 1", "t2 tag 2", "t2 tag 3", "t2 tag 4"]
      }
    ];

    return new Promise<Array<INote>>((resolve, reject) => {
      setTimeout(function() {
        resolve(notes);
      }, 5000);
    });
  }
}

export default FakeService;
