import { ThreeDots } from "react-loader-spinner"

const LoadingForImage = () => {
  return (
    <div className='w-full h-full border flex justify-center items-center'>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default LoadingForImage;
