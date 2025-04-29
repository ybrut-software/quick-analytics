export async function addRecord(data) {
  try {
    const response = await window.electron.insertRecord(data);

    if (!response.success) {
      throw new Error(response.error || "Failed to add record");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message || "Insert failed");
  }
}

export const addCase = async () => {
  return window.electron.insertRecord(data);
};
