import { TailSpin } from "react-loader-spinner"

type LoadingForButtonType = {
  height: string
  width: string
}

const LoadingForButton = ({ height, width }: LoadingForButtonType) => {
  return (
    <TailSpin
      height={height}
      width={width}
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="2"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}

export default LoadingForButton
