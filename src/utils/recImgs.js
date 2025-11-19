import Writing from "../assets/images/writing.png";
import Data from "../assets/images/data.png";
import Business from "../assets/images/business.png";
import Cybersecurity from "../assets/images/cybersecurity.png";
import Project from "../assets/images/project.png";
import Programming from "../assets/images/programming.png";
import Marketing from "../assets/images/marketing.png";
import Health from "../assets/images/health.png";
import Artificial from "../assets/images/artificial.png";
import Design from "../assets/images/design.png";
import Management from "../assets/images/management.png";
import Finance from "../assets/images/finance.png";
import Media from "../assets/images/media.png";
import Web from "../assets/images/web.png";
import Cloud from "../assets/images/cloud.png";
import Software from "../assets/images/software.png";
import MachineLearning from "../assets/images/machine learning.png";
import Generic from "../assets/images/generic.png";

const courseImages = [
  Writing,
  Data,
  Business,
  Cybersecurity,
  Project,
  Programming,
  Marketing,
  Health,
  Artificial,
  Design,
  Management,
  Finance,
  Media,
  Web,
  Cloud,
  Software,
  MachineLearning,
];

export function getCourseImage(title) {
  if (!title) return Generic;

  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % courseImages.length;

  return courseImages[index];
}
