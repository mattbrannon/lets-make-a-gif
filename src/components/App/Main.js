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

export default function Main({ kind }) {
  const filter = useFilters();
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const imageSize = useElementSize(imageRef);

  const [ filename, setFilename ] = useState('');
  const [ source, setSource ] = useState('');
  const [ update, setUpdate ] = useState('');
  const [ error, setError ] = useState('');
  const [ framerate, setFramerate ] = useState(0);
  const [ path, setPath ] = useState('');
  const [ isOpen, setIsOpen ] = useState(false);
  // const [ dimensions, setDimensions ] = useState({ width: 0, height: 0 });

  const [ percentComplete, setPercentComplete ] = useState(0);
  const [ status, setStatus ] = useState({ isUpdating: false, isError: false, isUploading: false, isReset: false });
  // const [ showStatus, setShowStatus ] = useState(false);

  const [ data, setData ] = useState({
    filename,
    source,
    status,
    percentComplete,
    update,
    error,
    framerate,
    isOpen,
    setIsOpen,
  });

  useEffect(() => {
    console.log({ filter: filter.filterString });
  }, [ filter ]);

  useEffect(() => {
    setData({ source, filename, percentComplete, status, framerate, error, update, isOpen });
  }, [ source, filename, percentComplete, status, framerate, path, isOpen ]);

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

  const updateRoute = (kind, files) => {
    let path;
    if (kind === 'image') {
      if (files.length === 1) {
        path = '/api/upload/image';
      }
      else {
        path = '/api/upload/images';
      }
    }
    if (kind === 'video') {
      path = '/api/upload/videos';
    }
    setPath(path);
    return path;
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const path = updateRoute(kind, files);

    if (files.length && files.length <= 300) {
      const filename = files.length === 1 && kind === 'image' ? files[0].name : formatFilename(files[0].name);

      setFramerate(files.length);
      setFilename(filename);
      setSource('');

      const { filters } = filter;
      filters.framerate = 0;

      const formData = new FormData();
      for (let file of files) {
        formData.append('file', file);
      }
      formData.append('path', path);
      formData.append('filters', JSON.stringify(filters));
      formData.append('filterString', filter.filterString);
      formData.append('framerate', files.length);
      setStatus({ ...status, isUploading: true, isError: false });

      upload(path, formData, setPercentComplete)
        .then(({ framerate }) => {
          filter.setFramerate(framerate);
          setFramerate(framerate);
        })
        .then(downloadVideo)
        .then(handleSuccess)
        .catch(handleError);
    }
    else {
      handleError('Please select 300 or fewer files');
    }
  };

  const resetFilters = () => {
    const { filters, filterString } = filter;
    handleUpdate('Resetting filters...');
    const formData = new FormData();
    formData.append('path', path);

    formData.append('kind', JSON.stringify(kind));
    formData.append('filters', JSON.stringify(filters));
    formData.append('filterString', filterString);
    axios
      .post('/api/upload/reset', { framerate, filters, filterString, path })
      .then(downloadVideo)
      .then(handleSuccess)
      .catch(handleError);
  };

  const applyFilters = () => {
    const { filters, filterString } = filter;
    handleUpdate('Applying filters...');
    const formData = new FormData();
    formData.append('kind', kind);
    formData.append('filters', filters);
    formData.append('filterString', filterString);
    axios
      .post('/api/upload/filters', { filterString, path, filters })
      .then(downloadVideo)
      .then(handleSuccess)
      .catch(handleError);
  };

  return (
    <>
      <MainGrid {...data}>
        <Preview imageSize={imageSize} ref={imageRef} {...data} />
        <ButtonGroup>
          <UploadButton kind={kind} {...data} onClick={() => formRef.current.click()} />
          <DownloadButton {...data} />
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
          framerate={framerate}
          filter={filter}
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
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 20vw 60vw 20vw;
  justify-content: center;
  height: calc(100vh - var(--headerHeight) - var(--footerHeight));
`;

const removeFileExtension = (filename) => {
  return filename
    .split('.')
    .slice(0, -1)
    .join('-');
};

const formatFilename = (filename, ext = 'gif') => {
  return removeFileExtension(filename) + `.${ext}`;
};

const handleProgressEvent = (progressEvent, setPercentComplete) => {
  const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  setPercentComplete(percentComplete);
};

const upload = async (path, data, callback) => {
  try {
    const route = path.charAt(0) === '/' ? path : `/${path}`;
    const response = await axios.post(route, data, {
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
    const objectUrl = await URL.createObjectURL(blob);
    return objectUrl;
  } catch (error) {
    console.error(error);
  }
};

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
