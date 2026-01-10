"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import ProjectHeader from "./_shared/ProjectHeader";
import Setting from "./_shared/Setting";

import { ProjectType, ScreenConfig } from "@/type/types";
import { Loader2Icon } from "lucide-react";
import { get } from "http";

const Page = () => {
  const { projectId } = useParams();

  const [projectDetail, setProjectDetail] = useState<ProjectType | undefined>(undefined);
  const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  // Fetch project details
  useEffect(() => {
    projectId && getProjectDetail();
  }, [projectId]);

  const getProjectDetail = async () => {
    setLoading(true);
    setLoadingMessage("Loading.....");
    const result = await axios.get("/api/project?projectId=" + projectId);
    console.log(result.data);
    setProjectDetail(result?.data?.projectDetails);
    setScreenConfig(result?.data?.screenConfig);
    setLoading(false);
  };

  useEffect(() => {
    if (projectDetail && screenConfig && screenConfig.length == 0) {
      generateScreenConfig();
    }
  }, [projectDetail && screenConfig]);

  const generateScreenConfig = async () => {
    setLoading(true);
    setLoadingMessage("Generating Screen Config ...");
    const result = await axios.post("/api/generate-config", {
      projectId: projectId,
      deviceType: projectDetail?.device,
      userInput: projectDetail?.userInput,
    });
    console.log(result.data);
    getProjectDetail();
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      <ProjectHeader />

      {loading && (
        <div className="fixed z-50 left-1/2 top-20 -translate-x-1/2 bg-blue-300/20 border border-blue-400 rounded-xl px-4 py-2">
          <h2 className="flex gap-2 items-center text-sm font-medium">
            <Loader2Icon className="animate-spin w-4 h-4" />
            {loadingMessage}
          </h2>
        </div>
      )}

      <div className="mt-4">
        <Setting projectDetail={projectDetail} />
      </div>
    </div>
  );
};

export default Page;
