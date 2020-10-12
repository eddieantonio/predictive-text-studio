export class KeymanApi {
  async getKeyboard() {
    // fetch(
    //   "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits"
    // ).then((response) => console.log(response.json()));
    // await fetch(
    //   "https://api.keyman.com/search/?q=khmer&_ga=2.149730545.655593937.1602533264-773243877.1602533264"
    // ).then((res) => {
    //   console.log(res.json());
    // });
    await fetch("https://api.keyman.com/search/?q=l")
      .then((response) => response.json())
      .then((data: { languages: LanguageObj }) => {
        console.log(JSON.stringify(data.languages));
      });
  }
  // getKeyboard() {
  //   return new Promise((resolve, reject) => {
  //     fetch(
  //       "https://api.keyman.com/schemas/search.json?_ga=2.265780743.941842226.1601670981-355516252.1601670981",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     ).then(
  //       (res) => {
  //         console.log("xwrxw");
  //         resolve();
  //       },
  //       (error) => {
  //         console.log("byw");
  //         reject(error);
  //       }
  //     );
  //   });
  // }
}
