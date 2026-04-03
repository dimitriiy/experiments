import React from "react";
import { CodeViewer } from "./CodeViewer";

export const CodeLoader = ({ component }: { component: string }) => {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    async function loadFiles({ component }) {
      const response = await fetch(
        `/experiments/components-inventory/${component}/meta.json`,
      );
      const meta = await response.json();

      const rawFiles = await Promise.all(
        meta.files.map((file) =>
          fetch(
            `/experiments/components-inventory/${component}/${file}.txt`,
          ).then((f) => f.text()),
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

    loadFiles({ component });
  }, []);

  return <div className="">{files?.length && <CodeViewer data={files} />}</div>;
};
