import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import MaxWidthWrapper from '../MaxWidthWrapper';
import VisuallyHidden from  '../VisuallyHidden'
import { uploadImages, downloadVideo } from "./utils";

export default function ImagesConverter () {
  const ref = useRef(null);
  const [videoSource, setVideoSource] = useState(null);
  
  useEffect(() => {
    console.log(videoSource)
  }, [videoSource])


  const handleSubmit = e => {
    e.preventDefault();
    ref.current.click();
  };

  const handleChange = e => {
    e.preventDefault();

    console.log(ref.current.files);
    const files = ref.current.files;
    const data = new FormData();
    for (let file of files) {
      data.append('file', file);
    }

    uploadImages(data)
      .then((result) => {
        console.log('here we are', { result });
        return result;
      })
      .then(downloadVideo)
      .then((source) => setVideoSource(source))
      .catch((error) => console.error('error in handleFileUpload', error));

  };

  return (
    <div>
      <Main>
        <MaxWidthWrapper>
          <h1>Images Converter Page</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            reiciendis explicabo harum recusandae repellat vel numquam qui
            deserunt. Molestias consectetur ut accusantium neque cum omnis
            ipsum, doloribus possimus vitae amet.
          </p>
          <UploadForm handleSubmit={handleSubmit}>
            <FilePickerButton>choose image files</FilePickerButton>
            <VisuallyHidden>
              <label htmlFor="file">
                <input
                  ref={ref}
                  onChange={handleChange}
                  type="file"
                  name="file"
                  id="file"
                  multiple={true}
                />
              </label>
            </VisuallyHidden>
          </UploadForm>
        </MaxWidthWrapper>
      </Main>
    </div>
  );
}

const Main = styled.main`
  background: beige;
  height: var(--mainHeight);
  width: 100%;
`;

const UploadForm = ({ ...props }) => {
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    handleDrag(e);
    const dt = e.dataTransfer;
    const files = dt.files;
    console.log(files);
    // this.handleFileUpload(files);
  };

  return (
    <form
      onSubmit={props.handleSubmit}
      style={{
        height: '400px',
        background: 'lightgrey',
        display: 'grid',
        placeItems: 'center',
      }}
      // ref={dropSpot}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      method="post"
      encType="multipart/form-data"
    >
      {props.children}
    </form>
  );
};

const FilePickerButton = styled.button`
  background: transparent;
  border: none;
  color: deeppink;
  font-size: 1.2rem;
  &:hover {
    color: firebrick;
    cursor: pointer;
  }
`;
