import { ProjectItem } from './projects';

// Mock data for initial testing
const mockProjects: ProjectItem[] = [
    // Concert Projects
    {
        id: 1,
        type: 'image',
        title: 'Live Concert Coverage',
        desc: 'Professional photography from live music events',
        url: '/portfolio/concerts/463.webp',
        category: 'concerts',
        span: 'md:col-span-2 md:row-span-2',
        dateAdded: new Date('2024-03-01')
    },
    {
        id: 2,
        type: 'image',
        title: 'Concert Stage Performance',
        desc: 'Capturing the energy of live performances',
        url: '/portfolio/concerts/447.webp',
        category: 'concerts',
        span: 'md:col-span-1 md:row-span-2',
        dateAdded: new Date('2024-03-02')
    },
    {
        id: 3,
        type: 'image',
        title: 'Music Festival Highlights',
        desc: 'Dynamic festival atmosphere and performances',
        url: '/portfolio/concerts/440.webp',
        category: 'concerts',
        span: 'md:col-span-1',
        dateAdded: new Date('2024-03-03')
    },
    {
        id: 4,
        type: 'image',
        title: 'Concert Crowd Experience',
        desc: 'Capturing audience engagement and excitement',
        url: '/portfolio/concerts/400.webp',
        category: 'concerts',
        span: 'md:col-span-1',
        dateAdded: new Date('2024-03-04')
    },
    {
        id: 5,
        type: 'image',
        title: 'Stage Production',
        desc: 'Showcasing professional stage and lighting setups',
        url: '/portfolio/concerts/370.webp',
        category: 'concerts',
        span: 'md:col-span-2 md:row-span-2',
        dateAdded: new Date('2024-03-05')
    },
    {
        id: 6,
        type: 'image',
        title: 'Artist Performance',
        desc: 'Intimate moments from live performances',
        url: '/portfolio/concerts/332.webp',
        category: 'concerts',
        span: 'md:col-span-1',
        dateAdded: new Date('2024-03-06')
    },
    {
        id: 7,
        type: 'image',
        title: 'Concert Venue Setup',
        desc: 'Professional venue and equipment documentation',
        url: '/portfolio/concerts/287.webp',
        category: 'concerts',
        span: 'md:col-span-1',
        dateAdded: new Date('2024-03-07')
    },
    {
        id: 8,
        type: 'image',
        title: 'Live Music Photography',
        desc: 'Capturing the essence of live music',
        url: '/portfolio/concerts/142.webp',
        category: 'concerts',
        span: 'md:col-span-1',
        dateAdded: new Date('2024-03-08')
    },
    {
        id: 9,
        type: 'image',
        title: 'Concert Atmosphere',
        desc: 'The magic of live concert environments',
        url: '/portfolio/concerts/61.webp',
        category: 'concerts',
        span: 'md:col-span-1',
        dateAdded: new Date('2024-03-09')
    },
    {
        id: 10,
        type: 'image',
        title: 'Stage Design',
        desc: 'Creative stage and lighting design',
        url: '/portfolio/concerts/37.webp',
        category: 'concerts',
        span: 'md:col-span-1',
        dateAdded: new Date('2024-03-10')
    },
    {
        id: 11,
        type: 'image',
        title: 'Concert Production',
        desc: 'Behind the scenes of concert production',
        url: '/portfolio/concerts/14.webp',
        category: 'concerts',
        span: 'md:col-span-1',
        dateAdded: new Date('2024-03-11')
    },
    // Education Projects
    {
        id: 12,
        type: 'image',
        title: 'Educational Project 2',
        desc: 'Contemporary educational design with modern aesthetics',
        url: '/portfolio/education/13.jpg',
        category: 'education',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 13,
        type: 'image',
        title: 'Educational Project 3',
        desc: 'Innovative learning environment design',
        url: '/portfolio/education/12.jpg',
        category: 'education',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 14,
        type: 'image',
        title: 'Educational Project 4',
        desc: 'Digital learning platform interface',
        url: '/portfolio/education/10.jpg',
        category: 'education',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 15,
        type: 'image',
        title: 'Educational Project 5',
        desc: 'School branding and identity design',
        url: '/portfolio/education/5.jpg',
        category: 'education',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 16,
        type: 'image',
        title: 'Educational Project 6',
        desc: 'E-learning platform user interface',
        url: '/portfolio/education/18.jpg',
        category: 'education',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    // Bar Projects
    {
        id: 17,
        type: 'image',
        title: 'Bar Atmosphere',
        desc: 'Capturing the perfect nightlife ambiance',
        url: '/portfolio/bars/131.webp',
        category: 'bars',
        span: 'md:col-span-2 md:row-span-2',
        dateAdded: new Date('2024-03-11')
    },
    {
        id: 18,
        type: 'image',
        title: 'Bar Project 2',
        desc: 'Upscale cocktail lounge branding',
        url: '/portfolio/bars/97.webp',
        category: 'bars',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 19,
        type: 'image',
        title: 'Bar Project 3',
        desc: 'Modern bar interior visualization',
        url: '/portfolio/bars/94.webp',
        category: 'bars',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 20,
        type: 'image',
        title: 'Bar Project 4',
        desc: 'Bar website with menu showcase',
        url: '/portfolio/bars/62.webp',
        category: 'bars',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 21,
        type: 'image',
        title: 'Bar Project 5',
        desc: 'Nightclub promotional materials',
        url: '/portfolio/bars/61.webp',
        category: 'bars',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 22,
        type: 'image',
        title: 'Bar Project 6',
        desc: 'Pub identity and signage design',
        url: '/portfolio/bars/59.webp',
        category: 'bars',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    // Restaurant Projects
    {
        id: 25,
        type: 'image',
        title: 'Restaurant Interior',
        desc: 'Showcasing the dining experience',
        url: '/portfolio/restaurants/1.webp',
        category: 'restaurants',
        span: 'md:col-span-2 md:row-span-2',
        dateAdded: new Date('2024-03-19')
    },
    {
        id: 26,
        type: 'image',
        title: 'Restaurant Project 2',
        desc: 'Fine dining website design',
        url: '/portfolio/restaurants/2.webp',
        category: 'restaurants',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 27,
        type: 'image',
        title: 'Restaurant Project 3',
        desc: 'Restaurant menu design system',
        url: '/portfolio/restaurants/3.webp',
        category: 'restaurants',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    // Spa & Salon Projects
    {
        id: 30,
        type: 'image',
        title: 'Spa & Salon Project 1',
        desc: 'Luxury spa branding design',
        url: '/portfolio/spas-and-salons/4.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 31,
        type: 'image',
        title: 'Spa & Salon Project 2',
        desc: 'Beauty salon website interface',
        url: '/portfolio/spas-and-salons/7.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 32,
        type: 'image',
        title: 'Spa & Salon Project 3',
        desc: 'Wellness center identity',
        url: '/portfolio/spas-and-salons/8.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 33,
        type: 'image',
        title: 'Spa & Salon Project 4',
        desc: 'Salon booking system design',
        url: '/portfolio/spas-and-salons/12.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 34,
        type: 'image',
        title: 'Spa & Salon Project 5',
        desc: 'Spa promotional materials',
        url: '/portfolio/spas-and-salons/14.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 35,
        type: 'image',
        title: 'Spa & Salon Project 6',
        desc: 'Luxury wellness experience design',
        url: '/portfolio/spas-and-salons/16.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 36,
        type: 'image',
        title: 'Spa & Salon Project 7',
        desc: 'Modern spa interior concept',
        url: '/portfolio/spas-and-salons/18.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 37,
        type: 'image',
        title: 'Spa & Salon Project 8',
        desc: 'Salon service showcase',
        url: '/portfolio/spas-and-salons/25.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 38,
        type: 'image',
        title: 'Spa & Salon Project 9',
        desc: 'Wellness brand identity',
        url: '/portfolio/spas-and-salons/26.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 39,
        type: 'image',
        title: 'Spa & Salon Project 10',
        desc: 'Spa treatment menu design',
        url: '/portfolio/spas-and-salons/36.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 40,
        type: 'image',
        title: 'Spa & Salon Project 11',
        desc: 'Beauty center branding',
        url: '/portfolio/spas-and-salons/54.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 41,
        type: 'image',
        title: 'Spa & Salon Project 12',
        desc: 'Wellness app interface',
        url: '/portfolio/spas-and-salons/57.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 42,
        type: 'image',
        title: 'Spa & Salon Project 13',
        desc: 'Luxury spa marketing',
        url: '/portfolio/spas-and-salons/61.webp',
        category: 'spas-and-salons',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    // Travel Agency Projects
    {
        id: 43,
        type: 'image',
        title: 'Travel Agency Project 1',
        desc: 'Travel agency website design',
        url: '/portfolio/travel-agencies/4.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 44,
        type: 'image',
        title: 'Travel Agency Project 2',
        desc: 'Adventure tour branding',
        url: '/portfolio/travel-agencies/6.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 45,
        type: 'image',
        title: 'Travel Agency Project 3',
        desc: 'Travel booking interface',
        url: '/portfolio/travel-agencies/9.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 46,
        type: 'image',
        title: 'Travel Agency Project 4',
        desc: 'Tourism marketing materials',
        url: '/portfolio/travel-agencies/10.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 47,
        type: 'image',
        title: 'Travel Agency Project 5',
        desc: 'Destination guide design',
        url: '/portfolio/travel-agencies/11.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 48,
        type: 'image',
        title: 'Travel Agency Project 6',
        desc: 'Travel experience showcase',
        url: '/portfolio/travel-agencies/14.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 49,
        type: 'image',
        title: 'Travel Agency Project 7',
        desc: 'Adventure tourism branding',
        url: '/portfolio/travel-agencies/17.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 50,
        type: 'image',
        title: 'Travel Agency Project 8',
        desc: 'Travel package design',
        url: '/portfolio/travel-agencies/32.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 51,
        type: 'image',
        title: 'Travel Agency Project 9',
        desc: 'Luxury travel branding',
        url: '/portfolio/travel-agencies/34.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 52,
        type: 'image',
        title: 'Travel Agency Project 10',
        desc: 'Travel agency identity',
        url: '/portfolio/travel-agencies/37.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 53,
        type: 'image',
        title: 'Travel Agency Project 11',
        desc: 'Tourism website design',
        url: '/portfolio/travel-agencies/39.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 54,
        type: 'image',
        title: 'Travel Agency Project 12',
        desc: 'Travel booking platform',
        url: '/portfolio/travel-agencies/42.webp',
        category: 'travel-agencies',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    // Real Estate Projects
    {
        id: 55,
        type: 'image',
        title: 'Real Estate Project 1',
        desc: 'Luxury property showcase',
        url: '/portfolio/real-estate/85.webp',
        category: 'real-estate',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 56,
        type: 'image',
        title: 'Real Estate Project 2',
        desc: 'Real estate agency branding',
        url: '/portfolio/real-estate/84.webp',
        category: 'real-estate',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 57,
        type: 'image',
        title: 'Real Estate Project 3',
        desc: 'Property listing platform',
        url: '/portfolio/real-estate/82.webp',
        category: 'real-estate',
        span: 'md:col-span-1',
        dateAdded: new Date()
    },
    {
        id: 58,
        type: 'image',
        title: 'Real Estate Project 4',
        desc: 'Virtual tour interface',
        url: '/portfolio/real-estate/75.webp',
        category: 'real-estate',
        span: 'md:col-span-1',
        dateAdded: new Date()
    }
];

// API endpoint for fetching projects
export const api = {
    projects: {
        list: async (): Promise<ProjectItem[]> => {
            // In a real application, this would make an HTTP request to your backend
            // For now, we'll return mock data
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockProjects);
                }, 500); // Simulate network delay
            });
        }
    }
}; 