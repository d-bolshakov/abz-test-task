import { access, mkdir } from 'fs/promises';
import { v4 } from 'uuid';

export const checkDirAccessOrCreate = async (path: string) => {
  try {
    await access(path);
  } catch (error) {
    if (error.code === 'ENOENT') await mkdir(path, { recursive: true });
    else throw error;
  }
};

export const generateUniqueFileName = (fileName: string) => {
  const splitFileName = fileName.split('.');
  const ext = splitFileName[splitFileName.length - 1];
  return v4() + '.' + ext;
};
