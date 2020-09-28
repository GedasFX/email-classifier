import { fromJson } from "bayes";
import { simpleParser } from "mailparser";
import { readFile } from "fs";
import { promisify } from "util";

export const classify = async (filePath: string, rulesPath: string) => {
  const readFileAsync = promisify(readFile);

  const classifier = fromJson((await readFileAsync(rulesPath)).toString());
  const email = await simpleParser(await readFileAsync(filePath));

  const data = email.text ?? email.html;
  if (!data) {
    throw Error("Email data was not found");
  }

  return classifier.categorize(data);
};
