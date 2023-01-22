export interface ContentType {
  content: CoursePart[]
}

export interface PartType {
  content: CoursePart;
}

export interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

