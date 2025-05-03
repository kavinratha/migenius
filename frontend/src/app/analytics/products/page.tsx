'use client';

import React from 'react';

// Mock data for products analytics
const mockData = {
  topProducts: [
    { name: 'Hypothek', discussions: 145, conversion: 68, trend: '+12%' },
    { name: 'Anlagefonds', discussions: 120, conversion: 55, trend: '+8%' },
    { name: 'Sparkonto', discussions: 98, conversion: 72, trend: '+5%' },
    { name: 'Kreditkarte', discussions: 85, conversion: 45, trend: '-3%' },
    { name: 'Privatkredit', discussions: 76, conversion: 38, trend: '+15%' },
  ],
  productCategories: [
    { category: 'Finanzierung', count: 280, percentage: 40 },
    { category: 'Anlage', count: 210, percentage: 30 },
    { category: 'Vorsorge', count: 140, percentage: 20 },
    { category: 'Zahlungsverkehr', count: 70, percentage: 10 },
  ],
  quarterlyTrends: [
    { quarter: 'Q1', newProducts: 3, totalDiscussions: 180 },
    { quarter: 'Q2', newProducts: 2, totalDiscussions: 220 },
    { quarter: 'Q3', newProducts: 4, totalDiscussions: 195 },
    { quarter: 'Q4', newProducts: 3, totalDiscussions: 245 },
  ]
};

export default function ProductsAnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Produktanalyse</h1>
        <p className="text-gray-600">Einblicke in die Performance und Trends unserer Produkte</p>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Top Produkte</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produkt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gespräche
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Konversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.topProducts.map((product) => (
                <tr key={product.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.discussions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.conversion}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={product.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {product.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Categories */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Produktkategorien</h3>
          <div className="space-y-4">
            {mockData.productCategories.map((category) => (
              <div key={category.category} className="flex items-center">
                <span className="w-32 text-sm text-gray-600">{category.category}</span>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium w-16">{category.count}</span>
                <span className="ml-4 text-sm text-gray-600 w-16">{category.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quarterly Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quartalsübersicht</h3>
          <div className="space-y-6">
            {mockData.quarterlyTrends.map((quarter) => (
              <div key={quarter.quarter} className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{quarter.quarter}</span>
                  <span className="text-sm text-gray-600">
                    {quarter.newProducts} neue Produkte
                  </span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(quarter.totalDiscussions / 245) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">Gespräche</span>
                  <span className="text-xs font-medium">{quarter.totalDiscussions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 