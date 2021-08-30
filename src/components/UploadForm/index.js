import { forwardRef } from 'react';
import styled from 'styled-components/macro';

// eslint-disable-next-line react/display-name
export const HiddenForm = forwardRef((props, ref) => {
  const { handleFileUpload, kind } = props;
  const multiple = kind === 'image';
  const accept = kind === 'image' ? '.png,.jpeg,.jpg' : 'video/*,.mkv';
  return (
    <VisuallyHidden>
      <form onSubmit={(e) => e.preventDefault()} action="/upload" method="post" encType="multipart/form-data">
        <input
          ref={ref}
          onChange={handleFileUpload}
          type="file"
          name="file"
          id="fileUpload"
          multiple={multiple}
          accept={accept}
        />
      </form>
    </VisuallyHidden>
  );
});

const VisuallyHidden = styled.div`
  visibility: hidden;
  display: none;
  width: 0;
  height: 0;
  margin: -1;
`;
