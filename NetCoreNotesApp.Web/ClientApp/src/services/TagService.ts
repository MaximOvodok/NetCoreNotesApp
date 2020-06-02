import ITag from "../entities/ITag";

class TagService {
  public static searchTags(term: string): Promise<Array<ITag>> {
    return new Promise<Array<ITag>>((resolve, reject) => {
      fetch(window.location.origin + "/api/Tags/Search?term=" + term, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then((tags: Array<ITag>) => {
          resolve(tags);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public static createTags(tags: Array<ITag>, noteId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(window.location.origin + "/api/Tags/Push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tags)
      })
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

export default TagService;
