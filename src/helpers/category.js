/**
 * Category Helper Functions
 *
 * Utilities for navigating and querying the hierarchical category structure.
 * Used by API for filtering and by UI for category selection.
 */

import { TEMPLATE_CATEGORIES } from '../constants/categories.js';

/**
 * Get category info by ID (searches all levels)
 * @param {string} categoryId - Category ID to find
 * @returns {object|null} Category object or null if not found
 */
export function getCategoryInfo(categoryId) {
  for (const grandparent of TEMPLATE_CATEGORIES) {
    if (grandparent.id === categoryId) {
      return { ...grandparent, level: 'grandparent' };
    }

    for (const parent of grandparent.children) {
      if (parent.id === categoryId) {
        return { ...parent, level: 'parent', grandparent: grandparent.id };
      }

      if (parent.children) {
        for (const category of parent.children) {
          if (category.id === categoryId) {
            return {
              ...category,
              level: 'category',
              parent: parent.id,
              grandparent: grandparent.id
            };
          }
        }
      }
    }
  }

  return null;
}

/**
 * Get all categories under a grandparent
 * @param {string} grandparentId - Grandparent category ID
 * @returns {array} Array of all descendant category IDs
 */
export function getCategoriesByGrandparent(grandparentId) {
  const descendantIds = [];

  const grandparent = TEMPLATE_CATEGORIES.find(gp => gp.id === grandparentId);
  if (!grandparent) return [];

  // Add grandparent itself
  descendantIds.push(grandparent.id);

  // Add all parents and their children
  grandparent.children.forEach(parent => {
    descendantIds.push(parent.id);

    if (parent.children) {
      parent.children.forEach(category => {
        descendantIds.push(category.id);
      });
    }
  });

  return descendantIds;
}

/**
 * Get all categories under a parent
 * @param {string} parentId - Parent category ID
 * @returns {array} Array of child category IDs (and parent itself)
 */
export function getCategoriesByParent(parentId) {
  const categoryIds = [];

  for (const grandparent of TEMPLATE_CATEGORIES) {
    for (const parent of grandparent.children) {
      if (parent.id === parentId) {
        // Add parent itself
        categoryIds.push(parent.id);

        // Add all children
        if (parent.children) {
          parent.children.forEach(category => {
            categoryIds.push(category.id);
          });
        }

        return categoryIds;
      }
    }
  }

  return [];
}

/**
 * Get filtered category IDs based on hierarchy parameters
 * Used by API to build WHERE clauses
 *
 * @param {object} filters - { grandparent, parent, category }
 * @returns {array} Array of category IDs to match
 */
export function getFilteredCategories(filters = {}) {
  const { grandparent, parent, category } = filters;

  // Most specific filter takes precedence
  if (category) {
    return [category];
  }

  if (parent) {
    return getCategoriesByParent(parent);
  }

  if (grandparent) {
    return getCategoriesByGrandparent(grandparent);
  }

  return [];
}

/**
 * Check if category ID is valid
 * @param {string} categoryId - Category ID to validate
 * @returns {boolean} True if valid
 */
export function isValidCategory(categoryId) {
  return getCategoryInfo(categoryId) !== null;
}

/**
 * Enrich template/context with hierarchical category data
 * Adds grandparent, parent fields based on category field
 *
 * @param {object} item - Template or context object with category field
 * @returns {object} Item with added grandparent/parent fields
 */
export function enrichWithHierarchy(item) {
  if (!item.category) return item;

  const categoryInfo = getCategoryInfo(item.category);

  return {
    ...item,
    grandparent: categoryInfo?.grandparent || '',
    parent: categoryInfo?.parent || '',
    // Keep original category field
  };
}

/**
 * Get all leaf categories (deepest level)
 * @returns {array} Array of all leaf category IDs
 */
export function getAllLeafCategories() {
  const leafCategories = [];

  TEMPLATE_CATEGORIES.forEach(grandparent => {
    grandparent.children.forEach(parent => {
      if (parent.children && parent.children.length > 0) {
        parent.children.forEach(category => {
          leafCategories.push(category.id);
        });
      }
    });
  });

  return leafCategories;
}

/**
 * Get all categories at a specific level
 * @param {string} level - 'grandparent', 'parent', or 'category'
 * @returns {array} Array of category objects at that level
 */
export function getCategoriesByLevel(level) {
  const categories = [];

  if (level === 'grandparent') {
    return TEMPLATE_CATEGORIES.map(gp => ({
      ...gp,
      level: 'grandparent'
    }));
  }

  if (level === 'parent') {
    TEMPLATE_CATEGORIES.forEach(grandparent => {
      grandparent.children.forEach(parent => {
        categories.push({
          ...parent,
          level: 'parent',
          grandparent: grandparent.id
        });
      });
    });
    return categories;
  }

  if (level === 'category') {
    TEMPLATE_CATEGORIES.forEach(grandparent => {
      grandparent.children.forEach(parent => {
        if (parent.children) {
          parent.children.forEach(category => {
            categories.push({
              ...category,
              level: 'category',
              parent: parent.id,
              grandparent: grandparent.id
            });
          });
        }
      });
    });
    return categories;
  }

  return [];
}

/**
 * Build category breadcrumb path
 * @param {string} categoryId - Category ID
 * @returns {array} Array of category objects from grandparent to category
 */
export function getCategoryBreadcrumb(categoryId) {
  const breadcrumb = [];
  const categoryInfo = getCategoryInfo(categoryId);

  if (!categoryInfo) return [];

  // Find grandparent
  if (categoryInfo.grandparent) {
    const grandparent = TEMPLATE_CATEGORIES.find(gp => gp.id === categoryInfo.grandparent);
    if (grandparent) {
      breadcrumb.push({
        id: grandparent.id,
        label: grandparent.label,
        icon: grandparent.icon
      });
    }

    // Find parent
    if (categoryInfo.parent) {
      const parent = grandparent?.children.find(p => p.id === categoryInfo.parent);
      if (parent) {
        breadcrumb.push({
          id: parent.id,
          label: parent.label,
          icon: parent.icon
        });
      }
    }
  }

  // Add the category itself
  breadcrumb.push({
    id: categoryId,
    label: categoryInfo.label,
    icon: categoryInfo.icon
  });

  return breadcrumb;
}
