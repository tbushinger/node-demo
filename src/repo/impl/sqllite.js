import sqlite3 from 'sqlite3';

function selectOne(db, sql, params, callback) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(callback(row));
        });
    });
}

function execSQL(transaction, sql, params) {
    return new Promise((resolve, reject) => {
        try {
            transaction((db) => {
                const stmt = db.prepare(sql);

                stmt.run(...params);
                stmt.finalize();
                resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export class SQLLiteRepo {
    #db = null;
    #transaction = (callback) => {
        this.#db.serialize(() => {
            callback(this.#db);
        });
    }

    constructor(options) {
        const { url } = options;

        this.#db = new sqlite3.Database(url, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                throw err;
            }
            console.log('Connected to database.');
        });
    }

    dispose() {
        if (this.#db) {
            this.#db.close();
            this.#db = null;
        }
    }

    getPopulation(state, city) {
        const sql = `
        SELECT population
        FROM   city_populations
        WHERE  upper(state) = upper(?)
        AND    upper(city) = upper(?)  
        `;

        return selectOne(this.#db, sql, [state, city], (row) =>
            (row) ? row.population : null);
    }

    createPopulation(state, city, population) {
        const sql = `
        INSERT INTO city_populations (city, state, population)
        VALUES (?, ?, ?)
        `;

        return execSQL(this.#transaction, sql, [city, state, population]);
    }

    updatePopulation(state, city, population) {
        const sql = `
        UPDATE city_populations
        SET    state = ?,
               city = ?,
               population = ?
        WHERE  upper(state) = upper(?)
        AND    upper(city) = upper(?)  
        `;

        return execSQL(this.#transaction, sql, [state, city, population, state, city]);
    }
}