## Theoretical analysis

Australian government provides 10 [most common types of scam emails](https://nt.gov.au/law/crime/scams/ten-most-common-types-of-scams). I have decided to truncate the list into 3 main clusters for the automatic classifier to do work better.

##### Positive sentiment scams

- Advance fee fraud. Scammer asks for upfront payment of services/goods, and then either doesn't deliver, or provides subpar quality.

 - Lottery, sweepstakes and competition scams. Scammer would say that you have somehow won the lottery, and would ask for personal information or money to "transfer" the prize to your account.
 - Job and employment scams. Standard MLM scams. These include all of the pyramid scheme opportunities.
 - Golden opportunity and gambling scams. Nigerian Prince scams. If you transfer the attacker 10,000 dollars, in return he will give 5,000,000 in a month. Needless to say, the money will never arrive.
 - Charity and medical scams. Depending on how you look at it, this scam is either the most evil, or the least harmful scam of them all. All this one does is ask you to send money to a charity that doesn't exist. 

##### Phishing scams

 - Dating and romance scams. In most cases, it incentivizes to click on a link on the email where you could enter personal details, credit card information, or just get a virus.
 - Computer hacking. In old browsers, emails were able to execute code on the person's who viewed the content computer, and in some edge cases, they still can today, however, mode commonly I see this type of email being nothing more than psychological pressure. Example of one being "this email is infected by 20 viruses, buy our virus removal tool".
 - Online shopping, classified and auction scams. This is a very niche scam. This is very similar to advance fee fraud, by the scammer telling the victim they can buy something right now if they pay, however it is different because they then can provide a link that would look identical to the store's, such as eBay website.

##### Negative sentiment scams

 - Banking, credit card and online account scams. This type of scam a lot of people I know have almost fallen for, because of how real they can feel. They first cause a sense of panic, by saying, something like "your bank account has insufficient funds for the transaction". Then the person could panic, and call the phone number. Then they can ask for their personal bank details for "identification purposes", and transfer the money.
 - Small business scams. The target audience for these types of scams would be secretaries. An example email from "CEO" would be "I am on vacation, and I have forgotten to send money to our business partner. Could you do it for me. I cannot answer my phone, contact me by email instead".

The 3 categories are quite similar but differ in a couple of main ways:

1. **Positive sentiment scams**. This is the biggest category. Its primary purpose is to separate you from your money. Usually how they work is you pay some amount of money upfront for a promised fortune or a service. In the case of services or products, they might not even be real.
2. **Negative sentiment scams**. This category is very similar to the first one, but with a main difference of the perceived sentiment. The first category causes fear of missing out to cause urgency, however this one uses fear instead. 
3. **Phishing scams**. This category it differs a lot from the previous two. The main intent of the emails is to get user to click on a link, rather than getting a response. There the attacker can use various psychological attack strategies to lure money out of the user. These types of emails are more sophisticated to set up, as it would require a working website to be made.

## Software implementation

To automatically sort mails into their respected categories, a [text classification algorithm](https://monkeylearn.com/text-classification/) is required. For this exercise, [Naive Bayes](https://books.google.lt/books?id=_-ZDDwAAQBAJ&printsec=frontcover#v=onepage&q=naive&f=false) algorithm was used. An implementation of the algorithm was downloaded and used from the [node package manager website](https://www.npmjs.com/package/bayes).

##### Idea

To make the algorithm work, the classification was split into two stages - first analyzing if an email is spam or non spam, and then categorizing the spam emails into their separate clusters. The clusters were identical to the ones described before, however, an additional cluster - other was added. This one is used if the email is just potentially unwanted. Not all spam emails are scam emails. This cluster will be treated as a safety net to increase accuracy of the categorizer.

##### Learning

To teach the Naive Bayes AI, a data set of emails was needed. This would work better, if emails used for training were as similar, as the ones used in practice, however for best results, over 100 emails would be needed for good training, and I just simply don't have that many. Instead a [publically available dataset from kaggle](https://www.kaggle.com/veleon/ham-and-spam-dataset) will be used instead. This dataset has already sorted emails by spam vs non-spam.

To categorize emails to their own categories, manual filtering is needed. A small subset of spam emails were carefully selected for learning of the categorizer algorithm, manually labeling the emails into 1 of 4 clusters (positive, negative, phishing, other). Then the emails were used to teach the second Naive Bayes classifier.

##### Limitations

The emails were trained on only the contents of the document. For better filtering and classification, the headers need to be checked, the from email address needs to be verified, in case its typed like go0gle.com, extra consideration needs to be taken for href parts of "a" tags in html code, inclusion of special characters, sender IP address and many more.

##### Usage

To use the algorithm, a NodeJS environment is needed. The program itself is launched with the command `node classfier.js`. Then the program expects one of 3 arguments for training the filter, training the categorizer, or classifying the file. The model trainers output a file in the current directory for usage in the classifier.

###### Example

Input: `node . classify ./emails/scam_email_01.eml ./classifier.json ./categorizer.json`.
Output: `'phishing'`.

