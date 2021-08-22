import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
import FiltersPanel from '../Filters';
import UploadForm from '../UploadForm';
import DownloadButton from '../Download';
import ContentArea from '../ContentArea';
import { useFilters } from '../../hooks/useFilters';
import { useWindowSize } from '../../hooks/useWindowSize';
import StatusInfo from '../StatusInfo';

export default function Main({ kind }) {
  const size = useWindowSize();
  const filter = useFilters();

  const [ filename, setFilename ] = useState('');
  const [ source, setSource ] = useState('');
  const [ backup, setBackup ] = useState('');
  const [ update, setUpdate ] = useState('');
  const [ error, setError ] = useState('');
  const [ frames, setFrames ] = useState(0);
  const [ path, setPath ] = useState('');
  const [ isOpen, setIsOpen ] = useState(false);

  const [ percentComplete, setPercentComplete ] = useState(0);
  const [ status, setStatus ] = useState({ isUpdating: false, isError: false, isUploading: false });
  const [ showStatus, setShowStatus ] = useState(false);

  const [ data, setData ] = useState({
    size,
    filename,
    source,
    backup,
    status,
    percentComplete,
    update,
    error,
    frames,
    isOpen,
    setIsOpen,
  });

  useEffect(() => {
    const { isError, isUploading, isUpdating } = status;
    const shouldShowStatus = [ isError, isUploading, isUpdating ].some((item) => item);
    setShowStatus(shouldShowStatus);
    // console.log({ isError, isUploading, isUpdating });
  }, [ status ]);

  useEffect(() => {
    setData({ source, backup, size, filename, percentComplete, status, frames, error, update, isOpen });
    // console.log({ source, size, filename, percentComplete, status, frames, error, update });
  }, [ source, backup, size, filename, percentComplete, status, frames, path, isOpen ]);

  const handleError = (error) => {
    setStatus({ ...status, isError: true });
    setError(error);
  };

  const handleUpdate = (update) => {
    setStatus({ ...status, isUpdating: true });
    setUpdate(update);
  };

  const handleSuccess = (source) => {
    const prop = source ? 'isUpdating' : 'isUploading';
    setStatus({ ...status, [prop]: false, isError: false });
    setError('');
    setUpdate('');
    setSource(source);
    setBackup(source);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    let path;
    if (kind === 'image') {
      if (files.length === 1) {
        path = '/api/upload/image';
        setPath(path);
        // console.log({ path });
      }
      else {
        path = '/api/upload/images';
        setPath(path);
        // console.log({ path });
      }
    }
    if (kind === 'video') {
      path = '/api/upload/videos';
      setPath(path);
      // console.log({ path });
    }

    if (files.length <= 300) {
      setFrames(files.length);

      const filename = files.length === 1 && kind === 'image' ? files[0].name : formatFilename(files[0].name);
      const { filters } = filter;
      // const framerate = filters.framerate;
      setFilename(filename);
      setSource('');
      // if (framerate <= 1) {
      //   filter.setFramerate(getFramerate(files.length));
      // }
      // filter.setFramerate(getFramerate(files.length));
      const formData = new FormData();
      for (let file of files) {
        formData.append('file', file);
      }
      formData.append('path', JSON.stringify(path));
      formData.append('filters', JSON.stringify(filters));
      formData.append('filterString', filter.filterString);
      setStatus({ ...status, isUploading: true, isError: false });

      // console.log({ path });

      upload(path, formData, setPercentComplete)
        .then(downloadVideo)
        .then(handleSuccess)
        .catch(handleError);
    }
    else {
      handleError('Please select 300 or fewer files');
    }
  };

  const applyFilters = () => {
    const { filters, filterString } = filter;
    handleUpdate('Applying filters...');
    axios
      .post('/api/upload/filters', { filters, filterString, path })
      .then(downloadVideo)
      .then(handleSuccess)
      .catch(handleError);
  };

  return (
    <>
      <MainGrid>
        <FiltersPanel setIsOpen={setIsOpen} frames={frames} data={{ ...data, filter, applyFilters }} />
      </MainGrid>
    </>
  );
}

{
  /* <UploadForm kind={kind} handleFileUpload={handleFileUpload} />
<ContentArea {...data} /> */
}
// {showStatus ? <StatusInfo {...data} /> : <DownloadButton {...data} />}

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(min(320px, 100%), 1fr) 1fr;
  /* grid-template-rows: 40px minmax(280px, 1fr) 40px max-content; */
  justify-content: center;
  height: 100%;
`;

function Image({ size, source, backup }) {
  return <PreviewImage size={size} src={source || backup} />;
}

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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

// const formatBytes = (bytes, decimals = 2) => {
//   if (bytes === 0) return '0 Bytes';

//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];

//   const i = Math.floor(Math.log(bytes) / Math.log(k));

//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
// };
