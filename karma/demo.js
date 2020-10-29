export function testFetch() {
  return fetch(
    "https://api.keyman.com/search/?q=khmer&_ga=2.135402937.901015410.1603127399-773243877.1602533264"
  ).then((res) => {
    return res.json();
  });
}
