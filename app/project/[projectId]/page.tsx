import React from "react";
import ProjectHeader from "./_shared/ProjectHeader";
import Setting from "./_shared/Setting";

const ProjectCanvasPlayground = () => {
  return (
    <div>
      <ProjectHeader />

      <div className="flex">
        {/* Sidebar */}
        <Setting />

        {/* Canvas */}
       
      </div>
    </div>
  );
};

export default ProjectCanvasPlayground;
