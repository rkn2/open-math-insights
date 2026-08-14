import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "@/layout/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { DataDepotPage } from "@/pages/DataDepotPage";
import { DatasetDetailPage } from "@/pages/DatasetDetailPage";
import { UseOmiPage } from "@/pages/UseOmiPage";
import { LearningCenterPage } from "@/pages/LearningCenterPage";
import { CommunityPage } from "@/pages/CommunityPage";
import { AboutPage } from "@/pages/AboutPage";
import { ResearcherGuidePage } from "@/pages/ResearcherGuidePage";
import { GettingStartedCoursePage } from "@/pages/GettingStartedCoursePage";
import { UsingDataInClassroomPage } from "@/pages/learning/UsingDataInClassroomPage";
import { UnderstandingStudentDataPage } from "@/pages/learning/UnderstandingStudentDataPage";
import { ResearchersInClassroomPage } from "@/pages/learning/ResearchersInClassroomPage";
import { CodebooksPage } from "@/pages/learning/CodebooksPage";
import { SchemasMetadataAnnotationPage } from "@/pages/learning/SchemasMetadataAnnotationPage";
import { IntroToMLPage } from "@/pages/learning/IntroToMLPage";
import { StatisticalFoundationsPage } from "@/pages/learning/StatisticalFoundationsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function App() {
  return (
    <BrowserRouter basename="/open-math-insights">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="data-depot" element={<DataDepotPage />} />
          <Route path="data-depot/:datasetId" element={<DatasetDetailPage />} />
          <Route path="use-omi" element={<UseOmiPage />} />
          <Route path="learning-center" element={<LearningCenterPage />} />
          <Route path="learning-center/getting-started" element={<GettingStartedCoursePage />} />
          <Route path="learning-center/using-data-in-classroom" element={<UsingDataInClassroomPage />} />
          <Route path="learning-center/understanding-student-data" element={<UnderstandingStudentDataPage />} />
          <Route path="learning-center/researchers-in-classroom" element={<ResearchersInClassroomPage />} />
          <Route path="learning-center/codebooks" element={<CodebooksPage />} />
          <Route path="learning-center/schemas-metadata-annotation" element={<SchemasMetadataAnnotationPage />} />
          <Route path="learning-center/intro-to-ml" element={<IntroToMLPage />} />
          <Route path="learning-center/statistical-foundations" element={<StatisticalFoundationsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="researcher-guide" element={<ResearcherGuidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
