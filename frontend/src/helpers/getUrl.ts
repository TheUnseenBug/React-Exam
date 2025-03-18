export default function getCodeFromUrl(url: string) {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return urlParams.get("");
}
