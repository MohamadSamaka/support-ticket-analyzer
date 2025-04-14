import chalk from "chalk";
import { isValid as isValidDate } from "date-fns";
import { parseArgs } from "./argParser";
import { loadKeywords } from "./keywordLoader";
import { analyse } from "./index";
import { printResults } from "./printer";

(async () => {
  try {
    const { file, since: sinceStr, keywords: kwPath, output } = parseArgs();

    const since = sinceStr ? new Date(sinceStr) : null;
    if (sinceStr && !isValidDate(since)) {
      console.error(chalk.red(`[X] Invalid --since date: ${sinceStr}`));
      process.exit(1);
    }

    const keywords = await loadKeywords(kwPath);
    const { summary, older } = await analyse(file, since, keywords);

    await printResults(summary, older, since, output);
  } catch (err) {
    console.error(chalk.red(`[X] ${ (err as Error).message }`));
    process.exit(1);
  }
})();
