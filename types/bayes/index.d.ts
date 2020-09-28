declare module "bayes" {
  declare class NaiveBayes {
    constructor(options: { tokenizer: (text: string) => string[] });

    learn(data: string, category: string): Promise<void>;
    categorize(data: string): Promise<string>;

    initializeCategory(categoryName: string): this;
    tokenProbability(token: string, category: string): number;
    frequencyTable(tokens: string[]): { [token: string]: number };

    toJson(): string;
  }

  export function fromJson(jsonStr: string): NaiveBayes;

  const bayes: () => NaiveBayes;
  export default bayes;
}
