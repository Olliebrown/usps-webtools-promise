/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-regexp */
export default (value: string): string => {
  let string = value.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  const lowers = [
    "A",
    "An",
    "The",
    "And",
    "But",
    "Or",
    "For",
    "Nor",
    "As",
    "At",
    "By",
    "For",
    "From",
    "In",
    "Into",
    "Near",
    "Of",
    "On",
    "Onto",
    "To",
    "With",
  ];
  Object.keys(lowers).forEach((_value, index) => {
    string = string.replace(
      new RegExp(`\\s${lowers[index]}\\s`, "g"),
      (txt) => {
        return txt.toLowerCase();
      }
    );
  });

  // Certain words such as initialisms or acronyms should be left uppercase
  const uppers = ["Ne", "Nw", "Se", "Sw"];
  Object.keys(uppers).forEach((_value, index) => {
    string = string.replace(
      new RegExp(`\\b${uppers[index]}\\b`, "g"),
      (txt) => {
        return txt.toUpperCase();
      }
    );
  });

  return string;
};
