import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SportCategory } from '../types';
import { CATEGORIES } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: SportCategory;
  onSelectCategory: (cat: SportCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSkillLevel: string;
  onSelectSkillLevel: (level: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  resultCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedSkillLevel,
  onSelectSkillLevel,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  resultCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Segmented Tab Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/10'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Control bar: Search, Skill Level, Sort, In-Stock, Results Count */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sports gear (e.g. basketball, carbon, kettlebell)..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-9 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Skill Level Filter */}
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500 hidden sm:inline" />
            <select
              value={selectedSkillLevel}
              onChange={(e) => onSelectSkillLevel(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">All Grades</option>
              <option value="Elite / Pro">Elite / Pro Spec</option>
              <option value="Performance">Performance</option>
              <option value="All-Rounder">All-Rounder</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* In Stock Only Toggle */}
          <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-300 cursor-pointer hover:border-neutral-700 transition-colors">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={onToggleInStock}
              className="rounded bg-neutral-800 border-neutral-700 text-amber-400 focus:ring-0 w-3.5 h-3.5 accent-amber-400 cursor-pointer"
            />
            <span className="whitespace-nowrap">In Stock</span>
          </label>

          {/* Result Count Indicator */}
          <div className="text-xs text-neutral-500 font-mono pl-1 shrink-0">
            <span className="text-neutral-200 font-bold">{resultCount}</span> gear units
          </div>
        </div>
      </div>
    </div>
  );
};
