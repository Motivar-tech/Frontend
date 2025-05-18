// Import each image individually
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
import Generic from "../assets/images/generic.png"; // Fallback image

// Map keywords to imported images
const keywordToImageMap = {
  writing: Writing,
  data: Data,
  business: Business,
  cybersecurity: Cybersecurity,
  project: Project,
  programming: Programming,
  marketing: Marketing,
  health: Health,
  artificial: Artificial,
  design: Design,
  management: Management,
  finance: Finance,
  media: Media,
  web: Web,
  cloud: Cloud,
  software: Software,
  machine: MachineLearning,
};

// Function to get the course image
export function getCourseImage(title, description, tags) {
  const keywords = Object.keys(keywordToImageMap);

  // Combine title, description, and tags into a single string
  const content = `${title} ${description} ${tags.join(" ")}`.toLowerCase();

  // Split content into individual words
  const words = content.split(/\s+/); // Split by whitespace

  // Check each word against the keywords
  for (const word of words) {
    if (keywords.includes(word)) {
      return keywordToImageMap[word]; // Return the imported image
    }
  }

  // Fallback to generic image if no match found
  return Generic;
}