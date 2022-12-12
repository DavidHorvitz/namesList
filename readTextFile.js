import { readFile } from "node:fs/promises";

// Reading the entire text file
export async function asyncReadFile(filename) {
    try {
        const contents = await readFile(filename, 'utf-8');
        const arr = contents.split(/\r?\n/);

        console.log(`${arr}`);

        return arr;
    } catch (err) {
        console.log(err);
    }
}
