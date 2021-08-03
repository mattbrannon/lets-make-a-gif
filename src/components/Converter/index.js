import { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import icon from './icon.svg';
import VisuallyHidden from '../VisuallyHidden';
// import MaxWidthWrapper from '../MaxWidthWrapper';

import useFileSettings from '../../hooks/useFileSettings';
import FiltersPanel from '../Filters';

import axios from 'axios';

export default function ConverterPage({ children, kind, ...props }) {
  const ref = useRef(null);
  const [videoSource, setVideoSource] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [colorFilter, setColorFilter] = useState({ h: null, s: null, b: null });
  const [embossFilter, setEmbossFilter] = useState(false);
  const [flipFilter, setFlipFilter] = useState({ hflip: false, vflip: false });
  const [fpsFilter, setFpsFilter] = useState(false);
  
  const filters = {
    colorFilter,
    embossFilter,
    flipFilter,
    fpsFilter
  }

  const filterMethods = {
    setColorFilter,
    setEmbossFilter,
    setFlipFilter,
    setFpsFilter
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    hue: { h: colorFilter.h, s: colorFilter.s, b: colorFilter.b},
    emboss: embossFilter,
    fps: fpsFilter,
    vflip: flipFilter.vflip,
    hflip: flipFilter.hflip
  }

  // const [options, setOptions] = useState({
  //   color: { hue: { h: false, s: false, b: false } },
  //   emboss: false,
  //   hflip: false,
  //   vflip: false,
  //   fps: false,
  // });
  const [percentComplete, setPercentComplete] = useState(0);
  const settings = useFileSettings(kind);
  // const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (videoSource) {
      setIsUploading(false);
    }

    console.log(options);
  }, [options, videoSource]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    handleDrag(e);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileUpload = (files) => {
    const firstFile = files[0].name;
    const i = firstFile.lastIndexOf('.');
    const fileName = firstFile.slice(0, i) + '.gif';

    setFileName(fileName);

    const data = new FormData();
    for (let file of files) {
      data.append('file', file);
    }
    data.append('filters', JSON.stringify(options));
    setIsUploading(true);

    upload(settings.path, data, setPercentComplete)
      .then(downloadVideo)
      .then((videoSource) => setVideoSource(videoSource))
      .catch((error) => console.error({ error }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const files = ref.current.files;
    if (files.length) {
      handleFileUpload(files);
    }
  };

  return (
    <Container>
      <DropZone onDragEnter={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
        <UploadForm onSubmit={(e) => e.preventDefault()}>
          <Label>
            <VisuallyHidden>
              <HiddenInput
                ref={ref}
                accept={settings.accept}
                multiple={settings.multiple}
                onChange={handleChange}
              />
            </VisuallyHidden>

            <FilePickerButton onClick={() => ref.current.click()}>
              {settings.buttonText}
            </FilePickerButton>
            <DragPrompt>Or drag and drop files onto the page</DragPrompt>
          </Label>
        </UploadForm>
        <PreviewArea>
          {isUploading ? (
            percentComplete < 100 ? (
              <progress max={100} value={percentComplete}></progress>
            ) : (
              <Converting />
            )
          ) : videoSource ? (
            <Preview videoSource={videoSource} fileName={fileName} />
          ) : (
            <Img
              src={icon}
              alt="upload images"
              onClick={() => ref.current.click()}
            />
          )}
        </PreviewArea>
        <FiltersPanel filters={filters} filterMethods={filterMethods} />
      </DropZone>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const HiddenInput = styled.input.attrs({
  type: 'file',
  name: 'file',
})`
  visibility: hidden;
  height: 0;
  width: 0;
`;

const DropZone = styled.div`
  min-height: var(--mainHeight);
  height: var(--mainHeight);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
`;

const UploadForm = styled.form.attrs({
  encType: 'multipart/form-data',
  method: 'post',
})`
  justify-self: start;
  /* background: lightgrey; */
`;

const PreviewArea = styled.div`
  height: 300px;
  display: grid;
  place-items: center;
  /* background: lightgrey; */
`;

const spin = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

const Spinner = styled.div`
  height: 50px;
  width: 50px;
  background: transparent;
  border: 8px solid #ebebeb;
  border-radius: 50%;
  border-top: 8px solid blue;
  animation: ${spin} 2s infinite linear forwards;
`;

function Converting() {
  return (
    <>
      <Spinner />
      <p>Converting to gif...</p>
    </>
  );
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const DragPrompt = styled.small`
  text-align: center;
`;

const FilePickerButton = styled.button`
  display: block;
  margin-top: 32px;
  margin-bottom: 8px;

  font-family: futura;
  text-align: center;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: deeppink;
  &:hover {
    color: firebrick;
    cursor: pointer;
  }
`;

const DownloadButton = styled.a`
  color: whitesmoke;
  font-weight: bold;
  color: deeppink;
  margin-bottom: 32px;
  margin-top: 32px;
`;

const Img = styled.img`
  width: 50px;
  height: auto;
  &:hover {
    cursor: pointer;
  }
`;

function Preview({ videoSource, fileName }) {
  return (
    <>
      <img height="300" width="auto" src={videoSource} alt="gif" />
      <DownloadButton href={videoSource} download={fileName}>
        Download gif
      </DownloadButton>
    </>
  );
}

const handleProgressEvent = (progressEvent, setState) => {
  const percentComplete = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  );
  setState(percentComplete);
};

export const upload = async (path, data, callback) => {
  try {
    const route = path.charAt(0) === '/' ? path : `/${path}`;
    const response = await axios.post(route, data, {
      onUploadProgress: (e) => handleProgressEvent(e, callback),
    });
    return await response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export const uploadVideo = async (data, callback) => {
//   try {
//     const response = await axios.post('/upload-video', data, {
//       onUploadProgress: (e) => handleProgressEvent(e, callback),
//     });
//     return await response.data;
//   } catch (error) {
//     console.error('AXIOS ERROR ->', error.message);
//   }
// };

// export const uploadImages = async (data, callback) => {
//   try {
//     const response = await axios.post('/upload-images', data, {
//       onUploadProgress: (e) => handleProgressEvent(e, callback),
//     });
//     console.log('RESPONSE', response);
//     return await response.data;
//   } catch (error) {
//     console.log('AXIOS ERROR ->', error.message);
//   }
// };

export const downloadVideo = async () => {
  try {
    const response = await fetch('/download');
    const blob = await response.blob();
    const objectUrl = await URL.createObjectURL(blob);
    console.log(objectUrl);
    return objectUrl;
  } catch (error) {
    console.error(error);
  }
};

// //https://stackoverflow.com/a/43383990
// export const generateHash = (filename) => {
//   let strBuf = new TextEncoder('utf-8').encode(filename);
//   return crypto.subtle.digest('SHA-256', strBuf).then((hash) => {
//     let result = '';
//     const view = new DataView(hash);
//     for (let i = 0; i < hash.byteLength; i += 4) {
//       result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
//     }
//     return result;
//   });
// };
