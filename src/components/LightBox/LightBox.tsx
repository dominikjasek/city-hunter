import { FC } from 'react';
import { Lightbox } from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface LightBoxProps {
  imagesUrl: string[];
  isOpen: boolean;
  index?: number;
  onClose: () => void;
}

export const LightBox: FC<LightBoxProps> = ({ imagesUrl, isOpen, index, onClose }) => {
  return (
    <Lightbox
      open={isOpen}
      index={index}
      carousel={{ padding: 16 }}
      plugins={[Zoom]}
      styles={{
        container: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
      render={
        imagesUrl.length === 1
          ? {
              buttonPrev: () => null,
              buttonNext: () => null,
            }
          : {}
      }
      close={onClose}
      slides={imagesUrl.map((image) => ({ src: image }))}
      controller={{
        closeOnBackdropClick: true,
      }}
    />
  );
};
