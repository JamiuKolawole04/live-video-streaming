import { CreateButton } from "../components/createButton";

export const Home = () => {
  return (
    <div className="App justify-center w-screen h-screen flex items-center ">
      {/* <button className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white">
        Start new meeting
      </button> */}
      <CreateButton />
    </div>
  );
};
