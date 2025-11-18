export function generateSmartTags(title, description) {
  const content = `${title} ${description}`.toLowerCase();
  const foundTags = new Set();

  // Dictionary of keywords to display tags
  const tagMap = {
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'react': 'React',
    'python': 'Python',
    'data': 'Data Science',
    'sql': 'SQL',
    'design': 'Design',
    'ui': 'UI/UX',
    'ux': 'UI/UX',
    'marketing': 'Marketing',
    'business': 'Business',
    'management': 'Management',
    'finance': 'Finance',
    'security': 'Cybersecurity',
    'cloud': 'Cloud Computing',
    'aws': 'AWS',
    'machine learning': 'AI/ML',
    'ai': 'AI/ML',
    'writing': 'Writing',
    'communication': 'Communication',
    'project': 'Project Mgmt',
    'agile': 'Agile'
  };

  Object.keys(tagMap).forEach(keyword => {
    if (content.includes(keyword)) {
      foundTags.add(tagMap[keyword]);
    }
  });

  // Default tag if nothing matches
  if (foundTags.size === 0) return ['Online Course'];

  // Return top 3 unique tags
  return Array.from(foundTags).slice(0, 3);
}