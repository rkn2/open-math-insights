import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "@/layout/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { DataDepotPage } from "@/pages/DataDepotPage";
import { DatasetDetailPage } from "@/pages/DatasetDetailPage";
import { UseOmiPage } from "@/pages/UseOmiPage";
import { LearningCenterPage } from "@/pages/LearningCenterPage";
import { CommunityPage } from "@/pages/CommunityPage";
import { AboutPage } from "@/pages/AboutPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="data-depot" element={<DataDepotPage />} />
          <Route path="data-depot/:datasetId" element={<DatasetDetailPage />} />
          <Route path="use-omi" element={<UseOmiPage />} />
          <Route path="learning-center" element={<LearningCenterPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
