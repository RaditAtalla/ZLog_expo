export default function changeSlashToDash(filename) {
  return filename.replace(/[\/\\]/g, "_");
}
