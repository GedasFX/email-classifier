import program from "commander";
import { trainClassifier } from "./training";
import fs from "fs";
import { promisify } from "util";

program.version("0.0.0");
program
  .command("train-filter <ham_folder> <spam_folder>")
  .description(
    "Trains the filter based on the emails provided in the ham and spam folders."
  )
  .action(async (hamFolder: string, spamFolder: string) => {
    console.log(hamFolder, spamFolder);
    const classifier = await trainClassifier(
      { dirPath: hamFolder, category: "ham" },
      { dirPath: spamFolder, category: "spam" }
    );
    await promisify(fs.writeFile)("./classifier.json", classifier.toJson());
  });
// program.command("train-categorizer <>");
program.parse(process.argv);
