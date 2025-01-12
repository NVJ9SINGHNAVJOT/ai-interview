import React from "react";
import "@/components/loaders/multicubeloader/MultiCubeLoader.css";
import { cn } from "@/utils/cn";

type MultiCubeLoaderProps = {
  className?: string;
};

const MultiCubeLoader = (props: MultiCubeLoaderProps) => {
  const cubeRows = [-1, 0, 1];
  const cubeColumns = [3, 2, 1];

  return (
    <div className={cn("multiContainer", props.className)}>
      {Array(3)
        .fill(null)
        .map((_, cubeIndex) => (
          <div key={cubeIndex} className="multiCube">
            {cubeRows.map((x) => (
              <div key={x} style={{ "--x": x, "--y": 0 } as React.CSSProperties}>
                {cubeColumns.map((i) => (
                  <span key={i} style={{ "--i": i } as React.CSSProperties}></span>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default MultiCubeLoader;
