import fs from 'fs'
import path from 'path'

export default function (data, directory, filename) {

  const finalFile = filename || 'build.json'
  const finalDir = directory || 'dist'

  if (!fs.existsSync(finalDir)) {
    fs.mkdirSync(finalDir);
  }

  fs.writeFileSync(
    path.join(finalDir, finalFile),
    JSON.stringify(data)
  )
}
