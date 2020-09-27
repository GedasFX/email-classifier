import bayes from "bayes";
import { simpleParser } from "mailparser";
import { readdir, readFile } from "fs";
import path from "path";
import { promisify } from "util";

const readDirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);

export async function trainClassifier(
  ...dataSources: {
    dirPath: string;
    category: string;
  }[]
) {
  const classifier = bayes();

  for (const { dirPath, category } of dataSources) {
    try {
      const files = await readDirAsync(dirPath);
      for (const fileName of files) {
        const filePath = path.join(dirPath, fileName);
        try {
          const file = await readFileAsync(filePath);
          const email = await parseEmail(file);

          // If text failed to parse, ignore.
          const text = email.text ?? email.html;
          if (text) {
            await classifier.learn(text, category);
          }
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  return classifier;
}

const parseEmail = (file: Buffer) => {
  return simpleParser(file);
};
