import { useBackgroundFilters } from '@stream-io/video-react-sdk';
import { X } from 'lucide-react';
export const MyBackgroundFilterSettings = () => {
  const {
    isSupported, // checks if these filters can run on this device
    isReady, // checks if the filters are ready to be enabled
    disableBackgroundFilter, // disables the filter
    applyBackgroundBlurFilter, // applies the blur filter
    applyBackgroundImageFilter, // applies the image filter
    backgroundImages, // list of available images
  } = useBackgroundFilters();

  if (!isSupported) {
    return <div>Background filters are not supported on this device</div>;
  }
// Define a separate array for gradients
const gradients = [
  "/images/gradient-image-1.avif",
        "/images/gradient-image-2.avif",
        "/images/gradient-image-3.avif",
        "/images/gradient-image-4.avif",
];

  if (!isReady) {
    return <div className="my-loading-indicator" />;
  }
console.log(backgroundImages,'images')
  return (
    <div className="my-video-filters">
      <span>Effects</span>
      {/* <br/> */}
      <div className='blurEffect'>
      <button onClick={disableBackgroundFilter}><X/></button>
      <button onClick={() => applyBackgroundBlurFilter('high')}>Blur3</button>
      <button onClick={() => applyBackgroundBlurFilter('medium')}>Blur2</button>
      <button onClick={() => applyBackgroundBlurFilter('low')}>Blur1</button>
      {/* <br/> */}</div>
      <span className='backgrounds'>Backgrounds</span>
      <ul className='backGroundUl'>
        {backgroundImages?.map((image) => (
          <li key={image}>
            <img src={image} alt="background" onClick={() => applyBackgroundImageFilter(image)}/>
          </li>
        ))}
      </ul>
      <span className='backgrounds'>Gradients</span>
      <ul className='backGroundUl'>
        {gradients?.map((image) => (
          <li key={image}>
            <img src={image} alt="gradients" onClick={() => applyBackgroundImageFilter(image)}/>
          </li>
        ))}
      </ul>
    </div>
  );
};