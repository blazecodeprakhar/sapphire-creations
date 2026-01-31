import { readdirSync, statSync } from 'fs';
import { join, parse } from 'path';

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

const generateTitle = (filename: string): string => {
    // Remove extension and convert to title case
    return filename
        .replace(/\.[^/.]+$/, "") // Remove extension
        .split(/[-_]/) // Split by dash or underscore
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

const generateDescription = (category: string, title: string): string => {
    const descriptions: { [key: string]: string[] } = {
        education: [
            "Interactive educational content design",
            "Modern learning experience",
            "Engaging student portal interface",
            "Digital learning platform",
            "Educational resource design"
        ],
        bars: [
            "Contemporary bar design concept",
            "Unique bar branding solution",
            "Modern bar interior visualization",
            "Bar promotional materials",
            "Bar menu and identity design"
        ],
        restaurants: [
            "Restaurant branding and identity",
            "Modern dining experience design",
            "Restaurant interior concept",
            "Menu and promotional design",
            "Restaurant digital presence"
        ],
        "spas-salons": [
            "Spa branding and identity",
            "Salon interior design concept",
            "Wellness center visualization",
            "Beauty service promotion",
            "Spa digital presence"
        ],
        "travel-agencies": [
            "Travel agency branding",
            "Tourism promotion design",
            "Travel website concept",
            "Adventure package promotion",
            "Travel experience visualization"
        ]
    };

    // Get random description from the category
    const categoryDescriptions = descriptions[category] || descriptions.education;
    const randomIndex = Math.floor(Math.random() * categoryDescriptions.length);
    return categoryDescriptions[randomIndex];
};

export const scanProjectDirectories = (): ProjectItem[] => {
    const projectsDir = 'public/projects';
    const projects: ProjectItem[] = [];
    let id = 1;

    try {
        // Get all category directories
        const categories = readdirSync(projectsDir).filter(dir => 
            statSync(join(projectsDir, dir)).isDirectory()
        );

        // Scan each category directory
        categories.forEach(category => {
            const categoryPath = join(projectsDir, category);
            const files = readdirSync(categoryPath).filter(file => 
                /\.(jpg|jpeg|png|gif)$/i.test(file)
            );

            // Process each image file
            files.forEach(file => {
                const stats = statSync(join(categoryPath, file));
                projects.push({
                    id: id++,
                    type: "image",
                    title: generateTitle(file),
                    desc: generateDescription(category, file),
                    url: `/projects/${category}/${file}`,
                    category: category,
                    span: "md:col-span-1 md:row-span-1",
                    dateAdded: stats.mtime
                });
            });
        });

        // Sort by date added (newest first)
        return projects.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
    } catch (error) {
        console.error('Error scanning project directories:', error);
        return [];
    }
}; 