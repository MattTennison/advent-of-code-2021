import { program } from "commander";
import { solve } from "./commands/solve";

program
  .command("solve <day> <input-path>")
  .action(solve)
  .parseAsync(process.argv)
  .catch((err) => {
    console.log(`💥 | Sorry, something went wrong | ${err.message}`);
  });
