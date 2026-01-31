import { api } from './index';

export interface ProjectItem {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    category: string;
    span: string;
    dateAdded: Date;
}

export const descriptions = {
    concerts: [
        "Live concert venue design",
        "Music festival branding",
        "Concert promotional materials",
        "Stage design visualization",
        "Event marketing campaign"
    ],
    education: [
        "Innovative educational platform design",
        "Modern learning environment branding",
        "Educational institution website redesign",
        "E-learning platform user interface",
        "School branding and identity design"
    ],
    bars: [
        "Contemporary bar interior design",
        "Upscale cocktail lounge branding",
        "Bar website with menu showcase",
        "Nightclub promotional materials",
        "Pub identity and signage design"
    ],
    restaurants: [
        "Modern restaurant branding",
        "Fine dining website design",
        "Restaurant menu design system",
        "Cafe interior visualization",
        "Food delivery app interface"
    ],
    'spas-salons': [
        "Luxury spa branding design",
        "Beauty salon website interface",
        "Wellness center identity",
        "Salon booking system design",
        "Spa promotional materials"
    ],
    'travel-agencies': [
        "Travel agency website design",
        "Adventure tour branding",
        "Travel booking interface",
        "Tourism marketing materials",
        "Destination guide design"
    ],
    'real-estate': [
        "Luxury property showcase",
        "Real estate agency branding",
        "Property listing platform",
        "Virtual tour interface",
        "Real estate marketing materials"
    ]
};

export const getRandomDescription = (category: string): string => {
    const categoryDescriptions = descriptions[category as keyof typeof descriptions];
    if (!categoryDescriptions) return "Creative design project";
    return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
};

export const fetchProjects = async (): Promise<ProjectItem[]> => {
    try {
        const projects = await api.projects.list();
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Failed to fetch projects');
    }
}; 