// Tool to delete old aerial images that no longer exist in the database

import fs from 'fs';
import path from 'path';
import { loadEnvFile } from 'process';
import Database from 'better-sqlite3';


const db = new Database('r00ts.db');
db.pragma('journal_mode = WAL');

// Get current filenames in database
const rows = db.prepare("SELECT filename FROM Datacenters").all() as { filename: string | null }[];

const filename_list: string[] = [];
rows.forEach(el => {
    if (el.filename)
        filename_list.push(el.filename);
});

console.log(`Found ${filename_list.length} filenames in database`);

// Get list of saved files
loadEnvFile('.env.local');
const IMAGES_DIR = process.env.AERIAL_DIR;

if (!IMAGES_DIR) {
    console.error('IMAGES_DIR cannot be found in .env.local');
    process.exit(1);
}

console.log(`IMAGES_DIR: ${IMAGES_DIR}`);

const file_list = fs.readdirSync(IMAGES_DIR);

console.log(`Found ${file_list.length} image files in ${IMAGES_DIR}`);

const select = db.prepare("SELECT * FROM Datacenters WHERE filename = ?");

let count = 0;
file_list.forEach(filename => {
    // Make sure we're only checking for images!
    if (path.extname(filename) !== '.png')
        return;

    const row = select.get(filename);

    if (row)
        return;

    count++;

    const fullpath = path.join(IMAGES_DIR, filename);

    fs.rmSync(fullpath);
})

console.log(`removed ${count} files in ${IMAGES_DIR} not in database`);

