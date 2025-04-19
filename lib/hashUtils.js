import LZString from "lz-string";
export const readFromHash = () => {
  try {
    const hash = window.location.hash.substring(1);
    if (!hash) {
      return null;
    }
    const decompressedData = LZString.decompressFromEncodedURIComponent(hash);
    return JSON.parse(decompressedData);
  } catch (err) {
    console.log(err);
  }
};

export const saveToHash = (data) => {
  console.log(data);
  try {
    const compressedData = LZString.compressToEncodedURIComponent(
      JSON.stringify(data)
    );
    window.location.hash = compressedData;
  } catch (err) {
    console.log(err);
  }
};
