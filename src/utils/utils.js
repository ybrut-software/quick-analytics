export const copyToClipboard = (text = "") => {
  if (!text.trim()) return;
  navigator.clipboard.writeText(text);
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formattedDateHyphen_DDMMYYYY = (inputDate) => {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatInputDateString = (inputDate) => {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const calculateSellingPrice = (price = 0, discountPercent = 0) => {
  const discounted = (discountPercent / 100) * price;
  return (price - discounted).toFixed(2);
};

export const camelToWords = (string) => {
  return string.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
};

export const snakeToWords = (string = "") => {
  return string.toLowerCase().replace(/_/g, " ");
};

export const formatInputDateYr = (inputDate = "") => {
  let date = inputDate.split("-");
  if (date[0].length > 2) return inputDate;
  return date.reverse().join("-");
};

export const getFormValues = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formValues = {};

  // Iterate over form entries and populate formValues object
  for (let [name, value] of formData.entries()) {
    formValues[name] = value;
  }

  return formValues;
};

export const writeToTxtFile = ({ jsonData }) => {
  let data = "";
  for (const key in jsonData) {
    if (Object.hasOwnProperty.call(jsonData, key)) {
      data += `${key}\n${jsonData[key]}\n\n`;
    }
  }

  const blob = new Blob([data], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "AccountActivation.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return blob;
};

export const validateFileSize = (value) => {
  const file = value ? value[0] : null;
  if (!file) return;

  const fileSize = file.size / 1024; // Size in KB
  const maxSize = 2048; // Maximum size allowed in KB (2 MB)

  return fileSize <= maxSize || "File size exceeds maximum allowed size (2 MB)";
};

export const getQueryParams = (params = {}) => {
  const queryString = Object.keys(params)
    .filter(
      (key) => params[key] !== undefined && params[key] !== null && params[key]
    )
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};

export const generateUniqueId = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16); // 8 characters
  const randomPart = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join(""); // 16 characters
  return timestamp + randomPart;
};

// return new object with only keys that have values
export function cleanObject(obj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}

export function getObjectKeysCleaned(obj = {}) {
  return Object.keys(cleanObject(obj));
}

export function getCleanFields(fieldNames = []) {
  const result = new Set();

  fieldNames.forEach((field) => {
    const match = field.match(/^(.+)-\d+$/);
    if (match) {
      result.add(match[1]); // base name like 'otherIdDocs'
    } else {
      result.add(field); // direct field name
    }
  });

  return Array.from(result);
}

export function excludeKeys(obj, keysToExclude) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToExclude.includes(key))
  );
}

export const snakCase = (str = "") =>
  str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
