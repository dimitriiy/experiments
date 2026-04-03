import { CodeViewer } from "@/components/CodeViewer";
import React from "react";

export const DISandbox = () => {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    import("./index");

    async function loadFiles() {
      const response = await fetch(
        "/experiments/components-inventory/di/meta.json",
      );
      const meta = await response.json();

      const rawFiles = await Promise.all(
        meta.files.map((file) =>
          fetch(`/experiments/components-inventory/di/${file}.txt`).then((f) =>
            f.text(),
          ),
        ),
      );
      console.log({ rawFiles });

      setFiles(
        meta.files.map((f, i) => ({
          file: f,
          content: rawFiles[i],
          language: "tsx",
          filename: f,
          code: rawFiles[i],
        })),
      );
    }

    loadFiles();
  }, []);

  return <div className="">{files?.length && <CodeViewer data={files} />}</div>;
};
