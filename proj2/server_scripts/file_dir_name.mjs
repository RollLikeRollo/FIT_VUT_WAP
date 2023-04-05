/**
 * @file file_dir_name.mjs
 * @description Returns the directory name of the app.
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * 
 * @param {*} meta  
 * @returns Directory and file name of the app.
 */
export default function fileDirName(meta) {
  const __filename = fileURLToPath(meta.url);

  const __dirname = dirname(__filename);

  return { __dirname, __filename };
}