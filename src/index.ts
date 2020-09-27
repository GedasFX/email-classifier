import program from "commander";
import { trainClassifier } from "./training";
import { classify } from "./classify";
import { writeFile } from "fs";
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
    await promisify(writeFile)("./classifier.json", classifier.toJson());
  });
// program.command("train-categorizer <>");
program
  .command("classify <file_to_classify> [classifier_rules]")
  .description(
    "Classifies the given file. If rule file was not provided, the one in current directory will be used instead."
  )
  .action(async (fileToClassify: string, classifierJson?: string) => {
    if (!classifierJson) {
      classifierJson = "./classifier.json";
    }
    const result = await classify(fileToClassify, classifierJson);
    console.log(result);
  });

program.parse(process.argv);
