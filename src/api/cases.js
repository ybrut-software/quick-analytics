export async function addCase(data) {
  try {
    const response = await window.electron?.addCase(data);

    if (!response.success) {
      throw new Error(response.error || "Failed to add record");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Insert failed");
  }
}

export async function importCases(data) {
  try {
    const response = await window.electron?.insertCases(data);

    if (!response.success) {
      throw new Error(response.error || "Failed to add record");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Insert failed");
  }
}

export async function findCases() {
  try {
    const response = await window.electron?.findCases();

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch record");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Insert failed");
  }
}

export async function findCasesGrouped(query) {
  try {
    const response = await window.electron?.findCasesGrouped(query);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch record");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Insert failed");
  }
}

export async function findCasesSummary(query) {
  return await window.electron?.getStatsSummary(query);
}
