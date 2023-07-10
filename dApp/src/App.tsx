import ToastProvider from "./provider/toastProvider";
import Header from "./components/header";
import useAppInit from "./hooks/useAppInit";
import NftForm from "./components/nftForm";

function App() {
  useAppInit();
  return (
    <ToastProvider>
      <Header />
      <NftForm />
    </ToastProvider>
  );
}

export default App;
