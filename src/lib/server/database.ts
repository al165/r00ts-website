import path from 'path';

import Database from 'better-sqlite3';
import { migrate } from '@blackglory/better-sqlite3-migrations';

import type { Article } from '$lib/types';


const db = new Database('r00ts.db');
db.pragma('journal_mode = WAL');

import { findMigrationFilenames, readMigrationFile } from 'migration-files'

const filenames = await findMigrationFilenames(path.join(process.cwd(), 'src/lib/server/migrations'));
const migrations = await Promise.all(filenames.map(readMigrationFile));

migrate(db, migrations);

export function getArticles() {
    const articles = db.prepare("SELECT * FROM Articles").all() as Article[];
    return { articles };
}

export function addArticle(title: string, url: string, description: string) {
    const date = Math.floor(Date.now() / 1000);
    const statement = db.prepare('INSERT INTO Articles(title, url, description, date) VALUES (?, ?, ?, ?)');
    const result = statement.run(title, url, description, date);

    console.log(result);
}
