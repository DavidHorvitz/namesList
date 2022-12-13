import { appendFile } from "node:fs/promises";
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
// import { asyncReadFile } from './readTextFile.js';
import { createReadStream } from "node:fs";
// process.version



//Receives input from the user and enters it into a text file
const enterDataToTxt = async function () {
    const rl = readline.createInterface({ input, output });
    let firstName = await rl.question("What is your First Name ? ");
    while (!firstName) {
        console.log("You did not enter your First Name, try again");
        firstName = await rl.question("What is your First Name ? ");
    }
    let lastName = await rl.question("What is your Last Name ? ");
    while (!lastName) {
        console.log("You did not enter your Last Name, try again");
        lastName = await rl.question("What is your Last Name ? ");
    }
    let age = await rl.question("What is your Age ? ");
    while (!age) {
        console.log("You did not enter Age, try again");
        age = await rl.question("What is your Age ? ");
    }
    let id = await rl.question("What is your ID number ? ");
    while (!id) {
        console.log("You did not enter Id, try again");
        id = await rl.question("What is your ID number ? ");
    }
    console.log(
        `Your information: First Name: ${firstName} Last Name: ${lastName} Age: ${age} ID: ${id}`);
    const data = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        id: id
    }
    const dataObj = JSON.stringify(data)
    async function appendFileToTXT() {
        await appendFile('name.txt', `\n${dataObj}`);
        console.log("success appendFile");
    }
    appendFileToTXT();
    rl.close();
}

//Read the Text file Line by Line:
async function readLineByLine() {
    const rlQuestion = readline.createInterface({ input, output, terminal: false });
    let searchByNameOrID = await rlQuestion.question("Enter the name or id you are looking for ! ");
    while (!searchByNameOrID) {
        console.log("You did not enter your choice!!");
        searchByNameOrID = await rlQuestion.question("Enter the name or id you are looking for ! ")
    }
    const fileStream = await createReadStream('name.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        if (line.includes(searchByNameOrID)) {
            console.log(`Line from file: ${line}`);
        }
    }
    console.log("readLineByLine IS Success !!!");
    rl.close();
}

//This function checks if the user wants to read or write information
async function writeOrReadFile() {
    const rl = await readline.createInterface({ input, output, terminal: false });
    let question = await rl.question(`Do you want to enter information or read R | W ?`);
    while (!question) {
        console.log("You did not enter your choice!!");
        question = await rl.question(`Do you want to enter information or read R | W ?`);
    }
    if (question.includes("W")) {
        enterDataToTxt();
    } else if (question.includes("R")) {
        readLineByLine();
    } else {

        console.log("you don't enter Something Right, Try again");
        writeOrReadFile();
       //I need to limit the function it's make a memory leak!!!!

    }
}

//run program
async function run() {
    await writeOrReadFile();
}
run();