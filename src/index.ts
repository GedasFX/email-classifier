import program from "commander";
import { trainClassifier } from "./training";
import { classify } from "./classify";
import { writeFile } from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(writeFile);

program.version("0.0.0");
program
  .command("train-filter <ham_folder> <spam_folder>")
  .description(
    "Trains the filter based on the emails provided in the ham and spam folders."
  )
  .action(async (hamFolder: string, spamFolder: string) => {
    const classifier = await trainClassifier(
      { dirPath: hamFolder, category: "ham" },
      { dirPath: spamFolder, category: "spam" }
    );
    await writeFileAsync("./filter.json", classifier.toJson());
  });
program
  .command(
    "train-categorizer <positive_folder> <negative_folder> <phishing_folder> <other_folder>"
  )
  .description(
    "Trains the spam categorizer based on the categorized scam emails."
  )
  .action(
    async (
      positiveDir: string,
      negativeDir: string,
      phishingDir: string,
      otherDir: string
    ) => {
      const classifier = await trainClassifier(
        { dirPath: positiveDir, category: "positive" },
        { dirPath: negativeDir, category: "negative" },
        { dirPath: phishingDir, category: "phishing" },
        { dirPath: otherDir, category: "other" }
      );
      await writeFileAsync("./categorizer.json", classifier.toJson());
    }
  );
program
  .command("classify <file_to_classify> [classifier_rules] [categorizer_rules]")
  .description(
    "Classifies the given file. If rule file was not provided, the one in current directory will be used instead."
  )
  .action(
    async (
      fileToClassify: string,
      classifierFilePath?: string,
      categorizerFilePath?: string
    ) => {
      if (!classifierFilePath) {
        classifierFilePath = "./filter.json";
      }
      if (!categorizerFilePath) {
        categorizerFilePath = "./categorizer.json";
      }
      const isSpam =
        (await classify(fileToClassify, classifierFilePath)) === "spam";
      if (!isSpam) {
        console.log("ham");
        return;
      }

      const category = await classify(fileToClassify, categorizerFilePath);
      console.log(category);
    }
  );

program.parse(process.argv);
