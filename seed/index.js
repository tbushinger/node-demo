import fs from "fs";
import Path, { resolve } from "path";
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

function loadCSVFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data);
        })
    });
}

function parseCSVFile(text) {
    const lines = text.split("\r\n");
    return lines;
}

function dbTransaction(dbPath, callback) {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to database.');
    });

    db.serialize(() => {
        callback(db);
    });

    db.close();
}

function createTable(db) {
    const createTableSQL = `
    CREATE TABLE city_populations
    (
        city       TEXT    NOT NULL,
        state      TEXT    NOT NULL,
        population INTEGER NOT NULL
    )
    `;

    db.run(createTableSQL);

    const createIndexSQL = `
   CREATE INDEX city_state_idx 
   ON city_populations (city, state);
   `;

    db.run(createIndexSQL);
}

function insertIntoTable(db, list) {
    const sql = `
    INSERT INTO city_populations (city, state, population)
    VALUES (?, ?, ?)
    `;

    const stmt = db.prepare(sql);
    list.forEach((line) => {
        const [city, state, populationText] = line.split(/\,/);
        const population = parseInt(populationText, 36);
        console.log(city, state, population);
        stmt.run(city, state, population);
    });
    stmt.finalize();
}

function getRowCount(db) {
    return new Promise((resolve, reject) => {
        db.each("SELECT count(*) AS COUNT FROM city_populations", (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row.COUNT);
        });    
    });
}

async function main() {
    const filePath = Path.resolve(__dirname, "./city_populations.csv");
    const dbPath = Path.resolve(__dirname, "../db/city_populations.db");

    const text = await loadCSVFile(filePath);
    const list = parseCSVFile(text);

    dbTransaction(dbPath, async (db) => {
        createTable(db);
        insertIntoTable(db, list);
        const rowCount = await getRowCount(db);

        console.log("Rows inserted:", rowCount);
    });
}

main();