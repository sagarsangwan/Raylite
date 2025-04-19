export const readFromHash = () => {
  try {
    const hash = window.location.hash.substring(1);

    return hash;
  } catch (err) {
    console.log(err);
  }
};
