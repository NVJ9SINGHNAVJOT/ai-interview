import { useParams } from "react-router-dom";

const Auth = () => {
  const { type } = useParams();

  return <div className="w-full min-h-[calc(100%-3.8rem)] bg-neutral-800 flex justify-center items-center">

  </div>;
};

export default Auth;
