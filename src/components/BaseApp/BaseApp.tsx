import "../../App.css";
import React from "react";
import { COMMANDS, MIMETYPE } from "../../commands";
import Toolbar from "../Toolbar/Toolbar";
import SourceModal from "../SourceModal/SourceModal";
import { AppContainer, StyledVideo } from "./BaseAppStyles";
import AuthButton from "../AuthButton/AuthButton";
import { getAuthStatus } from "../../api/api";
import { AuthContext } from "../../context/Auth/AuthContext";

type BaseAppProps = {
  ipcRenderer: any;
};

function BaseApp(props: BaseAppProps) {
  const { state, dispatch } = React.useContext(AuthContext);
  const repeat = React.useRef<boolean>(false);
  const [sources, setSources] = React.useState<any | undefined>(undefined);
  const [mediaRecorder, setMediaRecorder] = React.useState<any>(undefined);
  const [sourceModal, setSourceModal] = React.useState<boolean>(false);
  const [buffer, setBuffer] = React.useState<any>(undefined);
  const [sourceLoading, setSourceLoading] = React.useState<boolean>(false);
  const [preview, setPreview] = React.useState<string | undefined>(undefined);

  const videoElem = React.useRef<any>();

  const { ipcRenderer } = props;

  const openUrlBrowser = (url: string) => {
    ipcRenderer.send(COMMANDS.OPEN_AUTH_TAB, { url: url });
  };

  const getSources = () => {
    setSourceModal(true);
    setSourceLoading(true);
    videoElem.current.srcObject = null;
    setBuffer(undefined);
    setPreview(undefined);
    ipcRenderer.send(COMMANDS.GET_SOURCES, {});
  };

  const handleStop = () => {
    mediaRecorder.stop();
    videoElem.current.srcObject = null;
    videoElem.current.src = null;
  };

  const handleDownload = () => {
    if (buffer) {
      ipcRenderer.send(COMMANDS.SAVE_FILE, { buffer: buffer });
    }
  };

  const handlePreview = () => {
    if (preview) {
      videoElem.current.src = preview;
      videoElem.current.controls = true;
    }
  };

  const handleSourceSelection = async (s: any, aud: boolean) => {
    setSources(undefined);
    setSourceModal(false);

    const rec: any = [];
    const constraints: any = {
      audio: aud
        ? {
            mandatory: {
              chromeMediaSource: "desktop",
            },
          }
        : false,
      video: {
        mandatory: {
          chromeMediaSource:
            process.platform === "win32" ? "desktop" : "screen",
          chromeMediaSourceId: s.id,
          minFrameRate: Math.round(60),
          maxFrameRate: Math.round(60),
        },
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    if (videoElem) {
      videoElem.current.srcObject = stream;
      videoElem.current.controls = false;
      videoElem?.current.play();

      const options = { mimeType: MIMETYPE };
      let mr = new MediaRecorder(stream, options);
      mr.start();
      setMediaRecorder(mr);

      mr.ondataavailable = (e) => {
        rec.push(e.data);
      };

      mr.onstop = async () => {
        const blob = new Blob(rec, {
          type: MIMETYPE,
        });
        const buffer = Buffer.from(await blob.arrayBuffer());
        setPreview(URL.createObjectURL(blob));
        setBuffer(buffer);
      };
    }
  };

  React.useEffect(() => {
    // Listen for the event
    ipcRenderer.on(COMMANDS.GET_SOURCES, (event: any, arg: any) => {
      setSources(arg);
      setSourceLoading(false);
    });
    ipcRenderer.send(COMMANDS.GET_COOKIES, { name: "tokens" });
    ipcRenderer.on(COMMANDS.GET_COOKIES, async (event: any, arg: any) => {
      const tokens = arg?.[0]?.value;
      let id_token = tokens ? JSON.parse(decodeURI(tokens))?.id_token : "";
      if (id_token !== "") {
        const res = await getAuthStatus(id_token);
        if (res?.data?.status === "PASS" && repeat.current === false) {
          dispatch({ type: "TOGGLE" });
        }
        repeat.current = true;
      }
    });

    return () => {
      ipcRenderer.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContainer>
      <AuthButton openUrlBrowser={openUrlBrowser} />
      <Toolbar
        getSources={getSources}
        handleStop={handleStop}
        handlePreview={handlePreview}
        handleDownload={handleDownload}
      />
      <SourceModal
        openState={sourceModal}
        onClose={() => setSourceModal(false)}
        sources={sources}
        handleSourceSelection={handleSourceSelection}
        sourceLoading={sourceLoading}
      />
      <StyledVideo autoPlay ref={videoElem} muted controlsList="nodownload" />
    </AppContainer>
  );
}

export default BaseApp;
