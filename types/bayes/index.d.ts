declare module "bayes" {
  declare class Classifier {
    constructor(options: { tokenizer: (text: string) => string[] });

    learn(data: string, category: string): Promise<void>;
    categorize(data: string): Promise<string>;

    toJson(): string;
  }

  const c: (() => Classifier) & {
    fromJson(jsonStr: string): Classifier;
  };
  export default c;
}
