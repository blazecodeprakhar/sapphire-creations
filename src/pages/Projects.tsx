import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Meteors } from '@/components/ui/meteors';
import { Link } from 'react-router-dom';
import { ArrowLeft, Grid, List } from 'lucide-react';

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "Project 1",
    category: "Web Development",
    image: "/projects/project1.jpg",
    description: "A beautiful web application showcasing modern design principles."
  },
  // Add more projects here...
];

const Projects = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative py-16 px-6 md:px-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-black z-0"></div>
          <Meteors number={20} className="opacity-30" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 mt-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Our Projects
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <Link to="/">
            <Button variant="secondary" className="mb-8 bg-blue-600 hover:bg-blue-700 text-white border-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        {/* Filters and View Toggle */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                onClick={() => setViewMode('grid')}
                size="icon"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                onClick={() => setViewMode('list')}
                size="icon"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-white/80">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex gap-6 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="w-48 h-48 flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-white/80 mb-2">{project.category}</p>
                    <p className="text-white/70">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects; 