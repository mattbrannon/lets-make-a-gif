import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
import FiltersPanel from '../Filters';
import { HiddenForm } from '../UploadForm';
import DownloadButton from '../Download';
import UploadButton from '../UploadButton';
import { Preview } from '../Preview';
import { useFilters } from '../../hooks/useFilters';
import StatusInfo from '../StatusInfo';
import { useElementSize } from '../../hooks/useElementSize';

export default function Main() {
  const filter = useFilters();
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const imageSize = useElementSize(imageRef);
  const [ kind, setKind ] = useState('');

  const [ filename, setFilename ] = useState('');
  const [ source, setSource ] = useState('');
  const [ update, setUpdate ] = useState('');
  const [ error, setError ] = useState('');
  const [ framerate, setFramerate ] = useState(0);
  const [ frames, setFrames ] = useState(0);
  const [ filesize, setFilesize ] = useState('');
  const [ route, setRoute ] = useState('');
  const [ ext, setExtension ] = useState('');
  const [ isOpen, setIsOpen ] = useState(false);
  const [ percentComplete, setPercentComplete ] = useState(0);
  const [ status, setStatus ] = useState({ isUpdating: false, isError: false, isUploading: false, isReset: false });
  const [ data, setData ] = useState({
    filename,
    ext,
    source,
    status,
    percentComplete,
    filesize,
    update,
    error,
    framerate,
    isOpen,
    setIsOpen,
  });

  useEffect(() => {
    setData({ source, filename, percentComplete, filesize, status, framerate, error, update, isOpen, ext });
  }, [ source, filename, percentComplete, status, framerate, route, isOpen, ext, filesize ]);

  const handleError = (error) => {
    setStatus({ ...status, isError: true });
    setError(error);
  };

  const handleUpdate = (update) => {
    setStatus({ ...status, isUpdating: true, isReset: false });
    setUpdate(update);
  };

  const handleSuccess = (source) => {
    const prop = source ? 'isUpdating' : 'isUploading';
    setStatus({ ...status, [prop]: false, isError: false, isReset: false });
    setError('');
    setUpdate('');
    setSource(source);
  };

  const handleFramerate = ({ framerate }) => {
    filter.setFramerate(framerate);
    setFramerate(framerate);
  };

  const updateRoute = (kind, files) => {
    let route;
    if (kind === 'image') {
      if (files.length === 1) {
        route = '/api/upload/image';
      }
      else {
        route = '/api/upload/images';
      }
    }
    if (kind === 'video') {
      route = '/api/upload/videos';
    }
    setRoute(route);
    return route;
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length) {
      const size = [ ...files ].reduce((acc, file) => acc + file.size, 0);
      const filesize = formatBytes(size);
      setFilesize(filesize);

      if (size < 2.0e7) {
        if (files.length <= 450) {
          const firstFile = files[0].name;
          const ext = firstFile.slice(firstFile.lastIndexOf('.')).toLowerCase();
          const filename = firstFile.slice(0, firstFile.lastIndexOf('.'));
          const route = updateRoute(kind, files);
          const framerate = getFramerate(files.length);

          setFramerate(framerate);
          setFrames(files.length);
          setFilename(filename);
          setExtension(ext);
          setSource('');

          const formData = new FormData();
          for (let file of files) {
            formData.append('file', file);
          }
          formData.append('ext', ext);
          formData.append('route', route);
          formData.append('filename', filename);
          formData.append('filterString', filter.filterString);
          formData.append('framerate', framerate);
          setStatus({ ...status, isUploading: true, isError: false });

          uploadFiles(route, formData, setPercentComplete)
            .then(handleFramerate)
            .then(downloadVideo)
            .then(handleSuccess)
            .catch(handleError);
        }
        else {
          handleError('Please limit the number of files to 450 or less');
        }
      }
      else {
        handleError(`
        Combined size of files: ${filesize}
        Please limit total files to less than 15mb
        `);
      }
    }
  };

  const resetFilters = () => {
    const { filterString } = filter;
    handleUpdate('Resetting filters...');
    axios
      .post('/api/upload/reset', { filename, ext, framerate, filterString, route })
      .then(downloadVideo)
      .then(handleSuccess)
      .catch(handleError);
  };

  const applyFilters = () => {
    const { filterString } = filter;
    handleUpdate('Applying filters...');
    axios
      .post('/api/upload/filters', { filename, ext, framerate, filterString, route })
      .then(downloadVideo)
      .then(handleSuccess)
      .catch(handleError);
  };
  const handleButtonClick = async (e) => {
    await setKind(e.target.name);
    await formRef.current.click();
  };

  return (
    <>
      <MainGrid {...data}>
        <Preview imageSize={imageSize} ref={imageRef} {...data} />
        <ButtonGroup>
          <UploadButton name="image" {...data} onClick={handleButtonClick} />
          <DownloadButton {...data} />
          <UploadButton name="video" {...data} onClick={handleButtonClick} />
        </ButtonGroup>
        <StatusInfo {...data} />
        <HiddenForm ref={formRef} handleFileUpload={handleFileUpload} kind={kind} />
        <FiltersPanel
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          setStatus={setStatus}
          status={status}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          imageSize={imageSize}
          setFramerate={setFramerate}
          frames={frames}
          filter={filter}
          framerate={framerate}
        />
      </MainGrid>
    </>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  grid-column: 1 / -1;
  align-self: start;
  flex-wrap: wrap;
  flex: 1;
  /* flex-direction: column; */
  max-width: 600px;
  margin: 0 auto;
  /* height: 100%; */
  @media (max-width: 320px) {
    flex-direction: column;
    height: 100%;
    max-width: 200px;
    justify-content: space-around;
    align-items: center;
    /* gap: 16px; */
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 20vw 60vw 20vw;
  justify-content: center;
  height: calc(100vh - var(--headerHeight) - var(--footerHeight));
  overflow: hidden;
`;

const handleProgressEvent = (progressEvent, setPercentComplete) => {
  const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  setPercentComplete(percentComplete);
};

const uploadFiles = async (route, data, callback) => {
  try {
    const url = route.charAt(0) === '/' ? route : `/${route}`;
    const response = await axios.post(url, data, {
      onUploadProgress: callback ? (e) => handleProgressEvent(e, callback) : null,
    });
    return await response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const downloadVideo = async () => {
  try {
    const response = await fetch('/api/download');
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getFramerate = (n) => {
  n = Number(n);
  while (n > 30) {
    n = n / 2;
  }
  while (n <= 10) {
    n = n * 2;
  }
  return Math.round(n);
};
