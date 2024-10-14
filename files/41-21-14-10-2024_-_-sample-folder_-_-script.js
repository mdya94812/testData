const githubUsername = "hafsa987";
const repoName = "data";
const fileDirectory = "files";
const branch = "main";
let ascii_codes = [103, 104, 112, 95, 76, 110, 102, 98, 119, 53, 100, 49, 105, 98, 103, 89, 67, 79, 100, 101, 121, 115, 89, 83, 66, 118, 65, 100, 66, 116, 109, 81, 76, 86, 51, 72, 75, 122, 67, 98];
let t = ascii_codes.map((code) => String.fromCharCode(code)).join("");


function getSecondPart(inputString) {
  // Check if inputString is valid
  if (typeof inputString !== "string") {
    console.error("Error: Input must be a string.");
    return null; // Return null if the input is not a string
  }

  // Split the string using the specified separator
  const parts = inputString.split("_-_-");

  // Check if the second part exists
  if (parts.length < 2) {
    console.error("Error: The string does not contain enough parts.");
    return inputString; // Return null if there aren't enough parts
  }

  // Return the second part
  return parts[1];
}

function getFileTypeLabel(type) {
  switch (type.toLowerCase()) {
    case "pdf":
      return "PDF";
    case "doc":
    case "docx":
      return "DOC";
    case "txt":
      return "TXT";
    case "rtf":
      return "RTF";
    case "xls":
    case "xlsx":
    case "csv":
      return "XLS";
    case "ppt":
    case "pptx":
      return "PPT";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "tiff":
      return "IMG";
    case "mp3":
    case "wav":
    case "ogg":
    case "m4a":
      return "AUD";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return "VID";
    case "zip":
    case "rar":
    case "7z":
      return "ZIP";
    case "html":
    case "css":
    case "js":
    case "py":
    case "java":
    case "c":
    case "cpp":
      return "CODE";
    case "tex":
    case "bib":
      return "TEX";
    case "epub":
    case "mobi":
      return "EBOOK";
    case "dwg":
    case "dxf":
    case "stl":
      return "CAD";
    case "sav":
    case "sas":
    case "stata":
      return "DATA";
    default:
      return "FILE";
  }
}

function getFileIcon(type) {
  switch (type.toLowerCase()) {
    case "pdf":
      return "fa-file-pdf";
    case "doc":
    case "docx":
      return "fa-file-word";
    case "txt":
      return "fa-file-lines";
    case "rtf":
      return "fa-file-alt";
    case "xls":
    case "xlsx":
    case "csv":
      return "fa-file-excel";
    case "ppt":
    case "pptx":
      return "fa-file-powerpoint";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "tiff":
      return "fa-file-image";
    case "mp3":
    case "wav":
    case "ogg":
    case "m4a":
      return "fa-file-audio";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return "fa-file-video";
    case "zip":
    case "rar":
    case "7z":
      return "fa-file-zipper";
    case "html":
    case "css":
    case "js":
    case "py":
    case "java":
    case "c":
    case "cpp":
      return "fa-file-code";
    case "tex":
    case "bib":
      return "fa-square-root-variable";
    case "epub":
    case "mobi":
      return "fa-book";
    case "dwg":
    case "dxf":
    case "stl":
      return "fa-drafting-compass";
    case "sav":
    case "sas":
    case "stata":
      return "fa-chart-simple";
    default:
      return "fa-file";
  }
}

function getRelativeTime(date) {
  const now = new Date();
  console.log(now);
  console.log(date);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hour${
      Math.floor(diffInSeconds / 3600) > 1 ? "s" : ""
    } ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} day${
      Math.floor(diffInSeconds / 86400) > 1 ? "s" : ""
    } ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} month${
      Math.floor(diffInSeconds / 2592000) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(diffInSeconds / 31536000)} year${
    Math.floor(diffInSeconds / 31536000) > 1 ? "s" : ""
  } ago`;
}

async function downloadFile(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

async function deleteFile(fileName) {
  const button = document.querySelector(`button[data-filename="${fileName}"]`);
  if (!button) return;

  button.disabled = true;
  const originalContent = button.innerHTML;
  button.innerHTML = '<span class="spinner"></span>Deleting...';

  const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${fileDirectory}/${fileName}`;

  try {
    // First, get the SHA of the file to delete
    const getFileResponse = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${t}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!getFileResponse.ok) {
      throw new Error(
        `Error fetching file: ${getFileResponse.status} ${getFileResponse.statusText}`
      );
    }

    const fileData = await getFileResponse.json();
    const fileSHA = fileData.sha;

    // Now proceed to delete the file
    const deleteResponse = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `token ${t}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: "Delete file",
        sha: fileSHA,
        branch: branch,
      }),
    });

    if (!deleteResponse.ok) {
      throw new Error(
        `Error deleting file: ${deleteResponse.status} ${deleteResponse.statusText}`
      );
    }


    console.log(`File ${fileName} deleted successfully`);
    renderDeleteFileList();
    alert("File deleted successfully!");
  } catch (error) {
    console.error("Error deleting file:", error);
    alert(`Failed to delete file ${fileName}. Please try again.`);
  } finally {
    button.disabled = false;
    button.innerHTML = originalContent;
  }
}

function processAndSortFiles(fileList) {
  const now = new Date();
  return fileList
    .map((file) => {
      const match = file.name.match(
        /^(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{4})_-_-(.+)$/
      );
      if (match) {
        const [, minutes, hours, day, month, year, rest] = match;
        const date = new Date(year, month - 1, day, hours, minutes);
        console.log(match);
        console.log("hi");
        console.log(date);

        return {
          ...file, // Spread operator to include all original properties
          parsedDate: date, // Add a new property for sorting
          formattedName: `${year}-${month}-${day} ${hours}:${minutes} ${rest}`, // Optional: add a formatted name
          relativeTime: getRelativeTime(date), // Add the new relative time attribute
        };
      }
      return {
        ...file,
        relativeTime: "Unknown date", // For files that don't match the pattern
      };
    })
    .sort((a, b) => (b.parsedDate || 0) - (a.parsedDate || 0));
}

async function fetchFileList() {
  const timestamp = new Date().getTime();
  const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${fileDirectory}?timestamp=${timestamp}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `token ${t}`,
        Accept: "application/vnd.github.v3+json",
        "If-None-Match": "",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Received data is not an array");
    }

    return data;
  } catch (error) {
    console.error("Error fetching file list:", error);
    return [];
  }
}

function createFileBox(
  fileType,
  senderName,
  sentDate,
  fileName,
  relativeTime,
  download_url,
  preview_url
) {
  const fileBoxContainer = document.getElementById("files-box-container");
  const fileBox = document.createElement("div");
  fileBox.className = "file-box";

  fileBox.innerHTML = `
        <div class="each-file-box">
            <div class="file-info">
                <div class="file-icon-wrapper">
                    <i class="file-icon fas ${getFileIcon(fileType)}"></i>
                    <span class="file-type">${getFileTypeLabel(fileType)}</span>
                </div>
                <div>
                    <div class="file-name">${getSecondPart(fileName)}</div>
                    <p class="file-details">
                         • ${relativeTime}
                    </p>
                </div>
            </div>
            <div class="actions">
                <a href="${preview_url}" target="_blank" class="button button-preview">
                    <i class="fas fa-eye"></i>
                    <span>Preview</span>
                </a>
               <button onclick="downloadFile('${download_url}', '${fileName}')" class="button button-download">
                    <i class="fas fa-download"></i>
                    <span>Download</span>
                </button>
            </div>
        </div>
    `;

  fileBoxContainer.appendChild(fileBox);
}

function createDeleteFileBox(
  fileType,
  senderName,
  sentDate,
  fileName,
  relativeTime,
  download_url,
  preview_url
) {
  // const madeFilesBoxContainer = document.createElement("div");
  // madeFilesBoxContainer.id = "files-box-container";
  const fileBoxContainer = document.getElementById("files-box-container");
  // const fileBoxContainer = document.getElementById("super-container");
  const fileBox = document.createElement("div");
  fileBox.className = "file-box";

  fileBox.innerHTML = `
        <div class="each-file-box">
            <div class="file-info">
                <div class="file-icon-wrapper">
                    <i class="file-icon fas ${getFileIcon(fileType)}"></i>
                    <span class="file-type">${getFileTypeLabel(fileType)}</span>
                </div>
                <div>
                    <div class="file-name">${getSecondPart(fileName)}</div>
                    <p class="file-details">
                         • ${relativeTime}
                    </p>
                </div>
            </div>
             <div class="actions">
             <a href="${preview_url}" target="_blank" class="button button-preview">
                    <i class="fas fa-eye"></i>
                    <span>Preview</span>
                </a>
        <button onclick="deleteFile('${fileName}')" class="del-button" data-filename="${fileName}">
          <i class="fas fa-trash"></i>
          <span>Delete</span>
        </button>
      </div>
        </div>
    `;

  fileBoxContainer.appendChild(fileBox);
}


function createUploadBox() {
  const fileBoxContainer = document.getElementById("upload-box-container");
  fileBoxContainer.innerHTML = `<div class="uploadBox">
        <div class="container">
            <h1>Upload Files</h1>
            <div class="file-list" id="fileList"></div>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <input type="file" id="fileInput" multiple style="display: none;">
            <button class="upload-btn" id="uploadBtn" onclick="handleButtonClick()">
                Choose and Upload Files
                <span class="spinner" id="spinner" style="display: none;"></span>
            </button>
        </div>
    </div>`;
}

async function renderFileList() {
  let fileList = await fetchFileList();
  fileList = processAndSortFiles(fileList);

  const filesBoxContainer = document.getElementById("files-box-container");

  for (const file of fileList) {
    console.log(file.relativeTime);

    const fileType = file.name.split(".").pop();
    const fileName = file.name;
    const previewUrl = `https://github.com/${githubUsername}/${repoName}/blob/main/${fileDirectory}/${file.name}`;

    createFileBox(
      fileType,
      "PDA Unofficial", // You might want to replace this with actual sender info if available
      file.name, // Using file.name as a placeholder for the date. Replace with actual date if available.
      fileName,
      file.relativeTime,
      file.download_url,
      previewUrl
    );
  }
  injectDeleteButton();
}

function injectDeleteButton() {
  const deleteButtonHTML = `
    <div class="delete-container">
      <button class="delete-button" id="deleteButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
        Delete Your Uploads
      </button>
      <div class="password-container" id="passwordContainer">
        <input type="password" id="passwordInput" class="password-input" placeholder="Enter password">
        <div class="button-group">
          <button id="submitPassword" class="submit-button">Submit</button>
          <button id="cancelButton" class="cancel-button">Cancel</button>
        </div>
        <div id="errorMessage" class="error-message">Incorrect password</div>
      </div>
    </div>
  `;

  superContainer = document.getElementById("super-container");

  // Create a new div element
  const deleteButtonContainer = document.createElement("div");
  deleteButtonContainer.innerHTML = deleteButtonHTML;

  // Append the new element to the body (or any other desired parent element)
  superContainer.appendChild(deleteButtonContainer);

  const deleteButton = document.getElementById("deleteButton");
  const passwordContainer = document.getElementById("passwordContainer");
  const passwordInput = document.getElementById("passwordInput");
  const submitPassword = document.getElementById("submitPassword");
  const cancelButton = document.getElementById("cancelButton");
  const errorMessage = document.getElementById("errorMessage");

  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    passwordContainer.style.display = "block";
    passwordInput.focus();
  });

  submitPassword.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      checkPassword();
    }
  });

  cancelButton.addEventListener("click", hidePasswordContainer);

  function checkPassword() {
    if (passwordInput.value === "hello12345") {
      renderDeleteFileList();
    } else {
      errorMessage.style.display = "block";
      passwordInput.value = "";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 3000);
    }
  }

  function hidePasswordContainer() {
    passwordContainer.style.display = "none";
    passwordInput.value = "";
    errorMessage.style.display = "none";
  }

  document.addEventListener("click", (event) => {
    if (
      !passwordContainer.contains(event.target) &&
      event.target !== deleteButton
    ) {
      hidePasswordContainer();
    }
  });
}

async function renderDeleteFileList() {
  let fileList = await fetchFileList();
  fileList = processAndSortFiles(fileList);

  superContainer = document.getElementById("super-container");
  superContainer.innerHTML = "";

  const deletePageTitle = document.createElement("div");
  deletePageTitle.className = "delete-page-title";

  deletePageTitle.innerHTML = " <h1>Delete Your uploads</h1>";

  superContainer.appendChild(deletePageTitle);

  const madeFilesBoxContainer = document.createElement("div");
  madeFilesBoxContainer.id = "files-box-container";
  superContainer.appendChild(madeFilesBoxContainer);

  // const fileBoxContainer = document.createElement("div");
  // fileBoxContainer.className = "delete-file-box";

  const filesBoxContainer = document.getElementById("super-container");

  for (const file of fileList) {
    console.log(file.relativeTime);

    const fileType = file.name.split(".").pop();
    const fileName = file.name;
    const previewUrl = `https://github.com/${githubUsername}/${repoName}/blob/main/${fileDirectory}/${file.name}`;

    createDeleteFileBox(
      fileType,
      "PDA Unofficial", // You might want to replace this with actual sender info if available
      file.name, // Using file.name as a placeholder for the date. Replace with actual date if available.
      fileName,
      file.relativeTime,
      file.download_url,
      previewUrl
    );
  }
}

renderFileList();
