import chalk from 'chalk';

export const colorMap = {
  '0': chalk.black,
  '1': chalk.blue,
  '2': chalk.green,
  '3': chalk.cyan,
  '4': chalk.red,
  '5': chalk.magenta,
  '6': chalk.yellow,
  '7': chalk.gray,
  '8': chalk.dim.gray,
  '9': chalk.blueBright,
  'a': chalk.greenBright,
  'b': chalk.cyanBright,
  'c': chalk.redBright,
  'd': chalk.magentaBright,
  'e': chalk.yellowBright,
  'f': chalk.white,
  'r': chalk.reset,
};

export function colorizeMessage(message: string): string {
  return message.replace(/§([0-9a-fk-or])/g, (match, code) => {
    const style = colorMap[code] || chalk.reset;
    return style('');
  });
}