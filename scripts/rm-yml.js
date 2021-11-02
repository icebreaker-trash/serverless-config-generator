const del = require('del')

  ; (async () => {
  const deletedFilePaths = await del(['test/fixtures/*.yml', 'test/fixtures/layer/*.yml'])
  console.log(deletedFilePaths)
})()
