const Datastore = require("nedb-promises");
const path = require("path");

const db = Datastore.create({
  filename: path.join(__dirname, "../data/app_data.db"), // Save under /data folder
  autoload: true, // automatically load the database
});

// Example insert
async function insertRecord(record) {
  return await db.insert(record);
}

// Example find
async function findRecords(query = {}) {
  return await db.find(query);
}

// Example update
async function updateRecord(id, updateData) {
  return await db.update({ _id: id }, { $set: updateData });
}

// Example delete
async function deleteRecord(id) {
  return await db.remove({ _id: id });
}

async function groupByField(query) {
  const { field } = query;
  const records = await db.find({});
  const grouped = {};

  records.forEach((record) => {
    const key = record[field] || "all";
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(record);
  });

  return grouped;
}

async function getStatsSummary(query) {
  const records = await db.find({});
  const caseCounts = {};
  const unitStats = {};

  for (const record of records) {
    const caseName = record.case || "unknown";
    const unitName = record.unit || "unknown";

    // Count by case
    caseCounts[caseName] = (caseCounts[caseName] || 0) + 1;

    // Unit level stats
    if (!unitStats[unitName]) {
      unitStats[unitName] = {
        total: 0,
        caseCounts: {},
      };
    }

    unitStats[unitName].total += 1;
    unitStats[unitName].caseCounts[caseName] =
      (unitStats[unitName].caseCounts[caseName] || 0) + 1;
  }

  return {
    cases: caseCounts,
    units: unitStats,
  };
}

module.exports = {
  db,
  insertRecord,
  findRecords,
  updateRecord,
  deleteRecord,
  groupByField,
  getStatsSummary,
};
