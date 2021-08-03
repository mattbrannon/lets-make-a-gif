const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
  const img = new Image()
  img.onload = () => {
    resolve({
      height: img.height,
      width: img.width
    })
  }
  img.src = dataURL
})

const fileAsDataURL = window.URL.createObjectURL(files[0]);
getHeightAndWidthFromDataUrl(fileAsDataURL).then(dimensions => {
  console.log(dimensions);
})

const useDimensions = (file) => {

}